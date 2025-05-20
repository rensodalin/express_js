import express from 'express';
import courses from './course.js';

const app = express();
const PORT = 3000;

// Route: GET /departments/:dept/courses
app.get('/departments/:dept/courses', (req, res) => {
    const { dept } = req.params;
    let { level, minCredits, maxCredits, semester, instructor } = req.query;

    // Convert credits to numbers if provided
    minCredits = minCredits ? parseInt(minCredits) : undefined;
    maxCredits = maxCredits ? parseInt(maxCredits) : undefined;

    // Defensive check for credit range
    if (minCredits !== undefined && maxCredits !== undefined && minCredits > maxCredits) {
        return res.status(400).json({
            error: "minCredits cannot be greater than maxCredits"
        });
    }

    // Filter by department first
    let results = courses.filter(course => course.department.toLowerCase() === dept.toLowerCase());

    // Apply optional filters
    if (level) {
        results = results.filter(course => course.level.toLowerCase() === level.toLowerCase());
    }

    if (minCredits !== undefined) {
        results = results.filter(course => course.credits >= minCredits);
    }

    if (maxCredits !== undefined) {
        results = results.filter(course => course.credits <= maxCredits);
    }

    if (semester) {
        results = results.filter(course => course.semester.toLowerCase() === semester.toLowerCase());
    }

    if (instructor) {
        results = results.filter(course => 
            course.instructor.toLowerCase().includes(instructor.toLowerCase())
        );
    }

    // Return results with meta
    return res.json({
        results,
        meta: {
            total: results.length
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
