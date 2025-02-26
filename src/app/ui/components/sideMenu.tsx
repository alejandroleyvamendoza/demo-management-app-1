// import { useActionState, useState } from "react";
// import { logOut } from "app/app/lib/actions";

// export default function SideMenu({
//     children,
// }: Readonly<{
//     children: React.ReactNode;
// }>) {

//     const [state, action, pending] = useActionState(logOut, undefined);


//     const [isShowingMenu, setIsShowingMenu] = useState(false);
//     const [isShowingFilters, setIsShowingFilters] = useState(false);

//     const toggleVisibilityMenu = () => {
//         setIsShowingMenu(!isShowingMenu);
//     };

//     const toggleVisibilityFilters = () => {
//         setIsShowingFilters(!isShowingFilters);
//     };


//     return (
//         <div>
//             <aside id="sidebar-multi-level-sidebar" className="bg-white flex justify-center items-start fixed top-0 left-0 z-40 w-20 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
//                 <button
//                     onClick={toggleVisibilityMenu}
//                     data-drawer-target="sidebar-multi-level-sidebar" data-drawer-toggle="sidebar-multi-level-sidebar" aria-controls="sidebar-multi-level-sidebar" type="button" className="inline-flex items-center p-2 mt-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
//                     <span className="sr-only">Open sidebar</span>
//                     <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                         <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
//                     </svg>
//                 </button>

//             </aside>

//             <aside id="sidebar-multi-level-sidebar" className="bg-white flex justify-center items-start fixed top-0 right-0 z-40 w-20 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
//                 <button
//                     onClick={toggleVisibilityFilters}
//                     data-drawer-target="sidebar-multi-level-sidebar" data-drawer-toggle="sidebar-multi-level-sidebar" aria-controls="sidebar-multi-level-sidebar" type="button" className="inline-flex items-center p-2 mt-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
//                     <span className="sr-only">Open sidebar</span>
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
//                     </svg>

//                 </button>

//             </aside>

//             <aside id="sidebar-multi-level-sidebar"
//                 className={`bg-white fixed top-0 left-20 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 ${isShowingMenu ? 'visible' : 'invisible'}`} aria-label="Sidebar">
//                 <div className="h-full px-3 py-4 overflow-y-auto  dark:bg-gray-800">
//                     <ul className="space-y-2 font-medium">
//                         <li>
//                             <form action={action} className="space-y-6">


//                                 <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
//                                     <div className="hidden md:block">Sign Out</div>
//                                 </button>
//                             </form>
//                         </li>
//                         <li>
//                             <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
//                                 <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
//                                     <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
//                                     <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
//                                 </svg>
//                                 <span className="ms-3">Dashboard</span>
//                             </a>
//                         </li>

//                     </ul>
//                 </div>
//             </aside>

//             <aside id="sidebar-multi-level-sidebar"
//                 className={`bg-white p-4 fixed top-0 right-20 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 ${isShowingFilters ? 'visible' : 'invisible'}`} aria-label="Sidebar">
//                 <div>
//                     <div className="mt-2">


//                         <div className="my-4 flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
//                             <input
//                                 id="name"
//                                 name="name"
//                                 type="text"
//                                 placeholder="Nombre"
//                                 className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
//                             />
//                         </div>

//                         <div className="my-4 flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
//                             <input
//                                 id="lastname"
//                                 name="lastname"
//                                 type="text"
//                                 placeholder="Apellido"
//                                 className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
//                             />
//                         </div>

//                         <div className="my-4 flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
//                             <input
//                                 id="role"
//                                 name="role"
//                                 type="text"
//                                 placeholder="Rol"
//                                 className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
//                             />
//                         </div>

//                     </div>
//                 </div>



//             </aside>



//             <div className="p-4 sm:ml-64 sm:mr-64">
//                 <div className="p-4"> 
//                 {/* // border-2 border-gray-200 rounded-lg dark:border-gray-700"> */}

//                     {children}


//                     {/* <div className="grid grid-cols-3 gap-4 mb-4">
//                         <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
//                             <p className="text-2xl text-gray-400 dark:text-gray-500">
//                                 <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
//                                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
//                                 </svg>
//                             </p>
//                         </div>
//                         <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
//                             <p className="text-2xl text-gray-400 dark:text-gray-500">
//                                 <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
//                                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
//                                 </svg>
//                             </p>
//                         </div>
//                         <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
//                             <p className="text-2xl text-gray-400 dark:text-gray-500">
//                                 <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
//                                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
//                                 </svg>
//                             </p>
//                         </div>
//                     </div>
//                     <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
//                         <p className="text-2xl text-gray-400 dark:text-gray-500">
//                             <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
//                                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
//                             </svg>
//                         </p>
//                     </div>
//                     <div className="grid grid-cols-2 gap-4 mb-4">
//                         <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
//                             <p className="text-2xl text-gray-400 dark:text-gray-500">
//                                 <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
//                                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
//                                 </svg>
//                             </p>
//                         </div>
//                         <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
//                             <p className="text-2xl text-gray-400 dark:text-gray-500">
//                                 <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
//                                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
//                                 </svg>
//                             </p>
//                         </div>
//                         <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
//                             <p className="text-2xl text-gray-400 dark:text-gray-500">
//                                 <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
//                                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
//                                 </svg>
//                             </p>
//                         </div>
//                         <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
//                             <p className="text-2xl text-gray-400 dark:text-gray-500">
//                                 <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
//                                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
//                                 </svg>
//                             </p>
//                         </div>
//                     </div>
//                     <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
//                         <p className="text-2xl text-gray-400 dark:text-gray-500">
//                             <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
//                                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
//                             </svg>
//                         </p>
//                     </div>
//                     <div className="grid grid-cols-2 gap-4">
//                         <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
//                             <p className="text-2xl text-gray-400 dark:text-gray-500">
//                                 <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
//                                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
//                                 </svg>
//                             </p>
//                         </div>
//                         <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
//                             <p className="text-2xl text-gray-400 dark:text-gray-500">
//                                 <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
//                                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
//                                 </svg>
//                             </p>
//                         </div>
//                         <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
//                             <p className="text-2xl text-gray-400 dark:text-gray-500">
//                                 <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
//                                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
//                                 </svg>
//                             </p>
//                         </div>
//                         <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
//                             <p className="text-2xl text-gray-400 dark:text-gray-500">
//                                 <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
//                                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
//                                 </svg>
//                             </p>
//                         </div>
//                     </div> */}
//                 </div>
//             </div>

//         </div>
//     )
// }

import { useState } from "react";
import { logOut } from "app/app/lib/actions";

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
                    <path fillRule="evenodd" d="M2 4.75h16a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" clipRule="evenodd"/>
                </svg>
            </button>

            {/* Sidebar del Menú */}
            <aside className={`fixed top-0 left-0 z-40 w-64 h-screen bg-white shadow-lg transform transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="p-4">
                    <button onClick={() => setIsMenuOpen(false)} className="absolute top-4 right-4 p-2 bg-gray-200 rounded-md hover:bg-gray-300">✕</button>
                    <form action={logOut} className="mt-10">
                        <button className="w-full p-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                            Sign Out
                        </button>
                    </form>
                    <nav className="mt-4">
                        <a href="#" className="block p-2 text-gray-700 hover:bg-gray-100 rounded-md">Dashboard</a>
                    </nav>
                </div>
            </aside>

            {/* Botón para abrir los filtros */}
            <button
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                className="fixed top-4 right-4 z-50 p-2 bg-gray-200 rounded-md shadow-md hover:bg-gray-300"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"/>
                </svg>
            </button>

            {/* Sidebar de Filtros */}
            <aside className={`fixed top-0 right-0 z-40 w-64 h-screen bg-white shadow-lg transform transition-transform duration-300 ${isFiltersOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className="p-4">
                    <button onClick={() => setIsFiltersOpen(false)} className="absolute top-4 right-4 p-2 bg-gray-200 rounded-md hover:bg-gray-300">✕</button>
                    <div className="mt-10">
                        <input type="text" placeholder="Nombre" className="w-full p-2 mb-4 border rounded-md focus:ring-2 focus:ring-blue-400" />
                        <input type="text" placeholder="Apellido" className="w-full p-2 mb-4 border rounded-md focus:ring-2 focus:ring-blue-400" />
                        <input type="text" placeholder="Rol" className="w-full p-2 mb-4 border rounded-md focus:ring-2 focus:ring-blue-400" />
                    </div>
                </div>
            </aside>

            {/* Contenido principal */}
            <main className="p-4 w-full min-h-screen">
                {children}
            </main>
        </div>
    );
}
