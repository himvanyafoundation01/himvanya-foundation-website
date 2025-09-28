import Link from "next/link";
import {
  Heart,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import Image from "next/image";
import logo from "@/public/logo.jpg";

export function Footer() {
  return (
    <footer className="bg-primary text-white relative shadow-inner rounded-t-3xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-inner">
                <Image src={logo.src} alt="Logo" width={96} height={96} />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Himvanya Foundation</h3>
                <p className="text-sm opacity-90">Empowering Communities</p>
              </div>
            </div>
            <p className="text-sm opacity-90 mb-4 max-w-md">
              Dedicated to creating positive change through education,
              healthcare, and community development programs across India.
              Together, we build a better tomorrow.
            </p>
            <div className="flex space-x-4 mt-2">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <Icon
                  key={i}
                  className="w-5 h-5 opacity-80 hover:opacity-100 cursor-pointer transition-opacity duration-300"
                />
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/about", label: "About Us" },
                { href: "/our-work", label: "Our Work" },
                { href: "/gallery", label: "Gallery" },
                { href: "/volunteer", label: "Volunteer" },
                { href: "/donate", label: "Donate" },
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="opacity-90 hover:opacity-100 transition-opacity duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-lg">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span className="opacity-90">
                  Bhadal devi ,Palampur, Kangra, 176083 India
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span className="opacity-90">+91 7018738126</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span className="opacity-90">
                  himvanyafoundation01@gmail.com
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm opacity-90">
          <p>&copy; 2025 Himvanya Foundation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
