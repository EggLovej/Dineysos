import { GetStaticPropsContext } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import SeoHead from "@/components/layout/Head";
import { seoConfig } from "@/config/seo";
import { fetchUpcomingEvents } from "@/lib/api";
import styles from "@/styles/events/Events.module.css";
import { Event } from "@/types/event";

type EventsPageProps = {
  events: Event[];
};

export default function EventsPage({ events }: EventsPageProps) {
  const { t } = useTranslation("common");
  const { locale } = useRouter();

  return (
    <>
      <SeoHead
        description={seoConfig.upcomingEvents.description}
        title={seoConfig.upcomingEvents.title}
      />
      <div className={styles.page}>
        <div className="base-container">
          <h2>{t("events.upcoming")}</h2>
          <div className={styles.grid}>
            {events.length > 0 ? (
              events.map((event) => (
                <Link
                  key={event._id}
                  className={styles.card}
                  href={`/events/${event.slug.current}`}
                  locale={locale}
                >
                  <Image
                    priority
                    alt={event.name}
                    className={styles.coverImage}
                    height={200}
                    src={event.coverImageUrl}
                    width={300}
                  />
                  <div className={styles.details}>
                    <div className={styles.title}>
                      <h4>{event.name}</h4>
                      <p>{event.subtitle ? event.subtitle[locale as "de" | "en"] : ""}</p>
                    </div>
                    <div className={styles.info}>
                      <p>{new Date(event.startDate).toLocaleDateString("de-CH")}</p>
                      <p>{event.locationDetails.city}</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className={styles.noEvents}>
                <div className={styles.imageWrapper}>
                  <Image
                    fill
                    alt="No events available"
                    className={styles.image}
                    src="/images/large/empty_events.webp"
                  />
                </div>
              </div>
            )}
          </div>

          <div className={styles.link}>
            <Link href="/events/past" locale={locale}>
              <span>{t("events.past")}</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const events = await fetchUpcomingEvents();

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "de", ["common"])),
      events,
    },
    revalidate: 60,
  };
}
