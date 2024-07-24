import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import PvTable from "./components/PvTable";
import BvTable from "./components/BvTable";
import MyMap from "./components/Map";

function App() {
  const [count, setCount] = useState(0);
  const [theme, colorMode] = useMode();

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
           
            <Router>
              
              <Routes>
                
                <Route path="/" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/pv-overview" element={<Dashboard content={"pvtable"} />} />
                <Route path="/bv-overview" element={<Dashboard content={"bvtable"} />} />
                <Route path="/pv/:id" element={<Dashboard content={"pvinsight"} />} />
                <Route path="/assign-goat" element={<Dashboard content={"assigngoat"} />} />
                <Route path="/add-ben" element={<Dashboard content={"addben"} />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/admin" element={<Dashboard content={"admin"} />} />
                <Route path="/map" element={<MyMap />} />
              </Routes>
            </Router>
          </AuthProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default App;
