import type { GetStaticPropsContext } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import SeoHead from "@/components/layout/Head";
import { seoConfig } from "@/config/seo";
import { fetchPastEvents } from "@/lib/api";
import { getI18nStaticProps } from "@/lib/getStaticProps";
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
      <SeoHead description={seoConfig.pastEvents.description} title={seoConfig.pastEvents.title} />
      <div className={styles.page}>
        <div className="base-container">
          <h2>{t("events.past")}</h2>
          <div className={styles.grid}>
            {events.map((event) => (
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
            ))}
          </div>

          <div className={styles.link}>
            <Link href="/events" locale={locale}>
              <span>{t("events.upcoming")}</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const events = await fetchPastEvents();
  const i18nProps = await getI18nStaticProps(context);

  return {
    props: {
      ...i18nProps.props,
      events,
    },
    revalidate: 60,
  };
}
