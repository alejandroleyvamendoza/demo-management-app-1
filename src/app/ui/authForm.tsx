'use client';

import { useActionState, useEffect, useState } from 'react';
import { authenticate } from '../lib/actions';
import { signup } from '../actions/auth';
import { redirect, useSearchParams } from 'next/navigation';
import { InputContainer } from './components/inputContainer';
import { Message } from './components/message';
import { Loader2, UserPlus, LogIn } from 'lucide-react';

export interface AuthResult {
  message: string;
  type: 'INVALID_CREDENTIALS' | 'SERVER_ERROR' | 'SUCCESS' | null;
}

interface AuthFormProps {
  type: 'login' | 'signup';
}

export default function AuthForm({ type }: AuthFormProps) {
  const searchParams = useSearchParams();
  const callbackUrl = '/arco_asesores/dashboard';


  const [state, action, pending] = useActionState<AuthResult, FormData>(
    type === 'login' ? authenticate : signup,
    { message: '', type: null }
  );

  const [showMessage, setShowMessage] = useState(state.type !== null);
  useEffect(() => {

    console.log('=========== TYPE ===============', type);
    console.log('=========== state ===============', state);

    if (state.type !== null) {
      setShowMessage(true);
      const timer = setTimeout(() => setShowMessage(false), 5000);

      redirectDashboard();
      return () => clearTimeout(timer);
    }
  }, [state]);

  function redirectDashboard() {
    if (state.type === 'SUCCESS') {
      return redirect('/arco_asesores/dashboard');
    }
  }

  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    wa_id: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setShowMessage(false);
  };

  return (
    <div className="flex min-h-screen flex-col justify-center items-center bg-gray-100 px-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          {type === 'login' ? 'Bienvenido de nuevo' : 'Crea tu cuenta'}
        </h2>
        <p className="text-center text-gray-500 text-sm mt-2">
          {type === 'login' ? 'Inicia sesión con tu cuenta' : 'Regístrate para comenzar'}
        </p>

        {showMessage && state.type === 'INVALID_CREDENTIALS' && (
          <Message type="DANGER" message="No autorizado. Verifica tus credenciales." />
        )}

        <form action={action} className="mt-6 space-y-4">
          {type === 'signup' && (
            <>
              <InputContainer>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Nombre"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 py-2 px-4 text-gray-900 focus:border-indigo-500 focus:ring focus:ring-indigo-300"
                />
              </InputContainer>

              <InputContainer>
                <input
                  id="lastname"
                  name="lastname"
                  type="text"
                  placeholder="Apellidos"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 py-2 px-4 text-gray-900 focus:border-indigo-500 focus:ring focus:ring-indigo-300"
                />
              </InputContainer>
            </>
          )}

          <InputContainer>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Correo Electrónico"
              value={formData.email}
              onChange={handleInputChange}
              className="block w-full rounded-md border-gray-300 py-2 px-4 text-gray-900 focus:border-indigo-500 focus:ring focus:ring-indigo-300"
            />
          </InputContainer>

          <InputContainer>
            <input
              id="wa_id"
              name="wa_id"
              type="tel"
              placeholder="Número de WhatsApp"
              value={formData.wa_id}
              onChange={handleInputChange}
              className="block w-full rounded-md border-gray-300 py-2 px-4 text-gray-900 focus:border-indigo-500 focus:ring focus:ring-indigo-300"
            />
          </InputContainer>

          <InputContainer>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Contraseña"
              required
              autoComplete="current-password"
              value={formData.password}
              onChange={handleInputChange}
              className="block w-full rounded-md border-gray-300 py-2 px-4 text-gray-900 focus:border-indigo-500 focus:ring focus:ring-indigo-300"
            />
          </InputContainer>

          <input type="hidden" name="redirectTo" value={callbackUrl} />

          <button
            disabled={pending}
            type="submit"
            className="flex items-center justify-center w-full rounded-md bg-indigo-600 py-2 text-white font-semibold shadow-md transition duration-200 hover:bg-indigo-500 disabled:bg-indigo-300"
          >
            {pending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" /> {type === 'login' ? 'Iniciando...' : 'Registrando...'}
              </>
            ) : (
              <>
                {type === 'login' ? <LogIn className="w-5 h-5 mr-2" /> : <UserPlus className="w-5 h-5 mr-2" />}
                {type === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
              </>
            )}
          </button>

          <p className="text-center text-gray-500 text-sm mt-4">
            {type === 'login'
              ? "¿No tienes cuenta? "
              : "¿Ya tienes cuenta? "}
            <a href={type === 'login' ? "/signup" : "/login"} className="text-indigo-600 font-semibold hover:underline">
              {type === 'login' ? "Regístrate aquí" : "Inicia sesión"}
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
