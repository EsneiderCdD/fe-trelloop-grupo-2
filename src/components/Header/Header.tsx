import Background from './Background';
import HeaderContent from './HeaderContent';
import HeaderImages from './HeaderImages';

const Header = () => {
  return (
    <header className="w-full h-[300vh] bg-black text-white flex flex-col justify-center items-center relative overflow-visible">
      <Background />
      <div className="flex relative w-full h-full min-h-screen overflow-visible justify-between">
        <HeaderContent />
        <HeaderImages />
      </div>
    </header>
  );
};

export default Header;
