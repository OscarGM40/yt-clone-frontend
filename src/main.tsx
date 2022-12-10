import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./main.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";

// el queryClient es quien va a manejar la cache y la configuración que le pase
const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={client}>
          {/* este CMP siempre debe estar,obviamente,dentro del QueryClientProvider */}
          <ReactQueryDevtools />
          <App />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
);
