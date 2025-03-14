"use client";
import {
  Box,
  Container,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { useEffect, useState } from "react";
import CollectionGrid from "@/components/collections/CollectionGrid";
import { setCollections } from "@/store/slices/collectionsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useGetCollectionsQuery } from "@/store/api/collectionsApi";
import TopNav from "@/components/top-nav";
import { RootState } from "@/store/store";

export default function CollectionsPage() {
  const [view, setView] = useState<"all" | "favorite">("all");
  return (
    <Container maxWidth="xl">
      <TopNav />

      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Collections
        </Typography>

        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={(_, newView) => newView && setView(newView)}
          sx={{ mb: 4 }}
        >
          <ToggleButton
            value="all"
            sx={{
              color: view === "all" ? "primary.main" : "text.secondary",
              borderColor: view === "all" ? "primary.main" : "divider",
            }}
          >
            All collections
          </ToggleButton>
          <ToggleButton
            value="favorite"
            sx={{
              color: view === "favorite" ? "primary.main" : "text.secondary",
              borderColor: view === "favorite" ? "primary.main" : "divider",
            }}
          >
            Favorite
          </ToggleButton>
        </ToggleButtonGroup>

        <CollectionGrid view={view} />
      </Box>
    </Container>
  );
}
