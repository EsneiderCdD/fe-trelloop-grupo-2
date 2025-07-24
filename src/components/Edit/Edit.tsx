import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Edit = () => {
    return (
        <div className="">
            <div className="ml-5 ">
                <Image
                    src="/assets/images/perfil-tablero.webp"
                    alt="perfil/tablero"
                    width={130}
                    height={130}
                    className="pt-144 pl-498 rounded-2xl border-radius: 1rem"
                />
            </div>
            <div className='text-white'>Nombre de tablero</div>
            <input
                type="text"
                placeholder="Ut enim ad minim"
                className="w-full bg-[#1e1e1e] text-white placeholder-white rounded-full px-4 py-2 border border-[#3a3a3a] outline-none focus:ring-2 focus:ring-[#6a5fff] transition"
            />
            <div className='text-white'>Descripción
            </div>
            <input
                type="text"
                placeholder="Duis aute irure dolor in reprehederit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint accaecat cupidalat non proident,sunt in culpa qui officia deserunt mollit anim id est laborum"
                className="w-full bg-[#1e1e1e] text-white placeholder-white rounded-full px-4 py-2 border border-[#3a3a3a] outline-none focus:ring-2 focus:ring-[#6a5fff] transition"
            />
            <div className='text-white'>Miembros
            </div>
            <input
                type="text"
                placeholder="Ut enim ad minim"
                className="w-full bg-[#1e1e1e] text-white placeholder-white rounded-full px-4 py-2 border border-[#3a3a3a] outline-none focus:ring-2 focus:ring-[#6a5fff] transition"
            />
            
        </div>
    );
};

export default Edit;