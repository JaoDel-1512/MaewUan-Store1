const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || 'maewuan_secret_key';

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'โปรดเข้าสู่ระบบ' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token ไม่ถูกต้องหรือหมดอายุ' });
        req.user = user;
        next();
    });
}

function isAdmin(req, res, next) {
    authenticateToken(req, res, () => {
        if (req.user && req.user.role === 'admin') {
            next();
        } else {
            res.status(403).json({ message: 'ปฏิเสธการเข้าถึง: สำหรับผู้ดูแลระบบเท่านั้น' });
        }
    });
}

module.exports = { authenticateToken, isAdmin, SECRET_KEY };
