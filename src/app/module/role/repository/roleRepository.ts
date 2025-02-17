import { Role } from "@prisma/client";
import { prisma } from "../../database";


export async function getUserRole(roleName: string): Promise<Role | null> {
    try {

      const role = await prisma.role.upsert({
        where: {
          name: roleName,
        },
        update: {}, // No hay datos para actualizar si el rol ya existe
        create: {
          name: roleName,
        },
      });
  
      return role;
  
    } catch (error) {
      console.error('Failed to fetch role:', error);
      throw new Error('Failed to fetch role.');
    }
  }