import type { ReactNode } from "react";
import Link from "next/link";
import { Building2 } from "lucide-react";

interface MarketingLayoutProps {
  children: ReactNode;
}

export function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <Building2 className="h-8 w-8 text-amber-500" />
              <span className="font-bold text-xl text-[#0F2742]">
                JAAD <span className="text-amber-500">BUILD</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link href="/features" className="text-sm text-gray-600 hover:text-[#0F2742] transition-colors">المميزات</Link>
              <Link href="/solutions" className="text-sm text-gray-600 hover:text-[#0F2742] transition-colors">الحلول</Link>
              <Link href="/pricing" className="text-sm text-gray-600 hover:text-[#0F2742] transition-colors">الباقات</Link>
              <Link href="/contact" className="text-sm text-gray-600 hover:text-[#0F2742] transition-colors">تواصل معنا</Link>
              <div className="flex items-center gap-3 mr-6 pr-6 border-r border-gray-200">
                <Link href="/login" className="text-sm font-medium text-[#0F2742] hover:text-[#0F2742]/80">تسجيل دخول</Link>
                <Link href="/register" className="inline-flex items-center h-9 px-4 rounded-lg bg-[#0F2742] text-white text-sm font-medium hover:bg-[#0F2742]/90 transition-colors">ابدأ الآن</Link>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <main className="pt-16">{children}</main>

      <footer className="bg-[#091827] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="h-7 w-7 text-amber-500" />
                <span className="font-bold text-lg">JAAD BUILD</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                منصة سحابية متكاملة لإدارة شركات المقاولات والبناء. تربط بين مكتبك وموقع المشروع والمستودع والإدارة المالية في نظام واحد.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-4">الرئيسية</h4>
              <ul className="space-y-2">
                <li><Link href="/features" className="text-sm text-gray-400 hover:text-white">المميزات</Link></li>
                <li><Link href="/solutions" className="text-sm text-gray-400 hover:text-white">الحلول</Link></li>
                <li><Link href="/pricing" className="text-sm text-gray-400 hover:text-white">الباقات</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-4">الدعم</h4>
              <ul className="space-y-2">
                <li><Link href="/contact" className="text-sm text-gray-400 hover:text-white">تواصل معنا</Link></li>
                <li><span className="text-sm text-gray-400">info@jaadbuild.com</span></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-gray-800 text-center text-sm text-gray-500">
            <p>جميع الحقوق محفوظة JAAD CLOUD © {new Date().getFullYear()}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
