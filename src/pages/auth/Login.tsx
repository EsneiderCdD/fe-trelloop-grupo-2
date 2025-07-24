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
    if (!emailRegex.test(email)) {
      setError("Formato de correo electrónico invalido.");
      return;
    }
    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    //si todo está bien, limpiar el error
    setError("");
    console.log("todo bien al 100");
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div
        className="bg-cover bg-center bg-no-repeat min-h-screen text-white overflow-visible"
        style={{ backgroundImage: "url('/ui-login-registro-fondo-circulo-grupo.webp')" }}
      >
        <div className="bg-[#1A1A1A] text-white overflow-visible">
          <h2 className="text-lg font-semibold whitespace-nowrap p-2">LOGIN</h2>
          <hr />

          <div className="min-h-screen text-white flex relative overflow-visible">
            {/* Lado izquierdo */}
            <div className="w-1/2 hidden md:flex items-center justify-start relative overflow-x-hidden overflow-y-clip">
              <img
              src="/deco-formas(1).png"
              alt="deco-formas-1"
              className="a"
            />
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
                      Contraseña <span className="text-primary-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPasssword(e.target.value)}
                        placeholder="Escriba su contraseña"
                        className="w-full px-4 py-1 rounded-md bg-[#1a1a1a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <span className="absolute right-3 top-1 text-gray-400 cursor-pointer">
                        {/* 👁️ */}
                      </span>
                    </div>
                  </div>

                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="w-3 h-3 text-primary-0 rounded border-gray-300 focus:text-primary-0"
                    />
                    <span className="text-sm text-neutral-100">Recordarme</span>
                  </label>

                  <button className="w-full bg-primary-500 hover:bg-primary-600 text-white py-1 rounded-md transition duration-200">
                    Iniciar sesión
                  </button>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>

                <p className="text-center text-sm text-gray-400">
                  ¿No tienes cuenta?{" "}
                  <a href="#" className="text-secondary-500 hover:underline">
                    Regístrate
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
