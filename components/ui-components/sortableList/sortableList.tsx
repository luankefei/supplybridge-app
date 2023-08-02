import {
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import SortListItem, { IItem } from "./listItem";
import { useState } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { Done } from "@mui/icons-material";

interface ISortableList {
  items: IItem[];
  onConfirm: (items: IItem[]) => void;
}
/**
 * My custom sortable list
 * -- takes a list of strings
 */
const SortableList = ({ items, onConfirm }: ISortableList) => {
  const [list, setList] = useState<IItem[]>(items);

  const onDragEnd = (result: DropResult) => {
    if (
      !result.destination ||
      result.destination.index === result.source.index
    ) {
      return;
    }
    const newList = JSON.parse(JSON.stringify(list));
    const [removed] = newList.splice(result.source.index, 1);
    newList.splice(result.destination.index, 0, removed);
    setList(newList);
  };

  const onCheck = (idx: number, id: string) => {
    const newList = JSON.parse(JSON.stringify(list));
    newList[idx].checked = !newList[idx].checked;
    setList(newList);
  };

  return (
    <Paper elevation={0}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="sortable-list">
          {(provided) => (
            <List ref={provided.innerRef} {...provided.droppableProps}>
              {list.map((item, idx) => (
                <SortListItem
                  key={idx}
                  item={item}
                  index={idx}
                  onCheck={onCheck}
                />
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
      <Divider />
      <ListItemButton
        sx={{ height: 56 }}
        onClick={() => {
          onConfirm(list);
        }}
      >
        <ListItemIcon>
          <Done color="primary" />
        </ListItemIcon>
        <ListItemText primary="Confirm" />
      </ListItemButton>
    </Paper>
  );
};

export default SortableList;
