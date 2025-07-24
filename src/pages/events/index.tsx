import { fetchUpcomingEvents } from "@/lib/api";
import { Event } from "@/types/event";
import Image from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticPropsContext } from "next";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "@/styles/events/Events.module.css";
import SeoHead from "@/components/layout/Head";
import { seoConfig } from "@/config/seo";

type EventsPageProps = {
  events: Event[];
};

export default function EventsPage({ events }: EventsPageProps) {
  const { t } = useTranslation("common");
  const { locale } = useRouter();

  return (
    <>
      <SeoHead
        title={seoConfig.upcomingEvents.title}
        description={seoConfig.upcomingEvents.description}
      />
      <div className={styles.page}>
        <div className="base-container">
          <h2>{t("events.upcoming")}</h2>
          <div className={styles.grid}>
            {events.length > 0 ? (
              events.map((event) => (
                <Link
                  key={event._id}
                  href={`/events/${event.slug.current}`}
                  locale={locale}
                  className={styles.card}
                >
                  <Image
                    className={styles.coverImage}
                    src={event.coverImageUrl}
                    alt={event.name}
                    width={300}
                    height={200}
                    priority
                  />
                  <div className={styles.details}>
                    <div className={styles.title}>
                      <h4>{event.name}</h4>
                      <p>
                        {event.subtitle
                          ? event.subtitle[locale as "de" | "en"]
                          : ""}
                      </p>
                    </div>
                    <div className={styles.info}>
                      <p>
                        {new Date(event.startDate).toLocaleDateString("de-CH")}
                      </p>
                      <p>{event.locationDetails.city}</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className={styles.noEvents}>
                <div className={styles.imageWrapper}>
                  <Image
                    src="/images/large/empty_events.webp"
                    alt="No events available"
                    fill
                    className={styles.image}
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

export async function getServerSideProps({ locale }: GetStaticPropsContext) {
  const events = await fetchUpcomingEvents();

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "de", ["common"])),
      events,
    },
  };
}