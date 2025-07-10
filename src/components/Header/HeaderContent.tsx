import Image from 'next/image';

const HeaderContent = () => {
  return (
    <div className="h-[500px]">
      <div>
        <h1 className="text-[65px] flex items-center gap-2">
          Make it
          <span className="inline-flex p-11 items-center justify-center px-4 py-1">
            <Image src="/assets/icons/symbol2.webp" alt="icon" width={200} height={0} />
          </span>
        </h1>
      </div>

      <div className="translate-x-5 flex items-center gap-2 mt-4">
        <Image src="/assets/icons/symbol1.webp" alt="symbol" width={150} height={50} />
        <span className="italic text-[70px]">Happen</span>
      </div>

      <div className="mt-6">
        <p className="translate-y-5 translate-x-20 text-2xl max-w-sm text-gray-100">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <button className="h-14 w-75   translate-y-10 translate-x-20 bg-purple-500 text-white text-xl rounded-full">
          Crear cuenta
        </button>
      </div>
    </div>
  );
};

export default HeaderContent;