import React from "react";
import prisma from "@/lib/db";
import EmployeeTable from "@/app/components/EmployeeTable";
export const dynamic = 'force-dynamic'

const page = async () => {
  const employees = await prisma.employee.findMany();

  return (
    <>
      <EmployeeTable data={employees} />
    </>
  );
};

export default page;
