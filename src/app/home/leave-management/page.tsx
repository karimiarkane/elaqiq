import AddEmployee from "@/app/components/AddEmployeeModal";
import React from "react";
import prisma from "@/lib/db";
import LeaveTable from "@/app/components/LeaveTable";
export const dynamic = 'force-dynamic'

const page = async () => {
  const employees = await prisma.employee.findMany();
  const leaves = await prisma.leave.findMany();

  return (
    <>
      <LeaveTable data={employees} leaves = {leaves}/>
    </>
  );
};

export default page;