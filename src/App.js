import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages & components
import Navbar from "./components/Navbar/Navbar";
import Indexpage from "./pages/Indexpage/Indexpage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Indexpage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
