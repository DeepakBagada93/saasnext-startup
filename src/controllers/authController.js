
const supabase = require('../models/supabaseClient');

const signup = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            // options: { emailRedirectTo: 'http://localhost:3000/welcome' } // Optional: for frontend redir
        });

        if (error) throw error;

        // Check if user already exists or requires confirmation
        if (data.user && data.user.identities && data.user.identities.length === 0) {
            return res.status(400).json({ error: 'User already registered' });
        }

        res.status(201).json({
            message: 'Signup successful. Please check your email for confirmation if required.',
            user: data.user,
            session: data.session
        });
    } catch (error) {
        console.error('Signup Error:', error.message);
        res.status(400).json({ error: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw error;

        res.status(200).json({
            message: 'Login successful',
            user: data.user,
            access_token: data.session.access_token,
            refresh_token: data.session.refresh_token
        });
    } catch (error) {
        console.error('Login Error:', error.message);
        res.status(401).json({ error: 'Invalid email or password' });
    }
};

const logout = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(200).json({ message: 'Logged out' }); // No token, effectively logged out

    const token = authHeader.split(' ')[1];

    try {
        const { error } = await supabase.auth.admin.signOut(token); // Admin signout relies on JWT
        // Client side usually handles clearing tokens. 
        // Standard signOut() usually clears local session. 
        // For stateful server sessions or if using Supabase standard client w/ storage:
        // const { error } = await supabase.auth.signOut();

        if (error) {
            // It's common for signOut to fail if token is already invalid, safe to ignore for simple logout
            console.warn('Logout warning:', error.message);
        }

        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const refresh = async (req, res) => {
    const { refresh_token } = req.body;

    if (!refresh_token) {
        return res.status(400).json({ error: 'Refresh token is required' });
    }

    try {
        const { data, error } = await supabase.auth.refreshSession({ refresh_token });

        if (error) throw error;

        res.status(200).json({
            access_token: data.session.access_token,
            refresh_token: data.session.refresh_token,
            user: data.user
        });
    } catch (error) {
        console.error('Refresh Error:', error.message);
        res.status(401).json({ error: 'Invalid refresh token' });
    }
}

module.exports = {
    signup,
    login,
    logout,
    refresh
};
