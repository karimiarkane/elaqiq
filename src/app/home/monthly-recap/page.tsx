import RecapTable from '@/app/components/RecapTable'
import prisma from '@/lib/db'
import React from 'react'
export const dynamic = 'force-dynamic'

const page = async () => {


const data = await prisma.employee.findMany({
  include :{
    attendance :{}
  }
})
  return (
   <RecapTable data ={data}/>
  )
}

export default page