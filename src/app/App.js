import { Routes, Route } from "react-router-dom";
import HomeWL from "../pages/homeWL";
import HomePublic from "../pages/homePublic";


function App() {
  return (
    <Routes>
      <Route path="/wl" element={<HomeWL />} exact />
      <Route path="/" element={<HomePublic />} />
    </Routes>
  );
}

export default App;
