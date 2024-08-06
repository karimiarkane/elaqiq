import prisma from "@/lib/db";
import { NextResponse , NextRequest } from "next/server";



export const POST = async (req: NextRequest ) => {
   
  const { id, date, status }= await req.json()
  console.log("from the back")
console.log("id :" ,id)
console.log("date :" ,date)
console.log("status :" ,status)
const formattedDate = new Date(date.year, date.month - 1, date.day);
formattedDate.setHours(0,0,0,0)
new Date()
console.log("formattedDate :" , formattedDate)
try{

const newAttendance = await prisma.attendance.upsert({
  where: {
    employeeId_date: {
      employeeId : id,
      date: formattedDate,
    },
  },
  update: {
    status,
  },
  create: {
    employeeId : id,
    date: formattedDate,
    status,
  },
});

return NextResponse.json({status : 200 , message : "attendance created"})

}catch (error) {
  console.error('Error creating attendancd : ', error);  // log the error in your server logs for debugging purposes

return NextResponse.json({ message: 'Erreur interne du serveur', status :500 });
}
}