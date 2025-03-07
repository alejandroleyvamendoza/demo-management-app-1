import { ZodError } from "zod";
import { SignupFormSchema, validateSignupForm } from "../lib/definitions";
import { AuthResult } from "../ui/authForm";

export async function signup(state: AuthResult, formData: FormData): Promise<AuthResult> {
  // Validar campos del formulario
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    lastname: formData.get('lastname'),
    wa_id: formData.get('wa_id'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  validateSignupForm(formData).then((result) => {
    if (result && result.errors) {
      console.log('Validation errors:', result.errors);
    } else if (result && result.message) {
      console.log('Error message:', result.message);
    } else {
      console.log('Validation successful.');
    }
  });


  if (!validatedFields.success) {
    if (validatedFields.error instanceof ZodError) {
      const errors: { [key: string]: string[] } = {};
      console.log('=========== validatedFields ===============', validatedFields, validatedFields.error instanceof ZodError);

      validatedFields.error.issues.forEach((issue) => {
        const field = issue.path[0]; // El nombre del campo que falló
        const message = issue.message; // El mensaje de error

        if (!errors[field]) {
          errors[field] = [];
        }
        errors[field].push(message);
        console.log('=========== errors ===============', {errors, field, message});
      });



      return { message: '', type: 'INVALID_FIELD' };
    } else {
      return { message: 'An unexpected error occurred.', type: 'INVALID_FIELD' };
    }
    // return {
    //   message: 'Error en los datos ingresados',
    //   type: 'INVALID_CREDENTIALS',
    // };
  }

  try {
    const response = await fetch('/api/user/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validatedFields.data),
    });

    if (response.ok) {
      return { message: 'Registro exitoso', type: 'SUCCESS' };
    } else {
      return { message: 'Error al registrar usuario', type: 'SERVER_ERROR' };
    }
  } catch (error) {
    return { message: 'Error inesperado', type: 'SERVER_ERROR' };
  }
}