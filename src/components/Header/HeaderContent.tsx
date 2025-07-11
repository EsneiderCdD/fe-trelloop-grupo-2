import Image from 'next/image';

const HeaderContent = () => {
  return (
    <div className="h-[450px]">
      <div>
        <h1 className="text-[70px] flex items-center gap-2">
          Make it
          <span className="inline-flex p-11 items-center justify-center px-4 py-1">
            <Image src="/assets/icons/symbol2.webp" alt="icon" width={200} height={0} />
          </span>
        </h1>
      </div>

      <div className="translate-x-5 -translate-y-5 flex items-center gap-2 mt-4">
        <Image src="/assets/icons/symbol1.webp" alt="symbol" width={125} height={50} />
        <span className="italic text-[70px] ml-4">Happen</span>
      </div>

      
        <p className="translate-x-20 text-2xl max-w-md text-text-default">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <button className="h-14 w-64   translate-y-5 translate-x-20 bg-state-default text-text-default text-xl rounded-full">
          Crear cuenta
        </button>
     
    </div>
  );
};

export default HeaderContent;