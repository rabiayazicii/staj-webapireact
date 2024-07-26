import logo from './logo.svg';
import './App.css';
import CRUD from './CRUD';
import Create from './Create';
import Duzenle from './Duzenle';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CRUD />} ></Route>
        <Route path='/create' element={<Create />} ></Route>
        <Route path='/duzenle/:odemeno' element={<Duzenle />} ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
