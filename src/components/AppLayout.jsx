import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import '../css/styles.css';
import { Loader } from '../components/Loader';

export const AppLayout = () => {
  return (
    <div>
      <header className="header">
        <nav>
          <ul className="header-list">
            <li className="header-item">
              <NavLink className="header-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="header-item">
              <NavLink className="header-link" to="/movies">
                Movies
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};
