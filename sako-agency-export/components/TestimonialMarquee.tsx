"use client";

import React from "react";
import { cn } from "@/lib/utils";

type CardT = {
  image: string;
  name: string;
  handle: string;
  quote: string;
};

const SAKO_DATA_1: CardT[] = [
  {
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    name: "Marcus Vance",
    handle: "CEO, Vance & Co.",
    quote: "SAKO didn't just build us a website — they rebuilt our entire digital identity. Revenue up 340% in 8 months.",
  },
  {
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    name: "Sophia Chen",
    handle: "Founder, Heliox Capital",
    quote: "Every agency promised results. SAKO delivered them. Our platform went from concept to $2.4M ARR in under a year.",
  },
  {
    image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
    name: "Jordan Lee",
    handle: "@jordantalks",
    quote: "The speed and precision of their execution is unmatched. A true partner in our growth journey.",
  },
  {
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60",
    name: "Avery Johnson",
    handle: "@averywrites",
    quote: "Their design language is in a league of its own. It's rare to find an agency that gets luxury digital right.",
  },
];

const SAKO_DATA_2: CardT[] = [
  {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
    name: "Julien Moreau",
    handle: "Director, Maison Verre",
    quote: "The AR experience they built generated international press coverage we couldn't have bought. Extraordinary work.",
  },
  {
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
    name: "Elena Rossi",
    handle: "Creative Lead, V-Motors",
    quote: "Bespoke, refined, and data-driven. SAKO is the gold standard for modern brand evolution.",
  },
  {
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200",
    name: "Robert Blake",
    handle: "@blake_designs",
    quote: "They don't just follow trends; they set them. Our conversion rate doubled within weeks of the new launch.",
  },
  {
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200",
    name: "Sarah Jenkins",
    handle: "COO, Zenith Ops",
    quote: "Professionalism at its peak. The team at Sako Agency is a joy to work with and incredibly talented.",
  },
];

const VerifyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 48 48"
    className="inline-block"
  >
    <polygon
      fill="var(--gold)"
      points="29.62,3 33.053,8.308 39.367,8.624 39.686,14.937 44.997,18.367 42.116,23.995 45,29.62 39.692,33.053 39.376,39.367 33.063,39.686 29.633,44.997 24.005,42.116 18.38,45 14.947,39.692 8.633,39.376 8.314,33.063 3.003,29.633 5.884,24.005 3,18.38 8.308,14.947 8.624,8.633 14.937,8.314 18.367,3.003 23.995,5.884"
    ></polygon>
    <polygon
      fill="#000"
      points="21.396,31.255 14.899,24.76 17.021,22.639 21.428,27.046 30.996,17.772 33.084,19.926"
    ></polygon>
  </svg>
);

const Card = ({ card }: { card: CardT }) => (
  <div className="p-4 rounded-lg mx-4 shadow hover:shadow-lg transition-all duration-200 w-72 shrink-0 bg-black-2 group hover:-translate-y-1">
    <div className="flex gap-2 items-center">
      <img 
        className="size-11 rounded-full object-cover ring-1 ring-[rgba(201,168,76,0.2)] group-hover:ring-[rgba(201,168,76,0.5)] transition-all duration-200 flex-shrink-0" 
        style={{ width: "44px", height: "44px", minWidth: "44px", minHeight: "44px", objectFit: "cover" }}
        src={card.image} 
        alt={card.name} 
      />
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1">
          <p className="font-medium text-white text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>{card.name}</p>
          <VerifyIcon />
        </div>
        <span className="text-xs text-[var(--gold)] uppercase tracking-widest font-semibold" style={{ fontFamily: "'Syne', sans-serif" }}>{card.handle}</span>
      </div>
    </div>
    <p className="text-sm pt-4 text-[var(--cream-dim)] leading-relaxed italic" style={{ fontFamily: "'Cormorant', serif", fontSize: "15px" }}>
      "{card.quote}"
    </p>
  </div>
);

function MarqueeRow({
  data,
  reverse = false,
  speed = 40,
}: {
  data: CardT[];
  reverse?: boolean;
  speed?: number;
}) {
  const doubled = React.useMemo(() => [...data, ...data, ...data], [data]);
  return (
    <div className="relative w-full overflow-hidden isolation-isolate py-6">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-32 md:w-64 z-10 bg-gradient-to-r from-[var(--black)] to-transparent" />
      <div
        className={cn(
          "flex transform-gpu min-w-[300%]",
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        )}
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {doubled.map((c, i) => (
          <Card key={i} card={c} />
        ))}
      </div>
      <div className="pointer-events-none absolute right-0 top-0 h-full w-32 md:w-64 z-10 bg-gradient-to-l from-[var(--black)] to-transparent" />
    </div>
  );
}

export default function TestimonialMarquee() {
  return (
    <div className="flex flex-col gap-2 w-full py-10">
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
      <MarqueeRow data={SAKO_DATA_1} reverse={false} speed={45} />
      <MarqueeRow data={SAKO_DATA_2} reverse={true} speed={50} />
    </div>
  );
}
