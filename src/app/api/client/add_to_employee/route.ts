import { PrismaClient, Role } from "@prisma/client";

let prisma = new PrismaClient();


export async function POST(req: Request) {
  const body = await req.json();

  const clients = body.data.clients
  const user = body.data.user;

  console.log('====================== add_to_employee ======================', user, clients)


  // await prisma.$transaction(
  //   body.data.clients.map(client =>
  //     prisma.userClient.create({
  //       data: {
  //         userId: body.data.user.id,
  //         clientId: client.id,
  //       },
  //     })
  //   )
  // );

  // await prisma.$transaction(
  //   body.data.clients.map(client =>
  //     prisma.userClient.upsert({
  //       where: {
  //         userId_clientId: {
  //           userId: body.data.user.id,
  //           clientId: client.id,
  //         }
  //       },
  //       update: {
  //         // Aquí puedes actualizar campos si es necesario
  //         // Por ejemplo, si tienes un campo "updatedAt":
  //         createdAt: new Date(),
        
  //       },
  //       create: {
  //         userId: body.data.user.id,
  //         clientId: client.id,
  //         createdAt: new Date(),
          
          
  //         // ... otros campos que quieras crear inicialmente
  //       },
  //     })
  //   )
  // );

  // await prisma.$transaction(async (tx) => {  // Usamos un callback async para la transacción

  //   const clientsRelatedUser = await tx.userClient.findMany({
  //     where: { clientId: body.data.user.id },
  //   });

    

  //   const getUsers = await tx.userClient.findMany({
  //     where: { userId: body.data.user.id },
  //   });

  
  //   // 2. Identificar relaciones a eliminar
  //   const relationshipsToDelete = clientsRelatedUser.filter(existingRel =>
  //     !body.data.clients.some(client => client.id === existingRel.clientId)
  //   );


  
  
  //   // 3. Operaciones dentro de la transacción
  //   // await Promise.all( // Ejecutar upsert y delete en paralelo
  //   //   body.data.clients.map(client =>
  //   //     tx.userClient.upsert({
  //   //       where: { userId_clientId: { userId: body.data.user.id, clientId: client.id } },
  //   //       update: { createdAt: new Date() }, // Actualizar si existe, puedes agregar más campos
  //   //       create: { userId: body.data.user.id, clientId: client.id, createdAt: new Date() },
  //   //     })
  //   //   )
  //   // );
  
  //   // await Promise.all( // Ejecutar las eliminaciones en paralelo
  //   //   relationshipsToDelete.map(rel =>
  //   //     tx.userClient.delete({
  //   //       where: { userId_clientId: { userId: rel.userId, clientId: rel.clientId } },
  //   //     })
  //   //   )
  //   // );
  
  // }); // Fin de la transacción

  await prisma.$transaction(async (tx) => {

    // 1. Obtener los IDs de los clientes a asignar
    const clientIdsToAssign = clients.map(client => client.id);

  console.log('====================== add_to_employee clientIdsToAssign ======================', { clientIdsToAssign });
  
  
  // 2. Eliminar relaciones existentes para esos clientes (con cualquier usuario)
  await tx.userClient.deleteMany({
    where: { clientId: { in: clientIdsToAssign } },
  });

  console.log('====================== add_to_employee clientIdsToAssign ======================', { clientIdsToAssign });
  
    // 3. Crear nuevas relaciones
    await Promise.all(
      clients.map(client =>
        tx.userClient.create({
          data: {
            userId: body.data.user.id,
            clientId: client.id,
            createdAt: new Date(),
          },
        })
      )
    );

    await tx.client.updateMany({
      where: { id:  { in: clientIdsToAssign } }, data: { managerId: user.id },
    });
  
  });


  return Response.json({ success: true });
}