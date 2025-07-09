import Image from 'next/image';

const HeaderContent = () => {
  return (
    <div className="text-center mb-8 w-[30%] w-[600px] h-[500px] text-left">
      
        <h1 className="text-[65px] flex items-center gap-2">
          Make it
          <span className="inline-flex items-center justify-center border border-white rounded-full px-4 py-1 ml-2">
            <Image src="/assets/icons/symbol1.png" alt="icon" width={200} height={50} />
          </span>
        </h1>
        <div className="flex items-center  gap-2 mt-4">
          <Image src="/assets/icons/symbol.png" alt="symbol" width={150} height={50} />
          <span className="italic text-[70px]">Happen</span>
        </div>
        <p className="mt-4 max-w-md mx-auto text-gray-300">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <button className="mt-6 px-6 py-3 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition">
          Crear cuenta
        </button>
      
    </div>
  );
};

export default HeaderContent;
