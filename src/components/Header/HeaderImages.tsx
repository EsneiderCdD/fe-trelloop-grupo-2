import Image from 'next/image';

const HeaderImages = () => {
  return (
    <div className="flex flex-col gap-2">
      {/* cubo-3 alineado abajo */}
      <div className="translate-x-[8px] flex flex-row gap-2 items-end ">
        <div className="relative">
          <Image
            src="/assets/images/cubo-3.svg"
            alt="Cubo 3"
            width={250}
            height={250}
            className="rounded-[30px]"
          />
          <span className="absolute inset-0 p-2 flex items-end justify-center">
            ipsum dolor sit dolor
          </span>
        </div>

        <div className="relative">
          <Image
            src="/assets/images/cubo-4.svg"
            alt="Cubo 4"
            width={330}
            height={330}
            className="rounded-[30px]"
          />
          <span className="absolute inset-0 p-2 flex items-end justify-center">
            ipsum dolor sit dolor
          </span>
        </div>
      </div>

      {/* cubo-2 alineado arriba */}
      <div className="translate-x-[-55px] flex flex-row gap-2 items-start">
        <div className="relative">
          <Image
            src="/assets/images/cubo-1.svg"
            alt="Cubo 1"
            width={355}
            height={355}
            className="rounded-[30px]"
          />
          <span className="absolute inset-0 p-2 flex items-end justify-center">
            ipsum dolor sit dasddolor
          </span>
        </div>

        <div className="relative">
          <Image
            src="/assets/images/cubo-2.svg"
            alt="Cubo 2"
            width={250}
            height={250}
            className="rounded-[30px]"
          />
          <span className="absolute inset-0 p-2 flex items-end justify-center">
            ipsum dolor sit dolor
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeaderImages;
