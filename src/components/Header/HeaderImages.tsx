import Image from 'next/image';

const HeaderImages = () => {
  return (
    <div className="w-[50%]">
    
      <div className='flex '>
        <div className="relative rounded-2xl overflow-hidden w-[250px] h-[240px]">
          <Image src="/assets/icons/img.png" alt="image 1" fill className="object-cover" />
          <div className="absolute bottom-2 left-2 text-white text-sm">
            Ut enim ad minim veniam
          </div>
        </div>
        <div className="relative rounded-2xl overflow-hidden w-[300px] h-[300px]">
          <Image src="/assets/icons/img.png" alt="image 2" fill className="object-cover" />
          <div className="absolute bottom-2 left-2 text-white text-sm">
            Duis aute irure dolor in reprehenderit in
          </div>
        </div>
      </div>

      <div className='flex '>
        <div className="relative rounded-2xl overflow-hidden w-[350px] h-[340px]">
          <Image src="/assets/icons/img.png" alt="image 3" fill className="object-cover" />
        </div>
        <div className="relative rounded-2xl overflow-hidden w-[250px] h-[250px]">
          <Image src="/assets/icons/img.png" alt="image 4" fill className="object-cover" />
          <div className="absolute bottom-2 left-2 text-white text-sm">
            sunt in culpa qui officia deserunt
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderImages;
