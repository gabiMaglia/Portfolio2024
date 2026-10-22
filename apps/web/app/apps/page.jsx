import { headers } from "next/headers";
import Link from "next/link";
import es from "@/messages/es.json";
import en from "@/messages/en.json";
import { APPS, pickAppsLocale } from "@/lib/apps.mjs";

export const metadata = {
  title: "Apps — Gabriel Maglia",
  description: "Apps · Gabriel Maglia",
};

// Fuera de [locale] y del middleware next-intl: el idioma sale de Accept-Language
export default function AppsIndex() {
  const locale = pickAppsLocale(headers().get("accept-language"));
  const t = (locale === "en" ? en : es).Apps;

  return (
    <main className="apps-page p-paper" lang={locale}>
      <div className="apps-wrap">
        <Link href={`/${locale}`} className="t-kicker apps-back">← {t.back}</Link>

        <header className="apps-head">
          <span className="t-kicker">{t.kicker}</span>
          <h1 className="display t-title t-title--2xl">
            {t.title} <span className="ser">{t.titleAccent}</span>
          </h1>
          <p className="t-body">{t.description}</p>
        </header>

        <ul className="apps-list">
          {APPS.map((app, i) => (
            <li key={app.id}>
              <a href={app.href} className="apps-card">
                <span className="display apps-card-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="apps-card-text">
                  <span className="display apps-card-name">{app.name}</span>
                  <span className="t-body">{t[app.id]}</span>
                </span>
                <span className="apps-card-open t-kicker">{t.open} <span aria-hidden="true">↗</span></span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
