import { useEffect, useState } from 'react';
import BoardInfo from './view/BoardInfo';
import Members from './view/Members';
import Tags from './view/Tags';
import Visibility from './view/Visibility';
import Actions from './view/Actions';
import { getToken } from '../../../store/authStore';

type Props = {
  boardId: string;
};

const Form = ({ boardId }: Props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [members, setMembers] = useState<any[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [visibility, setVisibility] = useState<'PRIVATE' | 'PUBLIC'>('PRIVATE');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBoard = async () => {
      const token = getToken();
      if (!token) {
        setError("No estás autenticado.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`http://localhost:5000/api/boards/${boardId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("No se pudo cargar el tablero.");
        }

        const data = await res.json();

        setName(data.name || '');
        setDescription(data.description || '');
        setImageUrl(data.board_image_url || '');
        setMembers(data.members || []);
        setTags(data.tags || []);
        setVisibility(data.status === 'PUBLIC' ? 'PUBLIC' : 'PRIVATE');
      } catch (err: any) {
        setError(err.message || 'Error desconocido.');
      } finally {
        setLoading(false);
      }
    };

    fetchBoard();
  }, [boardId]);

  const handleDeleteMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const handleDeleteTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const handleAddMember = (user: any) => {
    setMembers((prev) => {
      const exists = prev.some((m) => m.id === user.id);
      if (exists) return prev;
      return [...prev, user];
    });
  };

  const handleVisibilityChange = (value: 'PRIVATE' | 'PUBLIC') => {
    setVisibility(value);
  };

  const handleCancel = () => {
    console.log('Cancelando edición...');
  };

  const handleSave = async () => {
    const token = getToken();
    if (!token) {
      alert("No tienes permisos para guardar.");
      return;
    }

   
    const memberIdentifiers = members.map((m) => m.email || m.id);

    const payload = {
      name,
      description,
      boardImageUrl: imageUrl, 
      members: memberIdentifiers,
      tags,
      status: visibility,
    };

    try {
      const res = await fetch(`http://localhost:5000/api/boards/${boardId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error al guardar los cambios");

      alert("¡Cambios guardados correctamente!");
    } catch (err: any) {
      alert(err.message || "Ocurrió un error inesperado.");
    }
  };

  if (loading) {
    return <div className="text-white p-4">Cargando tablero...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>;
  }

  return (
    <div>
      <BoardInfo
        name={name}
        description={description}
        imageUrl={imageUrl}
        onNameChange={setName}
        onDescriptionChange={setDescription}
        onImageUrlChange={setImageUrl} 
      />

      <Members
        members={members}
        onDelete={handleDeleteMember}
        onAdd={handleAddMember}
      />

      <Tags
        tags={tags}
        onAdd={(newTag) => setTags((prev) => [...prev, newTag])}
        onDelete={handleDeleteTag}
      />

      <Visibility
        value={visibility}
        onChange={handleVisibilityChange}
      />

      <Actions
        onCancel={handleCancel}
        onSave={handleSave}
      />
    </div>
  );
};

export default Form;
