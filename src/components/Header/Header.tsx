import Background from './Background';
import HeaderContent from './HeaderContent';
import HeaderImages from './HeaderImages';

const Header = () => {
  return (
      <header className="w-full h-[300vh] bg-background-body text-white flex flex-col justify-center items-center relative overflow-hidden">


      <div className="absolute inset-0 z-0">
        <Background />
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute top-[100px] left-[150px] pointer-events-auto">
          <HeaderContent />
        </div>

        <div className="absolute top-[300px] left-[800px] pointer-events-auto">
          <HeaderImages />
        </div>
      </div>
    </header>
  );
};

export default Header;