import Image from 'next/image';

const Background = () => {
  return (
    <div className="relative w-full h-full overflow-hidden">

      <Image
        src="/assets/images/circle2.webp"
        alt="Circle background 2"
        width={1250}
        height={1250}
        className="absolute top-[50px] left-[100px] transform translate-x-[-450px] translate-y-[350px]"
      />

      <Image
        src="/assets/images/circle1.webp"
        alt="Circle background 1"
        width={850}
        height={850}
        className="absolute right-[100px] transform translate-x-[350px] translate-y-[125px]"
      />
    </div>
  );
};

export default Background;
