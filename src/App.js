import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ProjectRoutes } from "./routes/ProjectRoutes";
import { persistor, store } from "./store";
import "./css/style.css"
import "./css/style_pad.css"
import "./css/style_mobile.css"

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ProjectRoutes />
      </PersistGate>
    </Provider>
  );
}

export default App;
