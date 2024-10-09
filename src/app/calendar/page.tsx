"use client";
import { Button } from "@/components/ui/button";
import {
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isSameDay,
  isSameMonth,
  startOfMonth,
  subMonths,
} from "date-fns";
import { CalendarCheck, ChevronLeft, ChevronRight } from "lucide-react";
import type React from "react";
import { useState } from "react";

interface TipEntry {
  id: string;
  date: Date;
  title: string;
}

const CalendarPage: React.FC = ({}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);

  const startDate = addDays(monthStart, -getDay(monthStart));
  const endDate = addDays(monthEnd, 6 - getDay(monthEnd));

  const dateRange = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  console.log(getDay(monthStart));

  return (
    <div className="mx-auto max-w-[1750px] border border-red-300">
      <div className="flex items-center justify-between">
        <div></div>
        <div className="flex items-center justify-between gap-2">
          <Button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            variant="outline"
          >
            <ChevronLeft />
          </Button>
          <span>{format(currentMonth, "MMMM yyyy")}</span>
          <Button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            variant="outline"
          >
            <ChevronRight />
          </Button>
        </div>
        <div>
          <Button
            variant={"outline"}
            onClick={() => {
              setSelectedDate(new Date());
              setCurrentMonth(new Date());
            }}
          >
            <CalendarCheck />
          </Button>
        </div>
      </div>
      <div className="mb-4 grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center font-medium">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {dateRange.map((date, i) => (
          <Button
            key={i}
            variant={isSameDay(date, selectedDate) ? "default" : "outline"}
            className={`h-12 ${
              !isSameMonth(date, currentMonth) ? "opacity-50" : ""
            }`}
            onClick={() => setSelectedDate(date)}
          >
            {format(date, "d")}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CalendarPage;
