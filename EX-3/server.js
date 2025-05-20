// server.js
import express from 'express';
import courses from './course.js';
import { loggerMiddleware } from './logger.js';
import { validateQueryMiddleware } from './validateQuery.js';
import { authMiddleware } from './auth.js';

const app = express();
const port = 3000;

// GLOBAL MIDDLEWARE
app.use(loggerMiddleware);

// ROUTE WITH VALIDATION AND AUTH
app.get('/departments/:dept/courses', validateQueryMiddleware, authMiddleware, (req, res) => {
    const { dept } = req.params;
    const { level, minCredits, maxCredits, semester, instructor } = req.query;

    let filteredCourses = courses.filter(course =>
        course.department.toLowerCase() === dept.toLowerCase()
    );

    if (level) {
        filteredCourses = filteredCourses.filter(course =>
            course.level.toLowerCase() === level.toLowerCase()
        );
    }

    if (minCredits) {
        filteredCourses = filteredCourses.filter(course =>
            course.credits >= parseInt(minCredits)
        );
    }

    if (maxCredits) {
        filteredCourses = filteredCourses.filter(course =>
            course.credits <= parseInt(maxCredits)
        );
    }

    if (semester) {
        filteredCourses = filteredCourses.filter(course =>
            course.semester.toLowerCase() === semester.toLowerCase()
        );
    }

    if (instructor) {
        filteredCourses = filteredCourses.filter(course =>
            course.instructor.toLowerCase().includes(instructor.toLowerCase())
        );
    }

    res.json({
        results: filteredCourses,
        meta: {
            total: filteredCourses.length
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
