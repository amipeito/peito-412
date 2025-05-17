// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginpage/LoginPage";
import Panel from "./pages/panel/Panel";
import PrivateRoute from "./components/PrivateRoute";

// صفحات عمومی
import Home from "./pages/home/Home";
import Phone from "./pages/phone/Phone";
import About from "./pages/about/About";
import Registration from "./pages/registration/Registration";
import News from "./pages/news/News";

function App() {
  return (
    <div>
      <Routes>
        {/* عمومی */}
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/phone" element={<Phone />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Registration />} />

        {/* خصوصی */}
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/Panel"
          element={
            <PrivateRoute>
              <Panel />
            </PrivateRoute>
          }
        />

        {/* 404 - اختیاری ولی پیشنهادی */}
        <Route path="*" element={<div>صفحه پیدا نشد</div>} />
      </Routes>
    </div>
  );
}

export default App;
