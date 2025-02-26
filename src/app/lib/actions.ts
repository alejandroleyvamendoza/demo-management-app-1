'use server';

import { AuthError } from 'next-auth';
import { signIn, signOut } from '../../../auth';
import { AuthResult } from '../ui/login-form';

export async function authenticate(state: AuthResult, formData: FormData): Promise<AuthResult> {
  console.log('====================== actions.ts authenticate ======================');

  try {
    console.log('====================== actions.ts USER ======================');
    const user = await signIn('credentials', formData);
    console.log('====================== actions.ts USER ======================', { user });

    return { message: 'Éxito', type: 'SUCCESS' };
  } catch (error) {
    if (error instanceof AuthError) {
      console.log('====================== actions.ts AuthError ======================', { error });
      switch (error.type) {
        case 'CredentialsSignin':
          return { message: 'Credenciales inválidas.', type: 'INVALID_CREDENTIALS' };
        default:
          return { message: 'Error en el servidor.', type: 'SERVER_ERROR' };
      }
    }
    throw error;
  }
}

export async function logOut(state: AuthResult) {
  await signOut({ redirectTo: '/' });
  return { message: 'Sesión cerrada', type: 'SUCCESS' };
}