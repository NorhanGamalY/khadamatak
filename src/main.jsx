import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { SearchProvider } from "./context/searchContext.jsx";
import { AppProviders } from './providers.jsx'

createRoot(document.getElementById('root')).render(
      <SearchProvider>
    <AppProviders>
    <App />
    </AppProviders>
      </SearchProvider>,
)
