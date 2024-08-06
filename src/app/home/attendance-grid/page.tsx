import AttendanceGrid from '@/app/components/GridAttendance';
import prisma from '@/lib/db';
import React from 'react'
export const dynamic = 'force-dynamic'


const page = async () => {
  const responsea = await prisma.attendance.findMany({ 
  });
  // setAttendanceData(responsea);
  console.log("attendance data" , responsea)


// Fetch employees data
  const responsep = await prisma.employee.findMany({});
  // setEmployees(responsep);

  return (
  
<AttendanceGrid attendance={responsea} employees={responsep} />

  )
}

export default page