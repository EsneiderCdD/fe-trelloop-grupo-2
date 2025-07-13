import Image from 'next/image';

const Background = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="relative max-w-[1366px] mx-auto w-full h-full">

        <Image
          src="/assets/images/ui-fondo-circulo-izquierda.webp"
          alt="Circle background 2"
          width={1240}
          height={1240}
          className="absolute"
          style={{
            left: "-566px",
            top: "-183px",
          }}
        />
        <Image
          src="/assets/images/ui-fondo-circulo-derecha.webp"
          alt="Circle background 1"
          width={952}
          height={952}
          className="absolute"
          style={{
            left: "635px", // ← posición relativa al contenedor de 1366px
            top: "-470px",
          }}
        />
      </div>
    </div>
  );
};

export default Background;
