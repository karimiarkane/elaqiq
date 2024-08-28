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
console.log("employees  data to pass to the RecapTable component" , data)

  return (
   <RecapTable data ={data}/>
  )
}

export default page