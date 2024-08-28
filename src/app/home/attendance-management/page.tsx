import EmployeeMarkAttendance from '@/app/components/EmployeeMarkAttendance'
import prisma from '@/lib/db'
import React from 'react'
export const dynamic = 'force-dynamic'

const   page = async () => {
  const employees = await prisma.employee.findMany()
  console.log("employees  data to pass to the EmployeeMarkAttendance component" , employees)
  return (
<>
<EmployeeMarkAttendance data={employees} />
</>

  )
}

export default page