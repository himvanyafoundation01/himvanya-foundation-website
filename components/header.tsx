"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart } from "lucide-react";
import Image from "next/image";
import logo from "@/public/logo.jpg";
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Image src={logo.src} alt="Logo" width={96} height={96} />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-primary">
                Himvanya Foundation
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-foreground hover:text-primary transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/our-work"
              className="text-foreground hover:text-primary transition-colors"
            >
              Our Work
            </Link>
            <Link
              href="/gallery"
              className="text-foreground hover:text-primary transition-colors"
            >
              Gallery
            </Link>
            <Link
              href="/blog"
              className="text-foreground hover:text-primary transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="text-foreground hover:text-primary transition-colors"
            >
              Contact
            </Link>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/donate">Donate Now</Link>
            </Button>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-foreground hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-foreground hover:text-primary transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/our-work"
                className="text-foreground hover:text-primary transition-colors"
              >
                Our Work
              </Link>
              <Link
                href="/gallery"
                className="text-foreground hover:text-primary transition-colors"
              >
                Gallery
              </Link>
              <Link
                href="/blog"
                className="text-foreground hover:text-primary transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="text-foreground hover:text-primary transition-colors"
              >
                Contact
              </Link>
              <Button asChild className="bg-primary hover:bg-primary/90 w-fit">
                <Link href="/donate">Donate Now</Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
