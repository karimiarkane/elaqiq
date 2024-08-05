import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

/*updatde user personnal  info */


export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
  ) {
    try {
      const { id } = params;
      const formDataToStore = await request.json();
      const updatedEmployee = await prisma.employee.update({
        where: { id: parseInt(id) },
        data: formDataToStore,
      });
      return  NextResponse.json({message : "employee modifié " , status: 200 });
    } catch (err) {    
      console.error("Error updating patient: ", err);
      return NextResponse.json({
        message: "une erreur c'est produite veuillez ressayer",
        status: 500,
      });
    }
  }
  
  
  
  /*delete <user>*/
  export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
  ) {
    const id = params.id;
    console.log("id", id)
    try {
        await prisma.employee.delete({ where: { id: parseInt(id) } });
        return NextResponse.json({ status: 200, message: "employee supprimé" });
    } catch (err) {
      console.log("err ", err);
      return NextResponse.json({
        message: "une erreur c'est produite veuillez ressayer",
        status: 500,
      });
    }
  }


