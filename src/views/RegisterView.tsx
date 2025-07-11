"use client";
import { useState } from "react";
import Link from "next/link";
import BackHeader from "@/components/BackHeader";
import { RegisterData } from "@/types/user";
import { registerUserController } from "@/controllers/authController";
import { useRouter } from "next/navigation";

export default function RegisterView() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { firstName, lastName, email, password, confirmPassword } = formData;

    const data: RegisterData = { firstName, lastName, email, password, confirmPassword };

    try {
      await registerUserController(data);
      //implementar el popup de registro exitoso
      alert("Registro exitoso");
      router.push("/login");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message); 
      } else {
        setError("Error al registrar usuario");
      }
    }
  };

  return (
    <div>
      <BackHeader title="Registrarse" />
      <div className="min-h-screen flex flex-col lg:flex-row">
        <div className="lg:block lg:w-1/2 flex items-center justify-center bg-gray-800">
          {/* <img
            src=""
            alt="Imagen"
            className="w-full h-full object-cover"
          /> */}
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div>
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
              <div className="flex space-x-2">
                <div>
                  <label htmlFor="firstName">Nombres</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Nombres"
                    id="firstName"
                    minLength={3}
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName">Apellidos</label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    minLength={3}
                    placeholder="Apellidos"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded"
                    required
                  />
                </div>
              </div>
              <label htmlFor="email">Correo electrónico</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
              <div className="flex space-x-2">
                <div>
                  <label htmlFor="password">Contraseña</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    minLength={8}
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword">Confirmar contraseña</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    minLength={8}
                    placeholder="Confirmar contraseña"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded"
                    required
                  />
                </div>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Registrarse
              </button>
            </form>
            <div className="max-w-md text-center">
              <p>
                Al registrarme, acepto las{" "}
                <Link href="/" className="text-blue-600 hover:underline">
                  Condiciones del servicio
                </Link>
                , de Trainit y su{" "}
                <Link href="/" className="text-blue-600 hover:underline">
                  Politica de rivacidad
                </Link>
                .
              </p>
              <p className="text-sm text-center mt-4">
                ¿Ya tienes cuenta?{" "}
                <Link href="/login" className="text-blue-600 hover:underline">
                  Inicia sesión
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
