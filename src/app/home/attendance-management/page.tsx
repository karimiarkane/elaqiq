import EmployeeMarkAttendance from '@/app/components/EmployeeMarkAttendance'
import prisma from '@/lib/db'
import React from 'react'

const   page = async () => {
  const employees = await prisma.employee.findMany()
  return (
<>
<EmployeeMarkAttendance data={employees} />
</>

  )
}

export default page