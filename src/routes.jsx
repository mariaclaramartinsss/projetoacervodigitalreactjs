import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import App from './App';
import Dashboard from './pages/Dashboard';
import GuiaDigital from './pages/Certificate'; 
import EnviarLook from './pages/EnviarLook';   
import Curadoria from './pages/ReviewQueue';

export const router = createBrowserRouter([
  { path: '/login', element: <Login/> },
  {
    path: '/', element: <App/>, children: [
      { index: true, element: <Dashboard/> },
      { path: 'submit', element: <EnviarLook/> },   // Aqui chama o componente novo
      { path: 'review', element: <Curadoria/> },     // Aqui também
      { path: 'certificate', element: <GuiaDigital/> }, // E aqui
    ]
  }
]);