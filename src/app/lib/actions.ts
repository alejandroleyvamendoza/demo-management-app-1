'use server';

import { AuthError } from 'next-auth';
import { signIn, signOut } from '../../../auth';

// ...

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {

  console.log('====================== actions.ts authenticate ======================');

  try {
    console.log('====================== actions.ts USER ======================');
    const user = await signIn('credentials', formData);
    console.log('====================== actions.ts USER ======================', { user });
  } catch (error) {
    if (error instanceof AuthError) {
      console.log('====================== actions.ts AuthError ======================', { error });
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function logOut(
  prevState: string | undefined
) {
  await signOut({ redirectTo: '/' });
}