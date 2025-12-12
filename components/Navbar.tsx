"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

type UserType = {
  role: "admin" | "member";
} | null;

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // لاحقاً سيتم جلبه من الجلسة أو base
  const user: UserType = null; 
  // const user: UserType = { role: "admin" };

  const navLinks = [
    { label: "الرئيسية", href: "/" },
    { label: "الفعاليات", href: "/events" },
    { label: "المشاريع", href: "/projects" },
  ];

  const adminLinks = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "الحضور", href: "/attendance" },
    { label: "الإشعارات", href: "/notifications" },
  ];

  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
          ClubHub
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href}
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              {link.label}
            </Link>
          ))}

          {user?.role === "admin" && adminLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              {link.label}
            </Link>
          ))}

          {/* Auth Buttons */}
          {!user ? (
            <div className="flex gap-4">
              <Link 
                href="/auth/login"
                className="text-gray-700 dark:text-gray-200 hover:text-blue-500 transition"
              >
                تسجيل الدخول
              </Link>
              <Link 
                href="/auth/register"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                انضم الآن
              </Link>
            </div>
          ) : (
            <Link 
              href="/profile"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              حسابي
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 dark:text-gray-200"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-6 py-4 flex flex-col gap-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              {link.label}
            </Link>
          ))}

          {user?.role === "admin" &&
            adminLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                {link.label}
              </Link>
            ))
          }

          {!user ? (
            <>
              <Link 
                href="/auth/login"
                onClick={() => setOpen(false)}
                className="text-gray-700 dark:text-gray-200 hover:text-blue-500 transition"
              >
                تسجيل الدخول
              </Link>
              <Link 
                href="/auth/register"
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                انضم الآن
              </Link>
            </>
          ) : (
            <Link 
              href="/profile"
              onClick={() => setOpen(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              حسابي
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
