import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Users from './components/Users';
import UserCreate from './components/UserCreate';
import UserUpdate from './components/UserUpdate';
import UserView from './components/UserView';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Users />} />
        <Route path='/create' element={<UserCreate />} />
        <Route path='/update/:id' element={<UserUpdate />} />
        <Route path='/view/:id' element={<UserView />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
