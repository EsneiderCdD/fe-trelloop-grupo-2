"use client";
import { useState } from "react";
import Link from "next/link";
import BackHeader from "@/components/BackHeader";
import { RegisterData } from "@/types/user";
import { registerUserController } from "@/controllers/authController";
import { useRouter } from "next/navigation";
import SuccessModal from "@/components/SuccessModal";
import IlustracionUsuario from "../assets/images/ilustracion-usuario.svg";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      setIsModalOpen(true);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error al registrar usuario");
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    router.push("/login");
  };

  return (
    <div className="bg-dual-circles text-text-default max-w-screen ">
      <BackHeader title="Registro de usuario" />
      <div className="min-h-screen flex flex-col justify-center lg:flex-row max-w-screen lg:gap-[17px]">
        <div className="flex items-center justify-center">
          <IlustracionUsuario
            alt="Imagen"
            className="h-[284px] w-[325px]"
          />
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 text-text-default pb-20">
          <div className="ml-4 lg:ml-0 w-full max-w-md">
            <form onSubmit={handleSubmit} className=" w-[595px] space-y-4 gap-[17px]">
              <div className="flex space-x-2">
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="firstName">Nombres <span className="text-primary-500">*</span></label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Escribe tus nombres"
                    id="firstName"
                    minLength={3}
                    value={formData.firstName}
                    onChange={handleChange}
                    className="form-input-default"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="lastName">Apellidos <span className="text-primary-500">*</span></label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    minLength={3}
                    placeholder="Escribe tus apellidos"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="form-input-default"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 min-w-[595px] w-full">
                <label htmlFor="email">Correo electrónico <span className="text-primary-500">*</span></label>
                <input
                  type="email"
                  name="email"
                  id="email"
                placeholder="Escribe tu correo electrónico"
                value={formData.email}
                onChange={handleChange}
                className="form-input-default"
                required
              />
              </div>
              <div className="flex space-x-2">
                <div className="relative flex flex-col gap-2 min-w-[289px] w-full">
                  <label htmlFor="password">Contraseña <span className="text-primary-500">*</span></label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    minLength={8}
                    placeholder="Escribe tu contraseña"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-input-default pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 top-6 flex items-center pr-3 text-gray-400"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <div className="relative flex flex-col gap-2 min-w-[289px] w-full">
                  <label htmlFor="confirmPassword">Confirmar contraseña <span className="text-primary-500">*</span></label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    id="confirmPassword"
                    minLength={8}
                    placeholder="Escribe tu confirmación"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="form-input-default pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 top-6 flex items-center pr-3 text-gray-400"
                  >
                    {showConfirmPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                className="w-full h-[40px] my-10 bg-primary-500 text-white py-2 rounded rounded-[8px]"
              >
                Registrarme
              </button>
            </form>
            <div className="w-[595px] pt-[17px] text-center justify-center">
              <p>
                Al registrarme, acepto las{" "}
                <Link href="/" className="text-secondary-500 hover:underline">
                  Condiciones del servicio
                </Link>
                , de Trainit y su{" "}
                <Link href="/" className="text-secondary-500 hover:underline">
                  Politica de rivacidad
                </Link>
                .
              </p>
              <p className="text-sm text-center mt-4">
                ¿Ya tienes cuenta?{" "}
                <Link href="/login" className="text-secondary-500 hover:underline">
                  Inicia sesión
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <SuccessModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}