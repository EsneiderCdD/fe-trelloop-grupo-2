import Background from './Background';
import HeaderContent from './HeaderContent';
import HeaderImages from './HeaderImages';

const Header = () => {
  return (
    <header className="w-full h-[300vh] bg-background-body text-text-default relative overflow-hidden">
      {/* Fondo */}
      <div className="absolute inset-0 z-0">
        <Background />
      </div>

      {/* Contenido */}
      <div className="relative z-10 w-full pt-[100px]">
        <div className="max-w-[1366px] mx-auto px-6 grid grid-cols-12 gap-x-6 items-center">
          <div className="col-start-2 col-span-6 mt-1">
            <HeaderContent />
          </div>

          <div className="col-start-7 col-span-5">
            <HeaderImages />
          </div>
          
        </div>
      </div>
    </header>
  );
};

export default Header;
