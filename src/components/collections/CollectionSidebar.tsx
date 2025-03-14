"use client";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
export default function CollectionSidebar() {
  const params = useParams();
  const currentId = params.id;
  const collections = useSelector(
    (state: RootState) => state.collections.collections
  );
  return (
    <Box
      sx={{
        width: 240,
        bgcolor: "background.paper",
        borderRight: 1,
        borderColor: "divider",
        // height: "100vh",
        // position: "fixed",
        left: 0,
        top: 0,
        pt: "64px", // Adjust based on your app bar height
      }}
    >
      <List>
        <ListItem>
          <ListItemText
            primary="Collections"
            primaryTypographyProps={{
              variant: "subtitle2",
              color: "text.secondary",
            }}
          />
        </ListItem>
        {collections.map((collection) => (
          <ListItem key={collection.id} disablePadding>
            <Link
              href={`/collections/${collection.id}`}
              style={{
                textDecoration: "none",
                width: "100%",
                color: "inherit",
              }}
            >
              <ListItemButton selected={currentId === collection.id.toString()}>
                <ListItemIcon>
                  <img
                    src={collection.image}
                    alt={collection.name}
                    style={{ width: 24, height: 24 }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={collection.name}
                  sx={{
                    color:
                      collection.id.toString() === currentId
                        ? "primary.main"
                        : "inherit",
                  }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
