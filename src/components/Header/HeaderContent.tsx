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
      <div className="flex items-center gap-2">
        <h1 className="text-[70px] font-normal text-text-default">Make it</h1>
        <span className="inline-flex items-center justify-center">
          <Image src="/assets/icons/symbol2.webp" alt="symbol" width={200} height={200} />
        </span>
      </div>

      {/* Icono inferior */}
      <div className="flex items-center gap-2">
        <Image src="/assets/icons/symbol1.webp" alt="symbol" width={125} height={50} />
      

      {/* Happen */}
      <h2 className="italic text-[70px] font-extralight text-text-default">Happen</h2>
      </div>

      {/* Descripción */}
      <p className="text-2xl max-w-md text-text-default">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>

      {/* Botón */}
      <button
        onClick={goToRegister}
        className="h-14 w-64 bg-state-default text-text-default text-xl rounded-full"
      >
        Crear cuenta
      </button>
    </div>
  );
};

export default HeaderContent;
