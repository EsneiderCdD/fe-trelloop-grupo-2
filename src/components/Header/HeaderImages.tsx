import Image from 'next/image';

const HeaderImages = () => {
  return (
    <div className="w-[100%]">
      {/* Contenedor para mantener el estilo anterior */}
      <div className="flex justify-center translate-y-[40px] translate-x-[-120px] mt-10 ">
        <div className="relative overflow-hidden w-[630px] h-[630px]">
          <Image
            src="/assets/images/collage.webp"
            alt="Collage completo"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderImages;
