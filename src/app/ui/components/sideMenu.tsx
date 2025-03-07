import { useState } from "react";
import { logOut } from "app/app/lib/actions";
import { LayoutDashboard, Link as LucideLink, User as UserIcon } from "lucide-react";
import Link from "next/link";

export default function SideMenu({ children }: { children: React.ReactNode }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

    return (
        <div className="flex">
            {/* Botón para abrir el menú */}
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="fixed top-4 left-4 z-50 p-2 bg-gray-200 rounded-md shadow-md hover:bg-gray-300"
            >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2 4.75h16a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" clipRule="evenodd" />
                </svg>
            </button>

            {/* Sidebar del Menú */}
            <aside className={`fixed top-0 left-0 z-40 w-64 h-screen bg-white shadow-lg transform transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="p-4">
                    <button onClick={() => setIsMenuOpen(false)} className="absolute top-4 right-4 p-2 bg-gray-200 rounded-md hover:bg-gray-300">✕</button>
                    <form action={logOut} className="mt-10 mb-4">
                        <button className="w-full mt-4 p-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                            Sign Out
                        </button>
                    </form>
                    <nav className="mt-4">
                        <Link
                            href="/arco_asesores/dashboard"
                            className="flex p-2 text-gray-700 hover:bg-gray-100 rounded-md">
                            <LayoutDashboard /> Dashboard
                        </Link>
                    </nav>
                    <nav className="mt-4">
                        <Link
                            href="/arco_asesores/dashboard/user/profile"
                            className="flex p-2 text-gray-700 hover:bg-gray-100 rounded-md">
                            <UserIcon /> Actualizar perfil
                        </Link>
                    </nav>
                </div>
            </aside >

            {/* Botón para abrir los filtros */}
            < button
                onClick={() => setIsFiltersOpen(!isFiltersOpen)
                }
                className="fixed top-4 right-4 z-50 p-2 bg-gray-200 rounded-md shadow-md hover:bg-gray-300"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                </svg>
            </button >

            {/* Sidebar de Filtros */}
            < aside className={`fixed top-0 right-0 z-40 w-64 h-screen bg-white shadow-lg transform transition-transform duration-300 ${isFiltersOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className="p-4">
                    <button onClick={() => setIsFiltersOpen(false)} className="absolute top-4 right-4 p-2 bg-gray-200 rounded-md hover:bg-gray-300">✕</button>
                    <div className="mt-10">
                        <input type="text" placeholder="Id" className="w-full p-2 mb-4 border rounded-md focus:ring-2 focus:ring-blue-400" />
                        <input type="text" placeholder="Nombre" className="w-full p-2 mb-4 border rounded-md focus:ring-2 focus:ring-blue-400" />
                        <input type="text" placeholder="Apellido" className="w-full p-2 mb-4 border rounded-md focus:ring-2 focus:ring-blue-400" />
                        <input type="text" placeholder="Rol" className="w-full p-2 mb-4 border rounded-md focus:ring-2 focus:ring-blue-400" />
                    </div>
                </div>
            </aside >

            {/* Contenido principal */}
            < main className="p-4 w-full min-h-screen" >
                {children}
            </main >
        </div >
    );
}
