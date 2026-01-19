import { Routes, Route } from 'react-router';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Prompts } from './pages/Prompts';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/prompts" element={<Prompts />} />
      </Route>
    </Routes>
  );
}

export default App;
