import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar.tsx";
import Leads from "./pages/Leads.tsx";
import Properties from "./pages/Properties.tsx";




const App: React.FC = () => {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ marginLeft: 25, padding: 20, width: "100%" }}>
          <Routes>
            <Route path="/leads" element={<Leads />} />
            <Route path="/properties" element={<Properties />} />
           
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
