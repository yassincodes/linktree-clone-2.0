import Links from './admin/links/Links'
import Appearance from './admin/appearance/Appearance'
import Settings from './admin/settings/Settings'
import Analytics from './admin/analytics/Analytics'
import UserContainer from './user/UserContainer'
import Home from './home/Home'
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/admin" element={<Links />} />
      <Route path="/admin/appearance" element={<Appearance />} />
      <Route path="/admin/settings" element={<Settings />} />
      <Route path="/admin/analytics"element={<Analytics />} />
      <Route path=":id" element={<UserContainer />} />
    </Routes>
  );
}

export default App;