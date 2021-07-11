const { Router } = require('express');
const router = Router();

router.get('/test', (req, res) => {
    const data = {
        "name": "Moises",
        "website": "moises.web"
    };
    res.json(data);
});

module.exports = router;