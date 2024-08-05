import prisma from '@/lib/db'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'


export const POST = async (req: NextRequest ) => {
   
    const { lastName, firstName, age, contact, workstation } = await req.json()
    console.log("from the back")
console.log("lastname :" ,lastName)
console.log("firstname :" ,firstName)
console.log("age :" ,age)
console.log("contact :" ,contact)
console.log("workstation :" ,workstation)
  

    try {
      const newEmployee = await prisma.employee.create({
        data: {
          lastName,
          firstName,
          age,
          contact,
          workstation,
        },
      })
      return NextResponse.json({
        status : 200,
        message : "employee created"
      })
    } catch (error) {
        console.log("err", error)
        return NextResponse.json({
            status : 400,
            message : "error en creation"
          })    }
  } 

