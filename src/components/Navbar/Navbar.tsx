import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const router=useRouter()
    const goToLogin=()=>{
        router.push("/login")
    }
    const goToRegister=() =>{
        router.push("/register")
    }
    const goToHome=()=>{
        router.push("/")
    }
    return (
        <div className="flex w-[1366px] mx-auto justify-between bg-[#222222] h-[72px] items-center">
            <div className="ml-5">
                <Image
                    src="/assets/logo/logo-dark-trainit.webp"
                    alt="logo"
                    width={151}
                    height={40}
                    className="pt-[6px] pl-[18px]"
                />
            </div>

            <div className="flex">
                <div className="flex items-center justify-center mt-2 mr-[35px]">
                    <div className="text-[16px] text-[#6a5fff] text-center w-[107px] h-[36px]" onClick={goToHome}>
                        Inicio
                    </div>
                    <div className="text-[16px] text-white text-center w-[152px] h-[36px]" onClick={goToHome}>
                        Acerca de
                    </div>
                    <div className="text-[16px] text-white text-center w-[152px] h-[36px]" onClick={goToHome}>
                        Contacto
                    </div>
                </div>

                <div className="h-[36px] rounded-full w-[203px] border border-[#6a5fff] text-[#6a5fff] text-center justify-center flex px-2 mt-1 mr-4" onClick={goToLogin}>
                    LOGIN
                </div>

                <div className="h-[36px] rounded-full w-[203px] bg-[#6a5fff] text-white text-center justify-center flex px-2 mt-1 mr-4" onClick={goToRegister}>
                    REGISTRARSE
                </div>
            </div>
        </div>
    );
};

export default Navbar;