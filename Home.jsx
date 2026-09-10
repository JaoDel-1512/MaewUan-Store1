import React from 'react';
import { 
  ShoppingBag, CreditCard, Key, Gift, HelpCircle, PhoneCall, 
  User, Users, Grid, Box, CheckCircle, FileText 
} from 'lucide-react';

export default function Home({ user }) {
  return (
    <div className="min-h-screen bg-[#0B0C10] text-white font-sans">
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-8 py-4 bg-[#0F111A]/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-lg tracking-wide text-pink-400">MaewUanStore</span>
        </div>

        <div className="hidden md:flex items-center space-x-2 bg-[#161824] px-3 py-1.5 rounded-xl border border-gray-800 text-sm">
          <a href="#" className="px-3 py-1.5 rounded-lg bg-[#222538] text-white">หน้าหลัก</a>
          <a href="#" className="px-3 py-1.5 text-gray-400 hover:text-white">สินค้าทั้งหมด</a>
          <a href="#" className="px-3 py-1.5 text-gray-400 hover:text-white">เติมเงิน</a>
          <a href="#" className="px-3 py-1.5 text-gray-400 hover:text-white">OTP</a>
          <a href="#" className="px-3 py-1.5 text-gray-400 hover:text-white">โค้ดส่วนลด</a>
          <a href="#" className="px-3 py-1.5 text-gray-400 hover:text-white">วิธีใช้</a>
          <a href="#" className="px-3 py-1.5 text-gray-400 hover:text-white">ติดต่อ</a>
        </div>

        <div className="flex items-center space-x-2 bg-[#161824] border border-gray-800 px-4 py-1.5 rounded-xl text-sm">
          <User className="w-4 h-4 text-pink-400" />
          <span>{user ? user.email.split('@')[0] : 'Guest'}</span>
          <span className="text-pink-400 font-semibold">(฿{user ? user.credit : '0.00'})</span>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="max-w-5xl mx-auto px-4 py-12 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-extrabold tracking-wider">MAEWUANSTORE</h1>
          <div className="flex justify-center gap-4">
            <button className="bg-gradient-to-r from-pink-300 to-purple-300 text-black px-6 py-2.5 rounded-xl font-medium shadow-lg hover:opacity-90">ดูสินค้าทั้งหมด</button>
            <button className="bg-[#181A26] border border-gray-700 px-6 py-2.5 rounded-xl font-medium hover:bg-[#222538]">เติมเงินพอยท์</button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#11131F] p-4 rounded-2xl border border-gray-800">
          <div className="p-3 bg-[#161826] rounded-xl border border-gray-800 flex justify-between items-center">
            <div><p className="text-xs text-gray-400">สมาชิก</p><p className="text-lg font-bold">25 คน</p></div>
            <Users className="w-6 h-6 text-gray-500" />
          </div>
          <div className="p-3 bg-[#161826] rounded-xl border border-gray-800 flex justify-between items-center">
            <div><p className="text-xs text-gray-400">หมวดหมู่</p><p className="text-lg font-bold">0 กลุ่ม</p></div>
            <Grid className="w-6 h-6 text-gray-500" />
          </div>
          <div className="p-3 bg-[#161826] rounded-xl border border-gray-800 flex justify-between items-center">
            <div><p className="text-xs text-gray-400">พร้อมขาย</p><p className="text-lg font-bold">0 ชิ้น</p></div>
            <Box className="w-6 h-6 text-gray-500" />
          </div>
          <div className="p-3 bg-[#161826] rounded-xl border border-gray-800 flex justify-between items-center">
            <div><p className="text-xs text-gray-400">ขายแล้ว</p><p className="text-lg font-bold">309 ชิ้น</p></div>
            <CheckCircle className="w-6 h-6 text-pink-300" />
          </div>
        </div>

        {/* QUICK MENU */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-6 bg-[#11131F] border border-gray-800 rounded-2xl flex flex-col items-center hover:border-pink-500/50 cursor-pointer">
            <ShoppingBag className="text-pink-400 mb-2"/><span>เลือกซื้อสินค้า</span>
          </div>
          <div className="p-6 bg-[#11131F] border border-gray-800 rounded-2xl flex flex-col items-center hover:border-emerald-500/50 cursor-pointer">
            <CreditCard className="text-emerald-400 mb-2"/><span>เติมเงิน</span>
          </div>
          <div className="p-6 bg-[#11131F] border border-gray-800 rounded-2xl flex flex-col items-center hover:border-red-500/50 cursor-pointer">
            <Gift className="text-red-400 mb-2"/><span>แลกโค้ด</span>
          </div>
          <div className="p-6 bg-[#11131F] border border-gray-800 rounded-2xl flex flex-col items-center hover:border-blue-500/50 cursor-pointer">
            <FileText className="text-blue-400 mb-2"/><span>แจ้งโอนเงิน</span>
          </div>
        </div>
      </div>
    </div>
  );
}
