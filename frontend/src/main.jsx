import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { persistedStore, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistedStore}>
      <Toaster position={"top-right"} />
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);
