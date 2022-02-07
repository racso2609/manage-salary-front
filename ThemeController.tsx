import React from "react";
import { ThemeProvider } from "./context/colorContext";
import { childrenProps } from "./types";
import { AuthProvider } from "./context/auth";

export default function Theme(props: childrenProps) {
  const { children } = props;
  return (
    <ThemeProvider>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
}
