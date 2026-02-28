import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { SearchProvider } from "./context/searchContext.jsx";
import { AppProviders } from "./providers.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <SearchProvider>
      <AppProviders>
        <App />
      </AppProviders>
    </SearchProvider>
    ,
  </QueryClientProvider>,
);
