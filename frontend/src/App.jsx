import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Lazy-loaded components
const Users = lazy(() => import('./components/Users'));
const UserCreate = lazy(() => import('./components/UserCreate'));
const UserUpdate = lazy(() => import('./components/UserUpdate'));
const UserView = lazy(() => import('./components/UserView'));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<Users />} />
          <Route path='/create' element={<UserCreate />} />
          <Route path='/update/:id' element={<UserUpdate />} />
          <Route path='/view/:id' element={<UserView />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
