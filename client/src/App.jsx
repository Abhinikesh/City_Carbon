import { ThemeProvider } from "styled-components";
import Dashboard from "./pages/Dashboard";
import { theme } from "./theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
  );
}
