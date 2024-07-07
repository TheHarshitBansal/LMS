import "./index.css";

import {SnackbarProvider} from "notistack"
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import store from "./Redux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <SnackbarProvider maxSnack={3} iconVariant={{warning:'⏳'}}>
      <App />
      </SnackbarProvider>
    </BrowserRouter>
  </Provider>
);
