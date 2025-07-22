import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";
import { fetchAllEventSlugs, fetchEventBySlug } from "@/lib/api";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { Event } from "@/types/event";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  CoinsIcon,
} from "@/components/common/Icons";

import styles from "@/styles/events/EventPage.module.css";
import SeoHead from "@/components/layout/Head";

type EventPageProps = {
  event: Event;
};

function formatParagraph(text: string) {
  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;

  const parts = text.split(emailRegex);

  return parts.map((part, idx) =>
    emailRegex.test(part) ? (
      <a key={idx} href={`mailto:${part}`} className={styles.email}>
        {part}
      </a>
    ) : (
      part
    )
  );
}

export default function EventPage({ event }: EventPageProps) {
  const { t, i18n } = useTranslation("common");
  const locale = i18n.language;

  const priceSection = event.priceInfo?.specialPrice ? (
    <>
      <span className={styles.originalPrice}>
        CHF {event.priceInfo.oldPrice}.–
      </span>
      <div className={styles.noWrap}>
        <span className={styles.price}>CHF {event.priceInfo.price}.–</span>
        <span className={styles.priceLabel}>{t("events.specialPrice")}</span>
      </div>
    </>
  ) : (
    <>
      <span className={styles.price}>CHF {event.priceInfo?.price}.–</span>
    </>
  );

  return (
    <main className={styles.page}>
      <SeoHead
        title={{
          de: event.name ?? "Event",
          en: event.name ?? "Event",
        }}
        description={{
          de: event.descriptionParagraphs?.de?.[0] ?? "Details zum Event.",
          en: event.descriptionParagraphs?.en?.[0] ?? "Event details.",
        }}
      />
      <section>
        <div className={styles.event_base_container}>
          <Image
            src={event.coverImageUrl}
            alt={event.name}
            width={600}
            height={400}
            className={styles.coverImage}
          />
        </div>
      </section>

      <section className={styles.header}>
        <div className={styles.event_base_container}>
          <h2>{event.name}</h2>
          <div className={styles.meta}>
            <div className={styles.dateTime}>
              <div className={styles.metaRow}>
                <CalendarIcon className={styles.svg} />
                <p>
                  <strong>
                    {new Date(event.startDate).toLocaleDateString(locale)}
                  </strong>
                </p>
              </div>
              <div className={styles.metaRow}>
                <ClockIcon className={styles.svg} />
                <p>
                  <strong>
                    {formatTimeRange(event.startDate, event.endDate)}
                  </strong>
                </p>
              </div>
            </div>
            <div className={styles.metaLocation}>
              <div className={styles.metaLocationTop}>
                <MapPinIcon className={styles.svg} />
                <p>{event.locationDetails.name}</p>
              </div>
              <p id={styles.street}>{event.locationDetails.street}</p>
              <p id={styles.zipCity}>
                {event.locationDetails.zip} {event.locationDetails.city}
              </p>
            </div>
            <div className={styles.metaPrice}>
              <CoinsIcon className={styles.svg} />
              <div className={styles.priceSection}>{priceSection}</div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.description}>
        <div className={styles.event_base_container}>
          <div className={styles.logos}>
            <div className={styles.logoWrapper}>
              <Image
                src="/images/logo/color.png"
                alt="Dineysos Logo"
                width={300}
                height={100}
                className={styles.logoImage}
              />
            </div>
            <div className={styles.logoWrapperSmall}>
              <Image
                src="/images/icons/orangex.png"
                alt="X"
                width={120}
                height={120}
                className={styles.logoImageSmall}
              />
            </div>
            <div className={styles.logoWrapper}>
              <Image
                src={event.logoUrl}
                alt={`${event.name} Logo`}
                width={300}
                height={100}
                className={styles.logoImage}
              />
            </div>
          </div>
          {event.descriptionParagraphs[locale as "de" | "en"]?.map(
            (para, idx) => (
              <p key={idx}>{formatParagraph(para)}</p>
            )
          )}
        </div>
      </section>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  if (!locales) {
    throw new Error("Expected locales to be defined in getStaticPaths");
  }

  const slugs = await fetchAllEventSlugs();

  const paths = slugs.flatMap((slug) =>
    locales.map((locale) => ({
      params: { slug },
      locale,
    }))
  );

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const { params, locale } = context;

  const event = await fetchEventBySlug(params?.slug as string);

  return {
    props: {
      event,
      ...(await serverSideTranslations(locale ?? "de", ["common"])),
    },
  };
};

function formatTimeRange(start: string, end: string) {
  const startTime = new Date(start).toLocaleTimeString("de-CH", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const endTime = new Date(end).toLocaleTimeString("de-CH", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${startTime} – ${endTime}`;
}
