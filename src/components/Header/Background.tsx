const Background = () => {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Esfera 2 ahora a la izquierda */}
      <img
        src="/assets/images/circle2.webp"
        alt="Circle background 2"
        className="absolute top-[100px] left-[100px] w-[1000px] h-[1000px]  transform translate-x-[-300px] translate-y-[400px]"
      />

      {/* Esfera 1 ahora a la derecha */}
      <img
        src="/assets/images/circle1.webp"
        alt="Circle background 1"
        className="absolute top-[0px] right-[100px] w-[850px] h-[850px]  transform translate-x-[350px] translate-y-[175px]"
      />
    </div>
  );
};

export default Background;
