import Image from 'next/image';
import { useRouter } from 'next/navigation';

const HeaderContent = () => {

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Navigates the user to the register page.
 */

/*******  32a36646-e4b2-4c02-a282-34e99e93b835  *******/  const router = useRouter();

  const goToRegister = () => {
    router.push("/register");
  };

  return (
    <div className="h-[450px]">
      <h1 className="text-[70px] flex items-center gap-2">
        Make it
        <span className="inline-flex items-center justify-center px-4 py-1">
          <Image src="/assets/icons/symbol2.webp" alt="symbol" width={200} height={200} />
        </span>
      </h1>

      <div className="translate-x-5 -translate-y-5 flex items-center gap-2 mt-4">
        <Image src="/assets/icons/symbol1.webp" alt="symbol" width={125} height={50} />
        <span className="italic text-[70px] ml-4">Happen</span>
      </div>

      <p className="translate-x-20 text-2xl max-w-md text-text-default mt-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>

      <button
        onClick={goToRegister}
        className="h-14 w-64 translate-y-5 translate-x-20 bg-state-default text-text-default text-xl rounded-full mt-4"
      >
        Crear cuenta
      </button>
    </div>
  );
};

export default HeaderContent;

