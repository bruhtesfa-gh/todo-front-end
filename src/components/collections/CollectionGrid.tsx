"use client";
import {
  Grid,
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  useGetCollectionsQuery,
  useUpdateCollectionMutation,
  useAddCollectionMutation,
  useDeleteCollectionMutation,
  Collection,
} from "@/store/api/collectionsApi";
import { useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useTheme } from "@mui/material/styles";

interface EditCollectionDialogProps {
  open: boolean;
  onClose: () => void;
  collection: Collection;
  onSubmit: (name: string) => void;
}

const EditCollectionDialog = ({
  open,
  onClose,
  collection,
  onSubmit,
}: EditCollectionDialogProps) => {
  const [title, setTitle] = useState(collection.name);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Collection</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={!title.trim()}>
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

interface CreateCollectionDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string, image: string) => void;
}

const CreateCollectionDialog = ({
  open,
  onClose,
  onSubmit,
}: CreateCollectionDialogProps) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, image);
    setTitle("");
    setImage("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Collection</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Collection Name"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Image URL"
            fullWidth
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={!title.trim()}>
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

const CollectionCard = ({ collection }: { collection: Collection }) => {
  const theme = useTheme();
  const [updateCollection] = useUpdateCollectionMutation();
  const [deleteCollection] = useDeleteCollectionMutation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleFavoriteToggle = async () => {
    try {
      await updateCollection({
        id: collection.id,
        isFavorite: !collection.isFavorite,
      }).unwrap();
    } catch (error) {
      console.error("Failed to update favorite status:", error);
    }
  };

  const handleEdit = async (newName: string) => {
    try {
      await updateCollection({
        id: collection.id,
        name: newName,
      }).unwrap();
    } catch (error) {
      console.error("Failed to update collection:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCollection(collection.id).unwrap();
    } catch (error) {
      console.error("Failed to delete collection:", error);
    }
  };

  return (
    <>
      <Box
        sx={{
          bgcolor: theme.palette.mode === "dark" ? "#1a202c" : "#f0f0f0",
          borderRadius: 2,
          p: 2,
          height: "100%",
          position: "relative",
          "&:hover": {
            bgcolor: "action.hover",
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            onClick={handleFavoriteToggle}
            sx={{
              color: collection.isFavorite ? "primary.main" : "text.secondary",
            }}
          >
            {collection.isFavorite ? <StarIcon /> : <StarBorderIcon />}
          </IconButton>
          <IconButton onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Link
            href={`/collections/${collection.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <img
              src={collection.image}
              alt={collection.name}
              style={{ width: 48, height: 48 }}
            />
          </Link>
        </Box>
        <Link
          href={`/collections/${collection.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            {collection.name}
          </Typography>
        </Link>

        <Typography variant="body2" color="text.secondary">
          {collection.tasksCompleted}/{collection.totalTasks} done
        </Typography>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            setEditDialogOpen(true);
            handleMenuClose();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            setDeleteDialogOpen(true);
            handleMenuClose();
          }}
          sx={{ color: "error.main" }}
        >
          Delete
        </MenuItem>
      </Menu>

      <EditCollectionDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        collection={collection}
        onSubmit={handleEdit}
      />

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Collection</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{collection.name}"? This action
            cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={() => {
              handleDelete();
              setDeleteDialogOpen(false);
            }}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const AddCollectionCard = () => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [addCollection] = useAddCollectionMutation();

  const handleCreate = async (name: string, image: string) => {
    try {
      await addCollection({ name, image }).unwrap();
    } catch (error) {
      console.error("Failed to create collection:", error);
    }
  };

  return (
    <>
      <Box
        onClick={() => setCreateDialogOpen(true)}
        sx={{
          bgcolor: "background.paper",
          borderRadius: 2,
          p: 2,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "2px dashed",
          borderColor: "divider",
          cursor: "pointer",
          "&:hover": {
            bgcolor: "action.hover",
          },
        }}
      >
        <AddIcon sx={{ fontSize: 40, color: "text.secondary" }} />
      </Box>

      <CreateCollectionDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        onSubmit={handleCreate}
      />
    </>
  );
};

export default function CollectionGrid({ view }: { view: "all" | "favorite" }) {
  const collections = useSelector(
    (state: RootState) => state.collections.collections
  );

  const filteredCollections =
    view === "favorite"
      ? collections.filter((collection) => collection.isFavorite)
      : collections;

  return (
    <Grid container spacing={3}>
      {filteredCollections.map((collection) => (
        <Grid item xs={12} sm={6} md={4} lg={2} key={collection.id}>
          <CollectionCard collection={collection} />
        </Grid>
      ))}
      <Grid item xs={12} sm={6} md={4} lg={2}>
        <AddCollectionCard />
      </Grid>
    </Grid>
  );
}
