const admin = (req, res, next) => {
  // This checks if a user is logged in AND if they have the isAdmin flag.
  if (req.user && req.user.isAdmin) {
    next(); // If they are an admin, continue.
  } else {
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};

module.exports = { admin }; // This line correctly exports the function