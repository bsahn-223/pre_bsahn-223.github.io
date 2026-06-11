"use client";

import React, { useEffect, useRef, useState } from "react";
import Calendar from "../Calendar";
import SlideUp from "../SlideUp"; // 기존 SlideUp 재사용
import Spacing from "../Spacing";
import Text from "../Text"; // 기존 Text 사용
import Title from "./Title";
import { useInterval } from "@/hooks/useInterval";
import useIsInView from "@/hooks/useIsInView";

const TITLE = ["2026.09.05", "SATURDAY", "AM 11:00"];

export default function CalendarSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [transitionIds, setTransitionIds] = useState<number[]>([]);
  const [startTransition, setStartTransition] = useState(false);
  const [callTimeout, setCallTimeout] = useState(false);

  // 애니메이션 타이밍 로직
  useInterval(() => {
    if (!startTransition || transitionIds.length >= TITLE.length) return;
    setTransitionIds((prev) => prev.concat(prev.length));
  }, 50);

  useInterval(() => {
    if (!startTransition || !callTimeout || transitionIds.length >= TITLE.length + 5) return;
    setTransitionIds((prev) => prev.concat(prev.length));
  }, 50);

  useEffect(() => {
    if (!startTransition) return;
    setTimeout(() => setCallTimeout(true), 1000);
  }, [startTransition]);

  useEffect(() => {
    if (transitionIds.length === 4) setStartTransition(false);
  }, [transitionIds]);

  useIsInView(ref, () => setStartTransition(true));

  return (
    <section id="calendar-section" ref={ref} className="w-full px-24pxr">
      {TITLE.map((title, index) => (
        <SlideUp key={index} show={transitionIds.includes(index)}>
          <Title key={title} display="block">
            {title}
          </Title>
        </SlideUp>
      ))}

      <Spacing size={15} />

      {/* 9월 + 달력 세트 애니메이션 */}
      <SlideUp show={transitionIds.includes(TITLE.length)} className="w-full">
        <div className="w-full flex justify-center items-center pb-20pxr">
          <Text display="block" className="text-[24px] font-bold text-black tracking-widest">
            09
          </Text>
        </div>
        <Calendar>
          <Calendar.Days />
          <Calendar.Dates startDate={1} endDate={26} activeDate={5} startDayOffset={2} />
        </Calendar>
      </SlideUp>
    </section>
  );
}
