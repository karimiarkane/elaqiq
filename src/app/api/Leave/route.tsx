import prisma from "@/lib/db";
import { NextResponse , NextRequest } from "next/server";

import { eachDayOfInterval } from 'date-fns';


export const POST = async (req: NextRequest ) => {
   
  const { employeId, reason, endDate,startDate }= await req.json()
  console.log("from the back the leave info to create")
console.log("employeId :" ,employeId)
console.log("reason :" ,reason)
console.log("endDate :" ,endDate)
console.log("startDate :" ,startDate)
const formattedStartDate = new Date(startDate.year, startDate.month - 1, startDate.day);
const formattedEndDate = new Date(endDate.year, endDate.month - 1, endDate.day);
formattedEndDate.setHours(0,0,0,0)
formattedStartDate.setHours(0,0,0,0)

console.log("formattedStartDate :" , formattedStartDate)
console.log("formattedEndDate :" , formattedEndDate)

try{
    const newLeave = await prisma.leave.create({
        data: {
        employeeId :   employeId,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
          reason : reason,
        },
      });

      // Create attendance records for each day in the leave period
      const leaveDays = eachDayOfInterval({
        start: formattedStartDate,
        end: formattedEndDate,
      });

      for (const date of leaveDays) {
        console.log("leave day  (one attendance): ", date);
        await prisma.attendance.upsert({
          where: { employeeId_date: { employeeId : employeId, date } },
          update: { status: 'conge' },
          create: { employeeId : employeId, date, status: 'conge' },
        });
}
return NextResponse.json({status : 200 , message : "congé creé avec succés"})

}catch (error) {
  console.error('Error creating leace : ', error);  // log the error in your server logs for debugging purposes

return NextResponse.json({ message: 'Erreur interne du serveur', status :500 });
}
}


