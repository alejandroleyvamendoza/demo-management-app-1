import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 px-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md text-center">
        <h1 className="text-4xl font-extrabold text-gray-900">Bienvenido 🚀</h1>
        <p className="text-lg text-gray-600 mt-3">Únete a nuestra plataforma y descubre todas las funciones increíbles que tenemos para ti.</p>

        <div className="mt-6 space-y-4">
          <Link
            href="/login"
            className="w-full inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 text-white font-semibold shadow-md transition duration-300 hover:bg-indigo-500 focus:ring focus:ring-indigo-300"
          >
            Iniciar Sesión
          </Link>
          <Link
            href="/signup"
            className="w-full inline-flex items-center justify-center rounded-lg bg-green-600 px-6 py-3 text-white font-semibold shadow-md transition duration-300 hover:bg-green-500 focus:ring focus:ring-green-300"
          >
            Crear Cuenta
          </Link>
        </div>
      </div>
    </div>
  );
}
