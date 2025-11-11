import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard, A11y } from "swiper/modules";
import { useI18n } from "@/context/i18n";

type SwiperCarouselProps = {
  items: React.ReactNode[];
  className?: string;
  direction?: "horizontal" | "vertical";
  slidesPerView?: number;
  spaceBetween?: number;
  breakpoints?: Record<number, { slidesPerView?: number; spaceBetween?: number }>;
  loop?: boolean;
  showNavigation?: boolean;
  showPagination?: boolean;
  ariaLabel?: string;
};

export default function SwiperCarousel({
  items,
  className,
  direction = "horizontal",
  slidesPerView = 1,
  spaceBetween = 16,
  breakpoints = {
    640: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 2 },
  },
  loop = false,
  showNavigation = true,
  showPagination = true,
  ariaLabel = "Content carousel",
}: SwiperCarouselProps) {
  const hasItems = Array.isArray(items) && items.length > 0;
  const { lang } = useI18n();
  const noDataMsg = lang === "th" ? "ไม่มีข้อมูลสำหรับแสดง" : "No content available.";

  return (
    <div className={className}>
      {hasItems ? (
        <Swiper
          modules={[Navigation, Pagination, Keyboard, A11y]}
          direction={direction}
          slidesPerView={slidesPerView}
          spaceBetween={spaceBetween}
          breakpoints={breakpoints}
          loop={loop}
          keyboard={{ enabled: true, onlyInViewport: true }}
          navigation={showNavigation}
          pagination={showPagination ? { clickable: true } : false}
          a11y={{ enabled: true }}
          aria-label={ariaLabel}
          className="w-full"
        >
          {items.map((node, idx) => (
            <SwiperSlide key={idx}>{node}</SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p role="status" className="text-sm text-zinc-600 dark:text-zinc-400">
          {noDataMsg}
        </p>
      )}
      <noscript>
        <ul className="grid gap-4 sm:grid-cols-2">
          {items?.map((node, idx) => (
            <li key={idx} className="rounded-xl border p-4">
              {node}
            </li>
          ))}
        </ul>
      </noscript>
    </div>
  );
}