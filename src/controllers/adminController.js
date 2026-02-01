
const dashboard = async (req, res) => {
    // Check if user is admin (could be done in middleware too)
    // For now assuming the route is protected by admin middleware
    res.json({ message: "Welcome to the Admin Dashboard", stats: { users: 100, revenue: 5000 } });
};

module.exports = {
    dashboard
};
