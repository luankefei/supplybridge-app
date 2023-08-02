import { Checkbox, ListItem, ListItemIcon } from "@mui/material";
import { Draggable } from "react-beautiful-dnd";

export interface IItem {
  id: string;
  content: string;
  checked: boolean;
}

const SortListItem = ({
  item,
  index,
  onCheck,
}: {
  item: IItem;
  index: number;
  onCheck: (idx: number, id: string) => void;
}) => {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <ListItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <ListItemIcon>
            <Checkbox
              onClick={() => onCheck(index, item.id)}
              edge="start"
              checked={item.checked}
            />
          </ListItemIcon>
          {item.content}
        </ListItem>
      )}
    </Draggable>
  );
};
export default SortListItem;
