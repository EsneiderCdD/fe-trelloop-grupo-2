import React from "react";
import { useDroppable } from "@dnd-kit/core";

interface DroppableListProps {
  children: React.ReactNode;
  listId: number;
}

const DroppableList: React.FC<DroppableListProps> = ({ children, listId }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: `list-${listId}`,
  });

  const style = {
    backgroundColor: isOver ? 'rgba(106, 95, 255, 0.1)' : undefined,
    borderColor: isOver ? '#6A5FFF' : undefined,
    borderWidth: isOver ? '2px' : undefined,
    borderStyle: isOver ? 'dashed' : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} className="transition-all duration-200">
      {children}
    </div>
  );
};

export default DroppableList;