import { Outlet } from 'react-router-dom';
import Header from '../common/Header';
import '../../styles/app.css';

function MainLayout() {
  return (
    <div className="layout">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;