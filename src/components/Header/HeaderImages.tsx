// components/Header/HeaderImages.tsx

import Image from 'next/image';

const HeaderImages = () => {
  return (
    <div className="flex justify-center mt-10">
      <div className="relative overflow-hidden w-[630px] h-[630px]">
        <Image
          src="/assets/images/collage.webp"
          alt="Collage completo"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default HeaderImages;
