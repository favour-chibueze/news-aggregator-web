import Home from './pages/Home';
import { Route, Routes} from 'react-router-dom';
import Feeds from "./components/preferences/Feeds"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path="/feeds" element={<Feeds />} />
    </Routes>
  );
}

export default App;
