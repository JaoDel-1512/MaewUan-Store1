const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { isAdmin } = require('../middleware/auth');

// ดึงรายชื่อผู้ใช้งานทั้งหมด
router.get('/users', isAdmin, async (req, res) => {
    try {
        const [users] = await db.query('SELECT id, email, credit, role, created_at FROM users');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// เปลี่ยนยศผู้ใช้งาน (ให้ยศแอดมินหรือผู้ใช้ทั่วไป)
router.post('/change-role', isAdmin, async (req, res) => {
    const { targetUserId, newRole } = req.body; // 'admin' หรือ 'user'
    try {
        await db.query('UPDATE users SET role = ? WHERE id = ?', [newRole, targetUserId]);
        res.json({ status: true, message: 'อัปเดตสิทธิ์สำเร็จ' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
