import prisma from "@/lib/db";
import { NextResponse , NextRequest } from "next/server";



const markAttendance = async (employeeId, date, status) => {
    const attendance = await prisma.attendance.upsert({
      where: { employeeId_date: { employeeId, date } },
      update: { status },
      create: { employeeId, date, status },
    });
    return attendance;
  };