"use client"

import {DateInput} from "@nextui-org/react";
import { I18nProvider } from "@react-aria/i18n";

export default function DateInputComponent({ date, setDate }) {
  return (
<I18nProvider locale="en-GB">
<div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <DateInput 
        value={date}
        onChange={setDate}
        label="jour/mois/année"
        />
    </div>
    </I18nProvider>
  
  );
}