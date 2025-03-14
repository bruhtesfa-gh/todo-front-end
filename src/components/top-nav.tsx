"use client";
import {
  Box,
  Container,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { useColorScheme } from "@mui/material/styles";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";

export default function TopNav() {
  const { mode, setMode } = useColorScheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    // REMOVE all auth state from redux
    window.location.href = "/";
  };

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
          <IconButton onClick={handleMenuOpen}>
            <AccountCircleIcon />
          </IconButton>
          <IconButton
            onClick={() => setMode(mode === "dark" ? "light" : "dark")}
          >
            <Brightness4Icon />
          </IconButton>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={handleMenuClose}>
            <Typography variant="body2" color="text.secondary">
              Signed in as
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Typography>{user?.email}</Typography>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
            <LogoutIcon sx={{ mr: 1, fontSize: 20 }} />
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </Container>
  );
}
