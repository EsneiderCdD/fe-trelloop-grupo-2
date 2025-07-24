import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Edit = () => {
    const [members, setMembers] = useState([
        { name: "nombre de usuario 1", username: "@user" },
        { name: "nombre de usuario 2", username: "@user2" }
    ])
    const router = useRouter()
    const goToHome = () => {
        router.push("/Home")
    }

    const goToSave = () => {
        // aqui va la logica que le envia un request al backend para guardar los cambios en el tablero
        router.push("/Save")
    }

    return (
        <div className="">

            <div>
                <div>Edición de tablero | Ut enim ad minim</div>
                <button ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
                </button>
            </div>
            <div className="ml-5 ">
                <Image
                    src="/assets/images/perfil-tablero.webp"
                    alt="perfil/tablero"
                    width={130}
                    height={130}
                    className="pt-144 pl-498 rounded-2xl border-radius: 1rem"
                />
            </div>
            <div className=''>Nombre de tablero</div>
            <input
                type="text"
                placeholder="Ut enim ad minim"
                className="w-[575px] h-[41px] bg-[#1e1e1e] text-white placeholder-white rounded-[10]] px-4 py-2 border border-[#3a3a3a] outline-none focus:ring-2 focus:ring-[#6a5fff] transition"
            />
            <div className=''>Descripción</div>
            <input
                type="text"
                placeholder="Duis aute irure dolor in reprehederit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint accaecat cupidalat non proident,sunt in culpa qui officia deserunt mollit anim id est laborum"
                className="w-[575px] h-[106px] bg-[#1e1e1e] text-white placeholder-white rounded-[10px] px-4 py-2 border border-[#3a3a3a] outline-none focus:ring-2 focus:ring-[#6a5fff] transition"
            />
            <div className=''>Miembros</div>
            <input
                type="text"
                placeholder="Ut enim ad minim"
                className="w-[575px] h-[41px] bg-[#1e1e1e] text-white placeholder-white rounded-[10px] px-4 py-2 border border-[#3a3a3a] outline-none focus:ring-2 focus:ring-[#6a5fff] transition"
            />
            <div className='container-miembros'>
                {members.map((member) => {
                    return (
                        <div className='username'>
                            {member.name}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>

                        </div>
                    )
                })}
                <div className=''> Etiquetas</div>
                <input
                    type="text"
                    placeholder="Duis aute irure dolor in reprehederit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint accaecat cupidalat non proident,sunt in culpa qui officia deserunt mollit anim id est laborum"
                    className="w-[575px] bg-[#1e1e1e] text-white placeholder-white rounded-[10px] px-4 py-2 border border-[#3a3a3a] outline-none focus:ring-2 focus:ring-[#6a5fff] transition"
                />

                <div className='tags'>
                    <div className='tag-1'>
                        <button>Etiqueta <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                        </button>
                    </div>
                    <div className='tag-2'>
                        <button>Etiqueta <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                        </button>
                    </div>
                    <div className='tag-3'>
                        <button>Etiqueta <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                        </button>

                    </div>

                </div>
                <div className=''>
                    <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                        privado
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 0 0-8.862 12.872M12.75 3.031a9 9 0 0 1 6.69 14.036m0 0-.177-.529A2.25 2.25 0 0 0 17.128 15H16.5l-.324-.324a1.453 1.453 0 0 0-2.328.377l-.036.073a1.586 1.586 0 0 1-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 0 1-5.276 3.67m0 0a9 9 0 0 1-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
                        </svg>

                        publico
                    </div>
                </div>
                <div className=''>
                    <button className="text-[16px] text-[#6a5fff] text-center w-[279px] h-[40px] " onClick={goToHome}>Cancelar edición</button>
                    <button className="text-[16px] text-[#6a5fff] text-center w-[279px] h-[40px] " onClick={goToSave}>Actualizar tablero</button>
                </div>
            </div>
        </div>
    );
};

export default Edit;