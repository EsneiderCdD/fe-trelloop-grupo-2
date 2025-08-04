// Tipos base
export type Visibility = 'PRIVATE' | 'PUBLIC';

export type Tag = string;

export interface Member {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
}

// Estado principal del formulario
export interface BoardFormState {
  name: string;
  description: string;
  boardImageUrl: string;
  members: Member[];
  tags: Tag[];
  status: Visibility;
}

// Props por componente de sección

export interface BoardInfoProps {
  name: string;
  description: string;
  imageUrl: string;
  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onImageUrlChange: (value: string) => void;
}

export interface MembersProps {
  members: Member[];
  onAdd: (member: Member) => void;
  onDelete: (id: string) => void;
}

export interface TagsProps {
  tags: Tag[];
  onAdd: (newTag: Tag) => void;
  onDelete: (tagToRemove: Tag) => void;
}

export interface VisibilityProps {
  value: Visibility;
  onChange: (value: Visibility) => void;
}

export interface ActionsProps {
  onCancel: () => void;
  onSave: () => void;
}
