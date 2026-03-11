import { BrowserRouter as Router, Routes, Route } from "react-router";
import Dashboard from "@/react-app/pages/Dashboard";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
