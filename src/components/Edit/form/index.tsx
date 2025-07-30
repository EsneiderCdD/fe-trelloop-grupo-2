import { useState } from 'react';
import BoardInfo from './view/BoardInfo';

const Form = () => {
  const [name, setName] = useState('Ut enim ad minim');
  const [description, setDescription] = useState('');
  const imageUrl = '/assets/images/perfil-tablero.webp';

  return (
    <div>
      <BoardInfo
        name={name}
        description={description}
        imageUrl={imageUrl}
        onNameChange={setName}
        onDescriptionChange={setDescription}
      />
    </div>
  );
};

export default Form;
