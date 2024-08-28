import prisma from '@/lib/db'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'


export const POST = async (req: NextRequest ) => {
  console.log("we are in the funciton to create new employee")
   
    const { lastName, firstName, age, contact, workstation } = await req.json()
    console.log("from the back info to create the new employee")
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
        message : "employé creé avec succé"
      })
    } catch (error) {
        console.log("err creating new employee", error)
        return NextResponse.json({
            status : 400,
            message : "une erreur interne au serveur c'est produite"
          })    }
  } 

