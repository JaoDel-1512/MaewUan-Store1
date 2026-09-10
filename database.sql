CREATE DATABASE IF NOT EXISTS maewuan_store;
USE maewuan_store;

-- 1. ตารางผู้ใช้งาน
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    credit DECIMAL(10, 2) DEFAULT 0.00,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. ตารางหมวดหมู่สินค้า
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    icon_url VARCHAR(255)
);

-- 3. ตารางสินค้า
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    is_recommended BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- 4. ตารางสต็อกสินค้า (สำหรับระบบส่งอัตโนมัติ)
CREATE TABLE IF NOT EXISTS product_stock (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    content TEXT NOT NULL,
    is_sold BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- 5. ตารางประวัติการสั่งซื้อ
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    content_delivered TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 6. ตารางประวัติการเติมเงิน (slip2go)
CREATE TABLE IF NOT EXISTS topup_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    trans_ref VARCHAR(100) UNIQUE,
    amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'success', 'failed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- บันทึกข้อมูล Admin เริ่มต้น (รหัสผ่านคือ @maewuan1512 ถูก Hash ด้วย bcrypt แล้ว)
INSERT INTO users (email, password, credit, role) 
VALUES (
    'itsuchan12@gmail.com', 
    '$2b$10$eE8kTh06qSAtwO3Ghh1I6eOnjAatJtFz4kYI1o4aI4Nf7j3zKshs2', 
    0.00, 
    'admin'
)
ON DUPLICATE KEY UPDATE role='admin';
