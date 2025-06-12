import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { NotificationContextProvider } from "./NotificationContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <NotificationContextProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </NotificationContextProvider>,
);
