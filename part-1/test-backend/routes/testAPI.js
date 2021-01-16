var express = require("express");
var router = express.Router();

function createData(id, date, uuid, message) {
    return { id, date, uuid, message };
}

const rows = [
    createData(0, '16 Mar, 2019', '123e4567-e89b-12d3-a456-426614174000', 'Message 1'),
    createData(1, '17 Mar, 2019', '123e4567-e89b-12d3-a456-426614174000', 'Message 1'),
    createData(2, '17 Mar, 2019', '123e4567-e89b-12d3-a456-426614174000', 'Message 1'),
    createData(3, '18 Mar, 2019', '123e4567-e89b-12d3-a456-426614174000', 'Message 1'),
    createData(4, '18 Mar, 2019', '123e4567-e89b-12d3-a456-426614174000', 'Message 1'),
];

router.get("/", function(req, res, next) {
    res.json({
        rows: rows
    });
});

module.exports = router;
