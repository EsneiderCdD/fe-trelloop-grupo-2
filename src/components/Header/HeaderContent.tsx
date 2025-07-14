'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const HeaderContent = () => {
  const router = useRouter();

  const goToRegister = () => {
    router.push("/register");
  };

  return (
    <div className="w-[686px] h-[351px]">
      {/* Make it + icono */}
      <div className="flex items-start gap-2 w-[580px] h-[92px]">
        <h1
          className="text-[74px] leading-[117%] font-normal text-text-default"
          style={{ fontFamily: "'Poppins' , sans-serif", letterSpacing: "4px" }}
        >
          Make it
        </h1>
        <span className="flex items-center justify-center translate-x-3 w-[171px] h-[100px]">
          <Image
            src="/assets/icons/symbol.svg"
            alt="symbol"
            width={200}
            height={200}
            className="object-contain"
          />
        </span>
      </div>

      {/* Icono inferior */}
      <div className="flex items-center gap-2 mt-4">
        <Image src="/assets/icons/symbol1.webp" alt="symbol" width={88} height={75} />

        {/* Happen */}
          <h2
            className="italic text-[70px] leading-[117%] font-extralight text-text-default ml-5 "
            style={{ fontFamily: "'Poppins', sans-serif", letterSpacing: "8px" }}
          >
            Happen
          </h2>
      </div>

      {/* Descripción */}
      <p className="text-2xl max-w-md text-text-default mt-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>

      {/* Botón */}
      <button
        onClick={goToRegister}
        className="h-14 w-64 bg-state-default text-text-default text-xl rounded-full mt-6"
      >
        Crear cuenta
      </button>
    </div>
  );
};

export default HeaderContent;
