import { SignupFormSchema } from "../lib/definitions";
import { AuthResult } from "../ui/login-form";

export async function signup(state: AuthResult, formData: FormData): Promise<AuthResult> {
    // Validar campos del formulario
    const validatedFields = SignupFormSchema.safeParse({
      name: formData.get('name'),
      lastname: formData.get('lastname'),
      wa_id: formData.get('wa_id'),
      email: formData.get('email'),
      password: formData.get('password'),
    });
  
    if (!validatedFields.success) {
      return {
        message: 'Error en los datos ingresados',
        type: 'INVALID_CREDENTIALS',
      };
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