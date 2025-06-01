import React, { useState, useEffect } from "react";

export default function DateTimeDisplay() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // ساخت فرمت تاریخ به شکل: یکشنبه - 11 خرداد 1404
  const fa = new Intl.DateTimeFormat("fa-IR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Tehran"
  });
  const dateParts = fa.formatToParts(now);
  const weekday = dateParts.find(p => p.type === 'weekday')?.value;
  const day = dateParts.find(p => p.type === 'day')?.value;
  const month = dateParts.find(p => p.type === 'month')?.value;
  const year = dateParts.find(p => p.type === 'year')?.value;
  const formattedDate = `${weekday} - ${day} ${month} ${year}`;

  const time = now.toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Tehran"
  });

  return (
    <div className="flex flex-col items-center md:flex-row md:gap-4 gap-1 text-xs md:text-base font-semibold text-blue-700 dark:text-blue-300">
      <span>{formattedDate}</span>
      <span className="hidden md:inline">|</span>
      <span className="mt-1 md:mt-0 md:ml-4 text-blue-700 dark:text-blue-300 font-bold md:text-lg tracking-widest" style={{fontFamily: 'monospace, Tahoma, Arial'}}>{time}</span>
    </div>
  );
} 