import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Table from "./components/Table";
import LogDetails from "./components/LogDetails";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Table />} />
          <Route path="/view" element={<LogDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
