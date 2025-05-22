

import { Outlet } from 'react-router-dom';
import Navbar from '../pages/navbar';
import Footer from '../pages/footer';

const WebLayout = () => {
  return (
    <div>

     <Navbar/>
      <Outlet />
      <Footer/>
    </div>
  );
};

export default WebLayout;
