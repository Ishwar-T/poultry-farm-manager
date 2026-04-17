// src/App.jsx
import React, { useState } from "react";
import NavBar from "./components/NavBar";
import ExpensePage from "./pages/ExpensePage";
import BatchPage from "./pages/BatchPage";
import SalesPage from "./pages/SalesPage";
import DailyPage from "./pages/DailyPage";
import FeedPage from "./pages/FeedPage";

function App() {
  const [active, setActive] = useState("dashboard");

  return (
    <div style={{ padding: 20, maxWidth: 1200, margin: "auto" }}>
      <div style={{ marginTop: 20 }}></div>
      <NavBar active={active} setActive={setActive} />

      <div style={{ marginTop: 12 }}>
        {active === "dashboard" && (
          <div>
            <h2>Dashboard</h2>
            <p>Quick summary (you can add cards here)</p>
          </div>
        )}

        {active === "expenses" && <ExpensePage />}
        {active === "batches" && <BatchPage />}
        {active === "sales" && <SalesPage />}
        {active === "daily" && <DailyPage />}
        {active === "feed" && <FeedPage />}
      </div>
    </div>
  );
}

export default App;