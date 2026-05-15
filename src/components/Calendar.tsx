import React, { ReactNode } from "react";

import SlideUp from "./SlideUp";
import Text from "./Text";

const Calendar = ({ children }: { children: ReactNode }) => {
  return <div className="w-full grid grid-cols-7 gap-y-12pxr">{children}</div>;
};

// 1. 일반 함수(function) 문법을 쓰면 React와 ESLint가 자동으로 이름을 인식하여 displayName 생략이 가능합니다.
Calendar.Days = function CalendarDays() {
  return ["일", "월", "화", "수", "목", "금", "토"].map((day, i) => (
    <Text
      key={day}
      display="block"
      className={`font-bold first-letter:w-full py-7.5pxr text-center flex items-center justify-center ${
        i === 0 ? "text-[#00AEFF]" : "text-black"
      }`}
    >
      {day}
    </Text>
  ));
};

interface CalendarDatesProps {
  startDate: number;
  endDate: number;
  activeDate: number;
  startDayOffset?: number;
}

// 2. Dates 컴포넌트도 일반 함수로 작성하여 TypeScript와 ESLint 에러를 원천 차단합니다.
Calendar.Dates = function CalendarDates({
  startDate,
  endDate,
  activeDate,
  startDayOffset = 0
}: CalendarDatesProps) {
  const emptySpaces = Array.from({ length: startDayOffset });
  const totalDates = Array.from({ length: endDate - startDate + 1 });

  return (
    <>
      {emptySpaces.map((_, index) => (
        <div key={`empty-${index}`} className="w-full" />
      ))}

      {totalDates.map((_, i) => {
        const currentDate = startDate + i;
        const isActive = currentDate === activeDate;
        const isSunday = (i + startDayOffset) % 7 === 0;

        return (
          <div
            key={i}
            className="w-full text-center flex justify-center items-center"
          >
            <Text
              display="block"
              className={`w-40pxr py-7.5pxr items-center flex justify-center ${
                isActive
                  ? "bg-black font-bold text-[#00AEFF]"
                  : isSunday
                  ? "text-[#00AEFF]"
                  : ""
              }`}
            >
              {currentDate}
            </Text>
          </div>
        );
      })}
    </>
  );
};

export default Calendar;
