import Image from 'next/image';

const Background = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="relative max-w-[1366px] mx-auto w-full h-full  overflow-hidden
 ">
        {/* Izquierda */}
        <Image
          src="/assets/images/circle2.webp"
          alt="Circle background 2"
          width={1240}
          height={1240}
          className="absolute"
          style={{
            left: "-428px",
            top: "383px"
          }}
        />
        {/* Derecha */}
        <Image
          src="/assets/images/circle1.webp"
          alt="Circle background 1"
          width={952}
          height={952}
          className="absolute"
          style={{
            left: "834px", // ← posición relativa al contenedor de 1366px
            top: "100px",
          }}
        />
      </div>
    </div>
  );
};

export default Background;
