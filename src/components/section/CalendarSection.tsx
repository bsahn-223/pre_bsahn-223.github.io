"use client";

import React, { useEffect, useRef, useState } from "react";
import Calendar from "../Calendar";
import SlideUp from "../SlideUp";
import Spacing from "../Spacing";
import Text from "../Text";
import Title from "./Title";
import { useInterval } from "@/hooks/useInterval";
import useIsInView from "@/hooks/useIsInView";

// 상단 타이틀을 두 일정의 달(Month)을 강조하는 형태로 변경합니다.
const TITLE = ["WEDDING", "CALENDAR"];

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

  // 애니메이션 상태 초기화 방지 및 정상 종료 처리
  useEffect(() => {
    if (transitionIds.length === TITLE.length + 2) setStartTransition(false);
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

      <Spacing size={25} />

      {/* 1. 8월 사전 피로연 달력 세트 (인덱스 2) */}
      <SlideUp show={transitionIds.includes(TITLE.length)} className="w-full">
        <div className="w-full flex justify-between items-center pb-12pxr border-b border-black/5 mb-12pxr">
          <Text display="block" className="text-[20px] font-bold text-black tracking-widest">
            08 <span className="text-[13px] font-normal text-neutral-500 ml-4pxr">사전 피로연</span>
          </Text>
          <Text display="block" className="text-[12px] text-neutral-500 font-medium">
            15일 토요일 PM 12:00
          </Text>
        </div>
        {/* 2026년 8월 1일은 토요일(시작 요일 오프셋: 6), 총 31일까지 존재 */}
        <Calendar>
          <Calendar.Days />
          <Calendar.Dates startDate={1} endDate={31} activeDate={15} startDayOffset={6} />
        </Calendar>
      </SlideUp>

      <Spacing size={50} />

      {/* 2. 9월 본식 달력 세트 (인덱스 3) */}
      <SlideUp show={transitionIds.includes(TITLE.length + 1)} className="w-full">
        <div className="w-full flex justify-between items-center pb-12pxr border-b border-black/5 mb-12pxr">
          <Text display="block" className="text-[20px] font-bold text-black tracking-widest">
            09 <span className="text-[13px] font-normal text-neutral-500 ml-4pxr">본식</span>
          </Text>
          <Text display="block" className="text-[12px] text-neutral-500 font-medium">
            5일 토요일 AM 11:00
          </Text>
        </div>
        {/* 2026년 9월 1일은 화요일(시작 요일 오프셋: 2), 총 30일까지 존재 */}
        <Calendar>
          <Calendar.Days />
          <Calendar.Dates startDate={1} endDate={30} activeDate={5} startDayOffset={2} />
        </Calendar>
      </SlideUp>
    </section>
  );
}
