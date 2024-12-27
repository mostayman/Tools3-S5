import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SignUP from './Front-end/SignUP';
import Login from './Front-end/LogIN';
import Home from './Front-end/Home';
import Order from './Front-end/Order';
import MyOrders from './Front-end/MyOrders';
import AssignedOrdersPage from './Front-end/CourierOrders';
import ManageOrdersPage from './Front-end/Admin';

function App() {
  return (
        <Router>
          <div className='w-full h-screen flex justify-center items-center bg-slate-950'>
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/signup' element={<SignUP />} />
              <Route path='/login' element={<Login />} />
              <Route path='/home' element={<Home />} />
              <Route path='/order' element={<Order />} />
              <Route path='/orders' element={<MyOrders />} />
              <Route path='/courier' element={<AssignedOrdersPage />} />
              <Route path='/admin' element={<ManageOrdersPage />} />
            </Routes>
          </div>
        </Router>
  );
}

export default App;
