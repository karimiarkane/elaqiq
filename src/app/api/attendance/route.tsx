import prisma from "@/lib/db";
import { NextResponse , NextRequest } from "next/server";



export const POST = async (req: NextRequest ) => {
  console.log("we are in the funciton to create new attendance")
   
  const { id, date, status }= await req.json()
  console.log("id employe " , id , "date " ,  date ,"status" , status , "id" , status )
  /* format date because parsDate in dateinput return specail object that contain year , month and day*/
const formattedDate = new Date(date.year, date.month - 1, date.day);
/*set hour to 0,0,0,0, to focus only on day and when submitting to the database the time will be ignored (to attendance with different time with the same day are considered the same) */
formattedDate.setHours(0,0,0,0)
console.log("formattedDate", formattedDate)
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

return NextResponse.json({status : 200 , message : "Présence créée avec succès"})

}catch (error) {
  console.error('yaaaa reb Error creating attendancd catched from the back in the post hundler of creating attendance: ', error);  // log the error in your server logs for debugging purposes

return NextResponse.json({ message: 'Une erreur est survenue lors de la création de la présence. Veuillez réessayer plus tard', status :500 });
}
}