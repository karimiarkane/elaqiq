"use client"

import {DateInput} from "@nextui-org/react";
import {CalendarDate, parseDate} from "@internationalized/date";

export default function DateInputComponent() {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <DateInput 
          defaultValue={parseDate("2024-04-04")} 
          placeholderValue={new CalendarDate(1995, 11, 6)} 
        />
    </div>
  );
}