import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { SocketProvider } from "./store/context/SocketContext.tsx";
import App from "./App.tsx";
import { persistor, store } from "./store/index.ts";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <SocketProvider>
        <App />
      </SocketProvider>
    </PersistGate>
  </Provider>
);
