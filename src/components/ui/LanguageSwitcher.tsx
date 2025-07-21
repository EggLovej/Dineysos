import { useRouter } from "next/router";

export function LanguageSwitcher() {
  const router = useRouter();
  const { locale, pathname, asPath, query } = router;

  const switchTo = (lang: string) => {
    router.push({ pathname, query }, asPath, { locale: lang });
  };

  return (
    <div className="lang-dropdown">
      <button className="lang-toggle" id="current-lang">
        {locale?.toUpperCase()}
      </button>
      <div className="lang-menu">
        <button className="lang-option" onClick={() => switchTo("de")}>
          DE
        </button>
        <button className="lang-option" onClick={() => switchTo("en")}>
          EN
        </button>
      </div>
    </div>
  );
}
