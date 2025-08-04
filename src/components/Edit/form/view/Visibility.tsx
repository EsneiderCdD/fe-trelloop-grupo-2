import { ChangeEvent } from 'react';

interface VisibilityProps {
  value: 'PRIVATE' | 'PUBLIC';
  onChange: (value: 'PRIVATE' | 'PUBLIC') => void;
}

const Visibility = ({ value, onChange }: VisibilityProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.value as 'PRIVATE' | 'PUBLIC';
    onChange(selected);
  };

  return (
    <div className="visibility-container text-white mt-[40px] mb-[40px]">
      <div className="flex items-center">
        <input
          type="radio"
          name="visibility"
          id="private"
          value="PRIVATE"
          checked={value === 'PRIVATE'}
          onChange={handleChange}
          className="mr-[8px]"
        />
        <label htmlFor="private" className="flex items-center">
          {/* SVG... */}
          <div className="ml-[8px]">
            <div>Privado</div>
            <div className="text-sm text-[#b3b3b3]">(Solo tú y los miembros invitados pueden verlo)</div>
          </div>
        </label>
      </div>

      <div className="flex items-center mt-2">
        <input
          type="radio"
          name="visibility"
          id="public"
          value="PUBLIC"
          checked={value === 'PUBLIC'}
          onChange={handleChange}
          className="mr-[8px]"
        />
        <label htmlFor="public" className="flex items-center">
          {/* SVG... */}
          <div className="ml-[8px]">
            <div>Público</div>
            <div className="text-sm text-[#b3b3b3]">(Cualquier miembro del equipo puede acceder)</div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default Visibility;
