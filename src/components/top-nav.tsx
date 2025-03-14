"use client";
import { Box, Container, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Link from "next/link";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { useColorScheme } from "@mui/material/styles";

export default function TopNav() {
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }
  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 2,
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <img
              src="/todo-icon.png"
              alt="Todo"
              style={{ width: 32, height: 32 }}
            />
            <Typography variant="h6">TODO</Typography>
          </Box>
        </Link>

        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <IconButton color="primary">
            <AddIcon />
          </IconButton>
          <IconButton>
            <AccountCircleIcon />
          </IconButton>
          <IconButton
            onClick={() => setMode(mode === "dark" ? "light" : "dark")}
          >
            <Brightness4Icon />
          </IconButton>
        </Box>
      </Box>
    </Container>
  );
}
