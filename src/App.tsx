import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./modules/auth/pages/Login";
import Register from "./modules/auth/pages/Register";
import BackgroundLayer from "./modules/system/components/BackgroundLayer/BackgroundLayer";
import Calculator from "./modules/calc/pages/Calculator";
import { Provider } from "react-redux";
import Store from "./store/Store";

function App() {
  return (
    <div className="h-screen w-screen relative">
      <BackgroundLayer />
      <div className="absolute top-0 left-0">
        <Provider store={Store}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to={"/login"} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/calc" element={<Calculator />} />
            </Routes>
          </BrowserRouter>
        </Provider>
      </div>
    </div>
  );
}

export default App;
