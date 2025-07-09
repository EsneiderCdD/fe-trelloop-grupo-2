"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPasssword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // validar que existan correo y contraseña:

    if (!email || !password) {
      setError("Por favor llena todos los campos.");
      return;
    }

    //revisar formato de correo valido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)){
      setError("Formato de correo electrónico invalido.");
      return;
    }

    //si todo está bien, limpiar el error
    setError("");
    console.log("todo bien al 100")
    
  };

  return (
    <form onSubmit={handleSubmit} noValidate >

      <div className="bg-[#0f0f0f] text-white">
        <h2 className="text-l font-semibold text-left p-3">LOGIN</h2>

        <div className="min-h-screen bg-[#0f0f0f] text-white flex">
          {/* Lado izquierdo */}
          <div className="w-1/2 hidden md:flex items-center justify-center bg-gradient-to-br from-black via-[#111] to-[#0f0f0f] relative">
            <img src="" alt="" className="w-72" />
          </div>

          {/* Lado derecho */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8">
            <div className="w-1/2 max-w-md space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Escribe tu correo electrónico..."
                    className="w-full px-4 py-1 rounded-md bg-[#1a1a1a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm">
                    Contraseña <span className="text-purple-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPasssword(e.target.value)}
                      placeholder="Escriba su contraseña"
                      className="w-full px-4 py-1 rounded-md bg-[#1a1a1a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
                    />
                    <span className="absolute right-3 top-2.5 text-gray-400 cursor-pointer">
                      {/* 👁️ */}
                    </span>
                  </div>
                </div>

                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-1 rounded-md transition duration-200">
                  Iniciar sesión
                </button>
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>

              <p className="text-center text-sm text-gray-400">
                ¿No tienes cuenta?{" "}
                <a href="#" className="text-red-400 hover:underline">
                  Regístrate
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
