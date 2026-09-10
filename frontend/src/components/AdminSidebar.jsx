import React from 'react';
import { 
  LayoutDashboard, Settings, Receipt, Users, Layers, 
  Package, Archive, Key, Ticket, Percent, Megaphone, 
  History, ShoppingBag, RotateCcw, Image, Star, ShieldHeader 
} from 'lucide-react';

export default function AdminSidebar({ activeTab, setActiveTab }) {
  const menuGroups = [
    {
      title: "ทั่วไป",
      items: [
        { id: 'dashboard', name: 'แดชบอร์ด', icon: LayoutDashboard },
        { id: 'settings', name: 'ตั้งค่าเว็บไซต์', icon: Settings },
        { id: 'slip_manage', name: 'จัดการสลิป', icon: Receipt },
      ]
    },
    {
      title: "การจัดการ",
      items: [
        { id: 'users', name: 'ผู้ใช้งาน', icon: Users },
        { id: 'categories', name: 'หมวดหมู่', icon: Layers },
        { id: 'products', name: 'สินค้า', icon: Package },
        { id: 'stock', name: 'สต็อกสินค้า', icon: Archive },
        { id: 'slipok_api', name: 'Slip2Go API', icon: Key },
        { id: 'point_codes', name: 'โค้ดแลกพอยท์', icon: Ticket },
        { id: 'discounts', name: 'โค้ดส่วนลดสินค้า', icon: Percent },
        { id: 'popups', name: 'ป๊อบอัพประกาศ', icon: Megaphone },
      ]
    },
    {
      title: "ประวัติการใช้งาน",
      items: [
        { id: 'topup_history', name: 'ประวัติเติมเงิน', icon: History },
        { id: 'order_history', name: 'ประวัติสั่งซื้อ', icon: ShoppingBag },
        { id: 'byshop_history', name: 'ประวัติ Byshop', icon: RotateCcw },
      ]
    },
    {
      title: "การแสดงผล",
      items: [
        { id: 'slides', name: 'รูปภาพสไลด์', icon: Image },
        { id: 'recommended', name: 'สินค้าแนะนำ', icon: Star },
      ]
    }
  ];

  return (
    <div className="w-64 min-h-screen bg-[#0E101A] text-gray-300 p-4 border-r border-gray-800 font-sans">
      <div className="flex items-center space-x-3 mb-6 px-2">
        <div className="p-2 bg-pink-500/10 rounded-xl text-pink-400">
          <Settings className="w-6 h-6 animate-spin-slow" />
        </div>
        <div>
          <h1 className="text-white font-bold text-base leading-tight">ระบบหลังบ้าน</h1>
          <p className="text-xs text-gray-500">Management Console</p>
        </div>
      </div>

      <div className="space-y-6">
        {menuGroups.map((group, idx) => (
          <div key={idx} className="space-y-1">
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                    isActive 
                      ? 'bg-gradient-to-r from-pink-300 to-pink-200 text-black font-semibold shadow-lg shadow-pink-500/10' 
                      : 'hover:bg-[#161928] text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-gray-400'}`} />
                  <span>{item.name}</span>
                </button>
              );
            })}
            {idx < menuGroups.length - 1 && <div className="pt-2 border-b border-gray-800/60" />}
          </div>
        ))}
      </div>
    </div>
  );
}
