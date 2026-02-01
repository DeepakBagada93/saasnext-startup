
const supabase = require('./supabaseClient');

const getSubscription = async (userId) => {
    const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId)
        .single();
    return { data, error };
};

const upsertSubscription = async (subscriptionData) => {
    const { data, error } = await supabase
        .from('subscriptions')
        .upsert(subscriptionData)
        .select()
        .single();
    return { data, error };
};

module.exports = {
    getSubscription,
    upsertSubscription
};
