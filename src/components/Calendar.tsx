import React, { ReactNode } from "react";

import Text from "./Text";

interface CalendarProps {
  children: ReactNode;
}

const Calendar = function Calendar({ children }: CalendarProps) {
  return <div className="w-full grid grid-cols-7 gap-y-12pxr">{children}</div>;
};

// 1. 요일 표시 컴포넌트 (일~토)
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

// 2. 날짜 표시 컴포넌트 (오프셋 반영 및 빌드 에러 방지 구문 적용)
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
      {/* 화요일 시작을 위해 앞에 빈 칸 배치 */}
      {emptySpaces.map((_, index) => (
        <div key={`empty-${index}`} className="w-full" />
      ))}

      {/* 실제 날짜 렌더링 */}
      {totalDates.map((_, i) => {
        const currentDate = startDate + i;
        const isActive = currentDate === activeDate;
        const isSunday = (i + startDayOffset) % 7 === 0;

        return (
          <div
            key={currentDate}
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
