import { Suspense } from "react";
import LoginForm from "./ui/login-form";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Our Platform</h1>
      <p className="text-lg text-gray-600 mb-8">Join us and explore amazing features!</p>
      <div className="space-x-4">
        <Link href={'/login'} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Iniciar Sesión
        </Link>
        <Link href={'/signup'} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          Crear Cuenta
        </Link>
      </div>
    </div >
  );

}
