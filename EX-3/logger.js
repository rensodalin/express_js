// logger.js
export const loggerMiddleware = (req, res, next) => {
    const method = req.method;
    const path = req.originalUrl;
    const query = req.query;
    const timestamp = new Date().toISOString();

    console.log(`[${timestamp}] ${method} ${path} - Query:`, query);
    next();
};
