import { useState } from 'react';
import BoardInfo from './view/BoardInfo';
import Members from './view/Members';
import Tags from './view/Tags';
import Visibility from './view/Visibility';
import Actions from './view/Actions'; // ← nuevo import

const Form = () => {
  const [name, setName] = useState('Ut enim ad minim');
  const [description, setDescription] = useState('');
  const imageUrl = '/assets/images/perfil-tablero.webp';

  const [members, setMembers] = useState([
    {
      id: '1',
      name: 'Carlos Gómez',
      username: '@carlos',
      img: '/assets/images/user1.png',
    },
    {
      id: '2',
      name: 'Ana Pérez',
      username: '@ana',
      img: '/assets/images/user2.png',
    },
  ]);

  const [tags, setTags] = useState([
    { id: 'tag1', name: 'Etiqueta 1' },
    { id: 'tag2', name: 'Etiqueta 2' },
    { id: 'tag3', name: 'Etiqueta 3' },
  ]);

  const [visibility, setVisibility] = useState<'private' | 'public'>('private');

  const handleDeleteMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const handleDeleteTag = (id: string) => {
    setTags((prev) => prev.filter((tag) => tag.id !== id));
  };

  const handleVisibilityChange = (value: 'private' | 'public') => {
    setVisibility(value);
  };

  // NUEVO: Acciones de botones
  const handleCancel = () => {
    console.log('Cancelando edición...');
    // redirigir, resetear, etc.
  };

  const handleSave = () => {
    console.log('Guardando cambios...');
    // llamada a API, etc.
  };

  return (
    <div>
      <BoardInfo
        name={name}
        description={description}
        imageUrl={imageUrl}
        onNameChange={setName}
        onDescriptionChange={setDescription}
      />

      <Members members={members} onDelete={handleDeleteMember} />

      <Tags tags={tags} onDelete={handleDeleteTag} />

      <Visibility value={visibility} onChange={handleVisibilityChange} />
      
      <Actions onCancel={handleCancel} onSave={handleSave} />
    </div>
  );
};

export default Form;
