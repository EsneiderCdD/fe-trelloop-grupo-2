"use client";

import React from "react";
import { useState } from "react";

const NewBoard = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // validar que existan nombre y descripción:
    if (!name || !description) {
      setError("Por favor llena todos los campos.");
      return;
    }
    //si todo está bien, limpiar el error
    setError("");
    console.log("todo bien al 100");
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="w-full bg-[#1A1A1A] text-white min-h-screen flex flex-col px-4">
        <h2 className="text-m font-semibold whitespace-nowrap p-2">
          Crear tablero
        </h2>

        <div className="flex justify-center items-center">
          <div className="min-h-screen w-1/2 text-white flex flex-col gap-4 relative overflow-visible">
            <div className="shrink-0">
              <img
                className="h-24 w-24 object-cover rounded-md"
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80"
                alt="Current profile photo"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="block mb-1 text-sm">Nombre de tablero</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Escribe aquí..."
                className="px-4 py-1 rounded-md bg-[#1a1a1a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="block mb-1 text-sm">Descripción</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Escribe aquí..."
                className="h-16 px-4 rounded-md bg-[#1a1a1a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="block mb-1 text-sm">Miembros</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Buscar por nombre o @usuario..."
                className="px-4 py-1 rounded-md bg-[#1a1a1a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="block mb-1 text-sm">Etiquetas</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Escribe un nombre de etiqueta para crearla..."
                className="px-4 py-1 rounded-md bg-[#1a1a1a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex items-center">
              <input
                id="link-radio"
                type="radio"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Privado
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="link-radio"
                type="radio"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Público
              </label>
            </div>

            <div className="grid grid-cols-2 gap-x-6 pb-8">
              <button className="w-full bg-[#1a1a1a1a] hover:bg-[#1a1a1a] text-primary-600 py-1 border border-primary-600 rounded-md transition duration-200">
                Cancelar creación
              </button>
              <button className="w-full bg-primary-500 hover:bg-primary-600 text-white py-1 rounded-md transition duration-200">
                Crear tablero
              </button>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        </div>
      </div>
    </form>
  );
};

export default NewBoard;
