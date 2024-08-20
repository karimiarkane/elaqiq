"use client"
import React from "react";
import {DateInput} from "@nextui-org/react";
import {CalendarDate, parseDate} from "@internationalized/date";
import { CalendarIcon } from "./CalendarIcon";
import { I18nProvider } from "@react-aria/i18n";

export default function StartEndLeaveDate({startDate,endDate,setEndDate,setStartDate} : {startDate :any ,endDate : any,setEndDate : any,setStartDate : any}) {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
      <I18nProvider locale="en-GB">
      <div  className="m-3">
            <label className="text-gray-700" htmlFor="datedebut"> Date Debut :</label>
            <DateInput
            id="datedebut"
             label="jours/mois/année"
            value={startDate }
            
              onChange={setStartDate}
              placeholderValue={new CalendarDate(1995, 11, 6)}
              startContent={
               <CalendarIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
            />
        </div>
       
        <div className="m-3">
            <label  className="text-gray-700" htmlFor="datefin">Date Fin :</label>
            <DateInput
            id="datefin"
             label="jours/mois/année"
               value={endDate}
              onChange={setEndDate}
       
              placeholderValue={new CalendarDate(1995, 11, 6)}
              endContent={
               <CalendarIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
            />
        </div>
        </I18nProvider>
      </div>
    </div>  
  );
}
