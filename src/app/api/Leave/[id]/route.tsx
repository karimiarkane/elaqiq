import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

import { eachDayOfInterval } from 'date-fns';


export const DELETE = async (req: NextRequest ,   { params }: { params: { id: string } }) => {
  console.log("on the back")
   
   try{ const { id } = params
   console.log("id", id)
    const leave = await prisma.leave.findUnique({
        where: { id: parseInt(id) },
    });
    console.log("leave" , leave)
    const formattedEndDate = leave ? leave.endDate :null
    const formattedStartDate =leave ? leave.startDate: null;

console.log("formattedStartDate" , formattedStartDate)
    console.log("formattedEndDate" , formattedEndDate)
       
          // Create attendance records for each day in the leave period
          const leaveDays = eachDayOfInterval({
            start: formattedStartDate,
            end: formattedEndDate,
          });
    
          for (const date of leaveDays) {
            console.log("date : ", date);
            await prisma.attendance.deleteMany({
              where: { employeeId: leave.employeeId, date },
             
            });
          }

          await prisma.leave.delete({
            where: { id: parseInt(id) },
          });
    
    return NextResponse.json({status : 200 , message : "conge supprime"})
    
    }catch (error) {
      console.error('Error supprission de conge : ', error);  // log the error in your server logs for debugging purposes
    
    return NextResponse.json({ message: 'Erreur interne du serveur', status :500 });
    }
    }
    