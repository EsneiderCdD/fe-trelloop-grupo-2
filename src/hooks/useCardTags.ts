import { useState, useEffect } from 'react';

export function useCardTags(initialTags: any[], setForm: Function) {
  const [tags, setTags] = useState(initialTags);

  useEffect(() => {
    setTags(initialTags);
  }, [initialTags]);

  const handleDeleteTag = (tagIdToRemove: number) => {
    const updatedTags = tags.filter((tag: any) => tag.id !== tagIdToRemove);
    setTags(updatedTags);
    setForm((prevForm: any) => ({ ...prevForm, tags: updatedTags }));
  };

  const handleAddTag = (newTagName: string) => {
    const newTag = { name: newTagName, id: Date.now() }; // Assign a temporary unique ID
    const updatedTags = [...tags, newTag];
    setTags(updatedTags);
    setForm((prevForm: any) => ({ ...prevForm, tags: updatedTags }));
  };

  return {
    tags,
    handleDeleteTag,
    handleAddTag,
  };
}
