"use client"

import {DateInput} from "@nextui-org/react";

export default function DateInputComponent({ date, setDate }) {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <DateInput 
        value={date}
        onChange={setDate}
        label="mois/jour/année"
        
        />
    </div>
  );
}