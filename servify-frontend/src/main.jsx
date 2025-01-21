import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import appStore from "./utils/appStore.jsx";
import App from "./App.jsx";
import "./index.css";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const persistor = persistStore(appStore);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={appStore}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
  // </StrictMode>
);
