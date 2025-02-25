import { prisma } from "app/app/module/database";

export async function POST(req: Request) {
  const body = await req.json();

  const users = body.data.users
  const user = body.data.user;

  console.log('====================== add_to_manager ======================', user, users, body)

  await prisma.$transaction(async (tx) => {

    // 1. Obtener los IDs de los useres a asignar
    const userIdsToAssign = users.map(u => u.id);

  console.log('====================== add_to_manager userIdsToAssign ======================', { userIdsToAssign });
  
  
  // 2. Eliminar relaciones existentes para esos useres (con cualquier usuario)
  await tx.userRelationship.deleteMany({
    where: { employeeId: { in: userIdsToAssign } },
  });

  console.log('====================== add_to_manager userIdsToAssign ======================', { userIdsToAssign });
  
    // 3. Crear nuevas relaciones
    await Promise.all(
      users.map(u =>
        tx.userRelationship.create({
          data: {
            managerId: parseInt(user.id),
            employeeId: u.id,
            // createdAt: new Date(),
          },
        })
      )
    );

    console.log('====================== add_to_manager BEFORE_UPDATE ======================');


    await tx.user.updateMany({
      where: { id:  { in: userIdsToAssign } }, data: { managerId: parseInt(user.id) },
    });
  
  });


  return Response.json({ success: true });
}