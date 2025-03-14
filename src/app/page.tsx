"use client";
import * as React from "react";
import Container from "@mui/material/Container";
import Auth from "@/components/auth";

export default function Home() {
  // const theme = useTheme();

  return (
    <Container maxWidth="sm">
      <Auth />
    </Container>
  );
}
