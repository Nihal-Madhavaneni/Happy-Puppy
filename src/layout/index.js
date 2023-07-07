import React from "react";
import { Box } from "@mui/material";
export default function Layout({ children }) {
  return (
    <Box sx={{ height: "100vh" }}>
      {/* <Header /> */}
      {children}
      {/* <Footer /> */}
    </Box>
  );
}
