const authenticate = (req, res, next) => {
    const apiKey = req.header('x-api-key');
    if (apiKey && apiKey === 'api-key') {
        next();
    } else {
        res.status(401).json({ error: "Wrong api key, not authorised!" });
    }
};

module.exports = authenticate;