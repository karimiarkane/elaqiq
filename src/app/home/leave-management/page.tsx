import AddEmployee from "@/app/components/AddEmployeeModal";
import React from "react";
import prisma from "@/lib/db";
import LeaveTable from "@/app/components/LeaveTable";
export const dynamic = 'force-dynamic'

const page = async () => {
  const employees = await prisma.employee.findMany();
  const leaves = await prisma.leave.findMany();
  console.log("employees  data to pass to the LeaveTable component" , employees)
  console.log("leaves  data to pass to the LeaveTable component" , leaves)


  return (
    <>
      <LeaveTable data={employees} leaves = {leaves}/>
    </>
  );
};

export default page;