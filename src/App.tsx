import "./App.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "./routes";

function App() {
  return (
    <div className="app">
      <Router />
      <ToastContainer autoClose={5000} hideProgressBar />
    </div>
  );
}

export default App;
