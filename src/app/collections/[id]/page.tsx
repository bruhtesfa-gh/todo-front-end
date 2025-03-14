"use client";
import {
  Box,
  Container,
  Typography,
  IconButton,
  Checkbox,
  TextField,
  Button,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Menu,
  MenuItem,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import AddIcon from "@mui/icons-material/Add";
import {
  useGetCollectionTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "@/store/api/todosApi";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import type { Todo } from "@/store/api/todosApi";
import dayjs, { Dayjs } from "dayjs";
import CollectionSidebar from "@/components/collections/CollectionSidebar";
import { Collection } from "@/store/api/collectionsApi";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import TopNav from "@/components/top-nav";

interface TodoFormData {
  title: string;
  dueDate: Dayjs | null;
}

const AddTodoDialog = ({
  open,
  onClose,
  onSubmit,
  parentTodoId = null,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: TodoFormData) => void;
  parentTodoId?: number | null;
}) => {
  const [formData, setFormData] = useState<TodoFormData>({
    title: "",
    dueDate: null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ title: "", dueDate: null });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{parentTodoId ? "Add Subtask" : "Add Task"}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
          <Box sx={{ mt: 2 }}>
            <DatePicker
              label="Due Date"
              value={formData.dueDate}
              onChange={(newValue: any) =>
                setFormData({ ...formData, dueDate: newValue })
              }
              sx={{ width: "100%" }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            disabled={!formData.title.trim()}
          >
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

const EditTodoDialog = ({
  open,
  onClose,
  onSubmit,
  initialData,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: TodoFormData) => void;
  initialData: Todo;
}) => {
  const [formData, setFormData] = useState<TodoFormData>({
    title: initialData.title,
    dueDate: initialData.dueDate ? dayjs(initialData.dueDate) : null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Task</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
          <Box sx={{ mt: 2 }}>
            <DatePicker
              label="Due Date"
              value={formData.dueDate as any}
              onChange={(newValue) => {
                console.log(newValue);
                setFormData({ ...formData, dueDate: newValue });
              }}
              sx={{ width: "100%" }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            disabled={!formData.title.trim()}
          >
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

const TodoItem = ({ todo, depth = 0 }: { todo: Todo; depth?: number }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [addSubtaskDialogOpen, setAddSubtaskDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const hasChildren = todo.childTodos && todo.childTodos.length > 0;
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const params = useParams();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAddSubtask = async (formData: TodoFormData) => {
    try {
      await addTodo({
        title: formData.title,
        description: "",
        dueDate: formData.dueDate?.toISOString(),
        collectionId: parseInt(params.id as string),
        parentTodoId: todo.id,
        completed: false,
      }).unwrap();
    } catch (error) {
      console.error("Failed to add subtask:", error);
    }
  };

  const handleEditTodo = async (formData: TodoFormData) => {
    try {
      await updateTodo({
        id: todo.id,
        title: formData.title,
        description: todo.description,
        dueDate: formData.dueDate?.toISOString(),
        completed: todo.completed,
      }).unwrap();
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  const handleDeleteTodo = async () => {
    try {
      await deleteTodo(todo.id).unwrap();
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 2,
          pl: 2 + depth * 3,
          borderBottom: "1px solid",
          borderColor: "divider",
          "&:hover": {
            bgcolor: "action.hover",
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {hasChildren && (
            <IconButton
              size="small"
              onClick={() => setIsExpanded(!isExpanded)}
              sx={{ mr: 1 }}
            >
              {isExpanded ? (
                <KeyboardArrowDownIcon />
              ) : (
                <KeyboardArrowRightIcon />
              )}
            </IconButton>
          )}
          {!hasChildren && <Box sx={{ width: 28 }} />}
          <Checkbox checked={todo.completed} sx={{ mr: 2 }} />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            sx={{
              textDecoration: todo.completed ? "line-through" : "none",
              color: todo.completed ? "text.secondary" : "text.primary",
            }}
          >
            {todo.title}
          </Typography>
          {todo.description && (
            <Typography variant="body2" color="text.secondary">
              {todo.description}
            </Typography>
          )}
        </Box>
        <IconButton size="small" onClick={handleMenuOpen}>
          <MoreVertIcon />
        </IconButton>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            setAddSubtaskDialogOpen(true);
            handleMenuClose();
          }}
        >
          Add Subtask
        </MenuItem>
        <MenuItem
          onClick={() => {
            setEditDialogOpen(true);
            handleMenuClose();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem onClick={handleDeleteTodo}>Delete</MenuItem>
      </Menu>

      <AddTodoDialog
        open={addSubtaskDialogOpen}
        onClose={() => setAddSubtaskDialogOpen(false)}
        onSubmit={handleAddSubtask}
        parentTodoId={todo.id}
      />

      <EditTodoDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        onSubmit={handleEditTodo}
        initialData={todo}
      />

      {hasChildren && (
        <Collapse in={isExpanded}>
          {todo.childTodos.map((childTodo) => (
            <TodoItem key={childTodo.id} todo={childTodo} depth={depth + 1} />
          ))}
        </Collapse>
      )}
    </>
  );
};

export default function CollectionTodosPage() {
  const params = useParams();
  const router = useRouter();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const collections = useSelector(
    (state: RootState) => state.collections.collections
  );
  const [addTodo] = useAddTodoMutation();
  const {
    data: todos = [],
    isLoading,
    error,
  } = useGetCollectionTodosQuery(params.id as string);

  const handleAddTodo = async (formData: TodoFormData) => {
    try {
      await addTodo({
        title: formData.title,
        description: "",
        dueDate: formData.dueDate?.toISOString(),
        collectionId: parseInt(params.id as string),
        completed: false,
      }).unwrap();
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <TopNav />
      <Box sx={{ display: "flex" }}>
        <CollectionSidebar />
        <Box sx={{ flexGrow: 1 }}>
          <Container maxWidth="lg">
            <Box sx={{ py: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                <IconButton onClick={() => router.back()}>
                  <ArrowBackIcon />
                </IconButton>
                <Typography variant="h5" sx={{ ml: 2, flexGrow: 1 }}>
                  {
                    collections.find((collection) => collection.id == params.id)
                      ?.name
                  }
                </Typography>
                <IconButton onClick={() => setAddDialogOpen(true)}>
                  <AddIcon />
                </IconButton>
                <IconButton>
                  <FavoriteIcon />
                </IconButton>
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              </Box>

              <AddTodoDialog
                open={addDialogOpen}
                onClose={() => setAddDialogOpen(false)}
                onSubmit={handleAddTodo}
              />

              {isLoading ? (
                <Typography>Loading todos...</Typography>
              ) : error ? (
                <Typography color="error">Error loading todos</Typography>
              ) : (
                <Box sx={{ bgcolor: "background.paper", borderRadius: 1 }}>
                  {todos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} />
                  ))}
                </Box>
              )}
            </Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
