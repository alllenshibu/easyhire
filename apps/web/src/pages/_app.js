import { AuthProvider } from "@/contexts/authContext";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import { NotificationProvider } from "@/contexts/notificationContext";

const defaultTheme = createTheme({
  palette: {
    mode: "light",
    main: "#1976d2",
    light: "#42a5f5",
    dark: "#1565c0",
    contrastText: "#fff",
  },
  shape: {
    borderRadius: 16,
  },
});

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <NotificationProvider>
      <ThemeProvider theme={defaultTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}
