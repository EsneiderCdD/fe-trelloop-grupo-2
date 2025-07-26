"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useAuthStore } from "store/authStore";
import Image from "next/image";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login, loading, user, isAuthenticated } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
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

    // Llamar a la función de login del contexto de autenticación
    const success = await login({ email, password });

    if (success) {
      // Redirigir al usuario a la página principal o a donde se desee
      router.push("/");
    } else {
      setError("Error al iniciar sesión.");
    }
  };

  return (
    <div
      className="w-full h-screen bg-cover bg-center bg-no-repeat text-text-default flex flex-col"
      style={{
        backgroundColor: "#1a1a1a",
        backgroundImage:
          "url('/assets/images/ui-login-registro-fondo-circulo-grupo.webp')",
      }}
    >
      <form onSubmit={handleSubmit} noValidate className="flex-1 flex flex-col">
        {/* Header */}
        <div>
          <h2 className="text-lg font-semibold whitespace-nowrap p-2 text-white">LOGIN</h2>
          <hr className="border-gray-600" />
        </div>

        {/* Contenido principal */}
        <div className="flex-1 flex text-white">
          {/* Lado izquierdo */}
          <div className="w-1/2 hidden md:flex items-center justify-center">
            <img
              src="/assets/images/ilustracion-usuario.png"
              alt="Ilustración de usuario"
              className="max-w-md max-h-96 object-contain"
            />
          </div>

          {/* Lado derecho */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8">
            <div className="w-full max-w-md space-y-6 bg-[#1A1A1A]/40 backdrop-blur-sm p-6 rounded-lg">
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
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Escriba su contraseña"
                      className="w-full px-4 py-1 rounded-md bg-[#1a1a1a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-[#797676]"
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
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
                <Link href="/register" className="text-secondary-500 hover:underline">
                  Regístrate
                </Link>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;