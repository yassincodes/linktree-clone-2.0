import Links from './admin/links/Links'
import Home from './home/Home'
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/admin" element={<Links />} />
    </Routes>
  );
}

export default App;