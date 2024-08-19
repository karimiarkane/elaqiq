import RecapTable from '@/app/components/RecapTable'
import prisma from '@/lib/db'
import React from 'react'

const page = async () => {
//  const Employees = await  prisma.employee.findMany()
//  const Attendance = await prisma.attendance.findMany()
const now = new Date()
const data = await prisma.employee.findMany({
  include :{
    attendance :{
      where :{
        date : {
          gte : new Date(now.getFullYear() , now.getMonth() , 1),
          lte : new Date(now.getFullYear() , now.getMonth()  +1 , 0)
        }
      }
    }
  }
})
  return (
   <RecapTable data ={data}/>
  )
}

export default page