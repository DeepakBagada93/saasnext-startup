
const supabase = require('../models/supabaseClient');
const { createClient } = require('@supabase/supabase-js');
const generationModel = require('../models/generationModel');
require('dotenv').config();

// Helper to get a configured Supabase client for the specific user
const getAuthenticatedSupabase = (token) => {
    return createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_ANON_KEY,
        {
            global: {
                headers: {
                    Authorization: token
                }
            }
        }
    );
};

const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        // Fetching from auth.users via the authenticated token (easiest way to get self info)
        const token = req.headers.authorization;
        const authSupabase = getAuthenticatedSupabase(token);

        const { data: { user }, error } = await authSupabase.auth.getUser();

        if (error) throw error;

        // If you had a 'profiles' table, you would query it here:
        // const { data: profile, error: profileError } = await supabase.from('profiles').select('*').eq('id', userId).single();

        res.json({ user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateProfile = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const authSupabase = getAuthenticatedSupabase(token);
        const updates = req.body; // e.g., { data: { full_name: 'John' } }

        const { data, error } = await authSupabase.auth.updateUser(updates);

        if (error) throw error;

        res.json({ message: 'Profile updated', user: data.user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserGenerations = async (req, res) => {
    try {
        const userId = req.user.id;
        const { data, error } = await generationModel.getUserGenerations(userId);

        if (error) throw error;

        res.json({ generations: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createUserGeneration = async (req, res) => {
    try {
        // Reuse logic or duplicate. For simplicity and allowing distinct 'user' route, we call model directly.
        // NOTE: Actual generation logic (calling Groq) implies this endpoint might NOT replace the specific generationController logic
        // if that one does the heavy lifting.
        // Assuming this endpoint mimics the generation creation (saving to DB + calling AI):

        // If we strictly just want to SAVE a generation (e.g. from frontend logic?), we use model.
        // But usually "POST generation" implies running the generation.
        // I will import the logic from generationController to keep it DRY or call the model if it's just DB.
        // Given the prompt "POST new", I'll assume full generation flow.

        // For now, let's call the model to SAVE. 
        // If the user meant "Trigger AI", they should use generationController's logic.
        // Let's implement full AI call here too for completeness as requested.

        const Groq = require('groq-sdk');
        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
        const { prompt, type } = req.body;
        const userId = req.user.id;

        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: 'llama3-8b-8192',
        });

        const content = chatCompletion.choices[0]?.message?.content || '';

        const { data, error } = await generationModel.createGeneration({
            user_id: userId,
            type: type || 'text',
            content: content
        });

        if (error) throw error;

        res.json({ result: content, record: data });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getProfile,
    updateProfile,
    getUserGenerations,
    createUserGeneration
};
