import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import store, { persistor } from "./store";
import Routes from "./routes/Routes";

import { GoogleOAuthProvider } from "@react-oauth/google";

import "./global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="521786578563-vfdnirkld428384tmu1otco3aci9p6oo.apps.googleusercontent.com">
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  </GoogleOAuthProvider>
);
