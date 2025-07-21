import { fetchPastEvents } from "@/lib/api";
import { Event } from "@/types/event";
import Image from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticPropsContext } from "next";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from 'next/router';



import styles from "@/styles/events/Events.module.css";

type EventsPageProps = {
  events: Event[];
};

export default function EventsPage({ events }: EventsPageProps) {
    const { t } = useTranslation("common");
    const { locale } = useRouter();

  return (
    <div className={styles.page}>
      <div className="base-container">
        <h2>{t("events.past")}</h2>
        <div className={styles.grid}>
          {events.map((event) => (
            <Link key={event._id} href={`/events/${event.slug.current}`} locale={locale} className={styles.card}>
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
                  <p>{event.subtitle ? event.subtitle[locale as 'de' | 'en'] : ''}</p>
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
  );
}

export async function getServerSideProps({ locale }: GetStaticPropsContext) {
  const events = await fetchPastEvents();

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "de", ["common"])),
      events,
    },
  };
}
