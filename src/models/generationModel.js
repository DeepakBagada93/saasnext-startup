
const supabase = require('./supabaseClient');

const createGeneration = async (generationData) => {
    const { data, error } = await supabase
        .from('generations')
        .insert(generationData)
        .select()
        .single();
    return { data, error };
};

const getUserGenerations = async (userId) => {
    const { data, error } = await supabase
        .from('generations')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
    return { data, error };
};

module.exports = {
    createGeneration,
    getUserGenerations
};
