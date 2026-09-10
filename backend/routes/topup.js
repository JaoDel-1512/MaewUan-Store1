const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../config/db');
const { authenticateToken } = require('../middleware/auth');

const SLIP2GO_API_KEY = process.env.SLIP2GO_API_KEY || "YOUR_SLIP2GO_API_KEY";

router.post('/slip2go', authenticateToken, async (req, res) => {
    const { payload } = req.body;
    const userId = req.user.id;

    try {
        // ส่ง Payload สลิปไปตรวจสอบที่ slip2go API
        const response = await axios.post(
            'https://api.slip2go.com/api/v1/check',
            { payload },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${SLIP2GO_API_KEY}`
                }
            }
        );

        if (response.data && response.data.success) {
            const { amount, transRef } = response.data.data;

            // ตรวจสอบว่าสลิปนี้เคยใช้งานหรือยัง
            const [existing] = await db.query('SELECT * FROM topup_history WHERE trans_ref = ?', [transRef]);
            if (existing.length > 0) {
                return res.status(400).json({ message: 'สลิปนี้เคยถูกใช้งานไปแล้ว' });
            }

            // เพิ่มเครดิตให้ผู้ใช้งาน และ บันทึกประวัติ
            await db.query('UPDATE users SET credit = credit + ? WHERE id = ?', [amount, userId]);
            await db.query('INSERT INTO topup_history (user_id, trans_ref, amount, status) VALUES (?, ?, ?, ?)', 
                [userId, transRef, amount, 'success']
            );

            return res.json({ status: true, message: `เติมเงินสำเร็จ ${amount} บาท`, amount });
        } else {
            return res.status(400).json({ message: response.data.message || 'สลิปไม่ถูกต้อง' });
        }
    } catch (err) {
        return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการตรวจสอบสลิป', error: err.message });
    }
});

module.exports = router;
