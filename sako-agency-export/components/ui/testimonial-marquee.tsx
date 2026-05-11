"use client";

import React from "react";

export type TestimonialCardT = {
  image: string;
  name: string;
  handle: string;
  quote: string;
};

const VerifyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 48 48"
    className="inline-block"
  >
    <polygon
      fill="#42a5f5"
      points="29.62,3 33.053,8.308 39.367,8.624 39.686,14.937 44.997,18.367 42.116,23.995 45,29.62 39.692,33.053 39.376,39.367 33.063,39.686 29.633,44.997 24.005,42.116 18.38,45 14.947,39.692 8.633,39.376 8.314,33.063 3.003,29.633 5.884,24.005 3,18.38 8.308,14.947 8.624,8.633 14.937,8.314 18.367,3.003 23.995,5.884"
    ></polygon>
    <polygon
      fill="#fff"
      points="21.396,31.255 14.899,24.76 17.021,22.639 21.428,27.046 30.996,17.772 33.084,19.926"
    ></polygon>
  </svg>
);

const Card = ({ card }: { card: TestimonialCardT }) => (
  <div className="p-[1.5vh] rounded-[1.2vw] mx-[1vw] shadow-lg hover:shadow-2xl transition-all duration-300 w-[22vw] min-w-[280px] shrink-0 bg-white border border-slate-100">
    <div className="flex gap-[0.8vw] items-center">
      <img 
        className="size-[3vw] min-w-[44px] min-h-[44px] rounded-full object-cover" 
        src={card.image} 
        alt={card.name} 
      />
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-[0.4vw]">
          <p className="font-semibold text-slate-900 text-[1vw] min-text-[14px]">{card.name}</p>
          <VerifyIcon />
        </div>
        <span className="text-[0.8vw] min-text-[12px] text-slate-500">{card.handle}</span>
      </div>
    </div>
    <p className="text-[0.9vw] min-text-[13px] pt-[2vh] text-slate-700 leading-relaxed italic">
      "{card.quote}"
    </p>
  </div>
);

function MarqueeRow({
  data,
  reverse = false,
  speed = 40,
}: {
  data: TestimonialCardT[];
  reverse?: boolean;
  speed?: number;
}) {
  const doubled = React.useMemo(() => [...data, ...data, ...data], [data]);
  return (
    <div className="relative w-full overflow-hidden isolation-isolate py-[2vh]">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-[10vw] z-10 bg-gradient-to-r from-[var(--black)] to-transparent" />
      <div
        className={`flex transform-gpu min-w-[300%] ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {doubled.map((c, i) => (
          <Card key={i} card={c} />
        ))}
      </div>
      <div className="pointer-events-none absolute right-0 top-0 h-full w-[10vw] z-10 bg-gradient-to-l from-[var(--black)] to-transparent" />
    </div>
  );
}

export default function TestimonialMarquee({
  row1,
  row2,
}: {
  row1: TestimonialCardT[];
  row2: TestimonialCardT[];
}) {
  return (
    <div className="flex flex-col gap-[2vh] w-full py-[5vh]">
      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee {
          animation: marqueeScroll linear infinite;
        }
        .animate-marquee-reverse {
          animation: marqueeScroll linear infinite reverse;
        }
        .animate-marquee:hover, .animate-marquee-reverse:hover {
          animation-play-state: paused;
        }
      `}</style>
      <MarqueeRow data={row1} reverse={false} speed={35} />
      <MarqueeRow data={row2} reverse={true} speed={40} />
    </div>
  );
}
