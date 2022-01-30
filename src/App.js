import './App.css';
import { ApiProvider } from './Components/Context/ApiContext';
import Rutas from './pages/Rutas';

function App() {
  return (
    <div className="App">
        <ApiProvider>
          <Rutas/>
        </ApiProvider>
    </div>
  );
}

export default App;
