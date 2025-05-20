// validateQuery.js
export const validateQueryMiddleware = (req, res, next) => {
    const { minCredits, maxCredits } = req.query;

    if (minCredits !== undefined && isNaN(parseInt(minCredits))) {
        return res.status(400).json({ error: "minCredits must be a valid integer." });
    }

    if (maxCredits !== undefined && isNaN(parseInt(maxCredits))) {
        return res.status(400).json({ error: "maxCredits must be a valid integer." });
    }

    if (minCredits !== undefined && maxCredits !== undefined) {
        if (parseInt(minCredits) > parseInt(maxCredits)) {
            return res.status(400).json({ error: "minCredits cannot be greater than maxCredits." });
        }
    }

    next();
};
