
const Groq = require('groq-sdk');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const generationModel = require('../models/generationModel');
const subscriptionModel = require('../models/subscriptionModel');
const supabase = require('../models/supabaseClient'); // Keep as is, despite using user-scoped client elsewhere. For public storage, anon key is fine if policies allow.
require('dotenv').config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const checkRateLimit = async (userId) => {
    // 1. Get Subscription Tier
    const { data: sub } = await subscriptionModel.getSubscription(userId);
    const tier = sub ? sub.tier : 'free';

    if (tier === 'premium' || tier === 'basic') return true; // simplified: basic/premium unlimited for now

    // 2. Count today's generations
    // Supabase query to count
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { count, error } = await supabase
        .from('generations')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .gte('created_at', today.toISOString());

    if (error) {
        console.error('Rate Limit Check Error:', error);
        return false; // Fail safe
    }

    return count < 5;
};

const callGroq = async (prompt) => {
    const chatCompletion = await groq.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'llama3-8b-8192',
    });
    return chatCompletion.choices[0]?.message?.content || '';
};

const handleGeneration = async (req, res, type, promptTemplate) => {
    const userId = req.user.id;
    const { prompt } = req.body; // User specific context

    if (!(await checkRateLimit(userId))) {
        return res.status(429).json({ error: 'Daily generation limit reached. Please upgrade.' });
    }

    const fullPrompt = `${promptTemplate}\n\nUser Input: ${prompt}`;

    try {
        const content = await callGroq(fullPrompt);

        // Save to DB
        const { data, error } = await generationModel.createGeneration({
            user_id: userId,
            type: type,
            content: content
        });

        if (error) throw error;

        res.json({ result: content, record: data });
    } catch (error) {
        console.error('Generation Error:', error);
        res.status(500).json({ error: error.message });
    }
};

const generatePitchDeck = async (req, res) => {
    const template = "Create a professional pitch deck outline and content for a startup with the following description. Include sections: Problem, Solution, Market, Business Model, Team.";
    await handleGeneration(req, res, 'pitch-deck', template);
};

const generateBusinessPlan = async (req, res) => {
    const template = "Write a comprehensive business plan for the following business idea. Include Executive Summary, Company Overview, Products/Services, Market Analysis, Strategy.";
    await handleGeneration(req, res, 'business-plan', template);
};

const exportPdf = async (req, res) => {
    const userId = req.user.id;
    const { content, title } = req.body;

    // Check Premium
    const { data: sub } = await subscriptionModel.getSubscription(userId);
    if (sub?.tier !== 'premium') {
        return res.status(403).json({ error: 'PDF export is a Premium feature.' });
    }

    try {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();
        const { width, height } = page.getSize();
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

        const fontSize = 12;
        const margin = 50;
        let y = height - margin;

        const lines = content.split('\n'); // Simple line split, real wrapping needed for long text
        // Very basic text rendering
        page.drawText(title || 'Export', { x: margin, y: y, size: 20, font: font });
        y -= 40;

        for (const line of lines) {
            if (y < margin) {
                // Add new page (omitted for brevity in scaffold)
                break;
            }
            // Simple truncation to avoid crash if line too long
            const cleanLine = line.replace(/[^\x00-\x7F]/g, "");
            page.drawText(cleanLine.substring(0, 80), { x: margin, y: y, size: fontSize, font: font });
            y -= fontSize + 5;
        }

        const pdfBytes = await pdfDoc.save();

        // Upload to Supabase Storage
        const fileName = `exports/${userId}/${Date.now()}.pdf`;
        // Need to enable storage bucket first. 
        // For scaffold, we return base64 or a mock URL if bucket not ready
        // const { data, error } = await supabase.storage.from('exports').upload(fileName, pdfBytes, { contentType: 'application/pdf' });

        // Return as base64 for immediate download on frontend for this MVP
        const base64Pdf = Buffer.from(pdfBytes).toString('base64');
        res.json({
            message: 'PDF generated',
            // url: publicUrl, 
            pdfBase64: base64Pdf
        });

    } catch (error) {
        console.error('PDF Export Error:', error);
        res.status(500).json({ error: error.message });
    }
};

// Generic for backward compatibility if needed, or remove. keeping as 'text'
const generateContent = async (req, res) => {
    await handleGeneration(req, res, 'text', "Generate content based on:");
};

// Re-export getHistory from earlier or re-implement
const getHistory = async (req, res) => {
    try {
        const userId = req.user.id;
        const { data, error } = await generationModel.getUserGenerations(userId);
        if (error) throw error;
        res.json({ history: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    generatePitchDeck,
    generateBusinessPlan,
    exportPdf,
    generateContent,
    getHistory
};
