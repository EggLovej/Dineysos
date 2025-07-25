import Image from "next/image";
import Link from "next/link";
import router, { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useState, useRef, useEffect } from "react";

import styles from "@/styles/layout/Navbar.module.css";

export default function Navbar() {
  const { t } = useTranslation("common");
  const { locale, events } = useRouter();

  const langRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [activeSection, setActiveSection] = useState<string>("");

  // Handles language switching by routing and closing menus

  function switchLocale(locale: string) {
    const { pathname, query, asPath } = router;

    // Extract hash manually
    const [hash] = asPath.split("#");

    void router.push({ pathname, query }, asPath, { locale }).then(() => {
      if (hash) {
        // Timeout to allow layout/DOM to update
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 50);
      }
    });
  }

  // Navigation links with i18n labels
  const navItems = [
    { href: "/events", label: t("nav.events") },
    { href: "/#about", label: t("nav.about") },
    { href: "/#concepts", label: t("nav.concepts") },
    { href: "/#pricing", label: t("nav.pricing") },
    { href: "/#brochure", label: t("nav.brochure") },
    { href: "/#contact", label: t("nav.contact") },
    //  { href: "/feedback", label: t("nav.feedback") },
  ];

  // Combined useEffect to handle:
  // 1. Outside clicks (close menu/lang selector)
  // 2. Route change cleanup
  // 3. Navbar shrinking on scroll
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (langRef.current && !langRef.current.contains(target)) setLangOpen(false);
      if (menuRef.current && !menuRef.current.contains(target)) setMenuOpen(false);
    };

    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5, rootMargin: "-65px 0px 0px 0px" }
    );

    sections.forEach((section) => observer.observe(section));

    const handleRouteChange = () => {
      setMenuOpen(false);
      setLangOpen(false);
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    document.addEventListener("click", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    events.on("routeChangeStart", handleRouteChange);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
      events.off("routeChangeStart", handleRouteChange);
    };
  }, [events]);

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <Link href="/" locale={locale}>
        <Image
          alt="Logo"
          className={styles.logo}
          height={179}
          src="/images/logo/color.webp"
          width={500}
        />
      </Link>

      <div className={styles.rightControls} ref={menuRef}>
        {/* Burger Menu Toggle */}
        <button
          aria-label="Toggle menu"
          className={styles.menuToggle}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          ☰
        </button>

        {/* Navigation Links */}
        <nav className={`${styles.menu} ${menuOpen ? styles.open : ""}`}>
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              className={`${styles.link} ${activeSection === href.slice(2) ? styles.activeLink : ""}`}
              href={href}
              locale={locale}
              onClick={() => {
                setMenuOpen(false);
                setLangOpen(false);
              }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Language Switcher */}
        <div className={styles.langWrapper} ref={langRef}>
          <button className={styles.langToggle} onClick={() => setLangOpen((prev) => !prev)}>
            {locale?.toUpperCase()}
          </button>
          {langOpen && (
            <div className={styles.langMenu}>
              {["de", "en"].map((lang) => (
                <button key={lang} className={styles.langOption} onClick={() => switchLocale(lang)}>
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
