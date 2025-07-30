// components/view/Visibility.tsx
import { ChangeEvent } from 'react';

interface VisibilityProps {
  value: 'private' | 'public';
  onChange: (value: 'private' | 'public') => void;
}

const Visibility = ({ value, onChange }: VisibilityProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.value as 'private' | 'public';
    onChange(selected);
  };

  return (
    <div className="visibility-container text-white mt-[40px] mb-[40px]">
      <div className="flex items-center">
        <input
          type="radio"
          name="visibility"
          id="private"
          value="private"
          checked={value === 'private'}
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
          value="public"
          checked={value === 'public'}
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
