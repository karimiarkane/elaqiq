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
      return  NextResponse.json({message : "Employé modifié avec succès " , status: 200 });
    } catch (err) {    
      console.error('yaaaa reb Error updating employe catched from the back in the put hundler  : ', err);  
      return NextResponse.json({
        message: "Une erreur est survenue. Veuillez réessayer plus tard.",
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
    try {
        await prisma.employee.delete({ where: { id: parseInt(id) } });
        return NextResponse.json({ status: 200, message: "Employé supprimé avec succès." });
    } catch (err) {
      console.error('yaaaa reb Error deleting employe catched from the back in the delete hundler  : ', err);  // log the error in your server logs for debugging purposes
      return NextResponse.json({
        message: "Une erreur est survenue. Veuillez réessayer plus tard.",
        status: 500,
      });
    }
  }


