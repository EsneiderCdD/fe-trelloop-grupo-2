"use client";
import Image from "next/image";

type Member = {
  id: string;
  name: string;
  username: string;
  img: string;
};

type MembersProps = {
  members: Member[];
  onDelete: (id: string) => void;
};

const Members = ({ members, onDelete }: MembersProps) => {
  return (
    <div className="mt-[20px]">
      <div className="text-white text-[14px] font-[500] mt-[6px] mb-[4px]">
        Miembros
      </div>

      {/* Input de búsqueda */}
      <div className="relative w-[575px]">
        <input
          type="text"
          placeholder="Buscar por nombre o @usuario..."
          className="w-full h-[41px] bg-[#1e1e1e] text-white placeholder-[#797676] rounded-[10px] px-4 pr-10 py-2 border border-[#3a3a3a] outline-none focus:ring-2 focus:ring-[#6a5fff] transition"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
      </div>

      {/* Listado de miembros */}
      <div className="flex mt-[5px] flex-wrap">
        {members.map((member) => (
          <div
            className="flex items-center mr-[15px] mt-[8px]"
            key={member.id}
          >
            <Image
              src={member.img}
              alt="member-img"
              width={28}
              height={28}
              className="rounded-2xl mr-[5px]"
            />
            <div className="text-white text-sm">
              <div>{member.name}</div>
              <div className="text-xs text-gray-400">{member.username}</div>
            </div>
            <button
              className="text-white ml-[25px]"
              onClick={() => onDelete(member.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Members;
