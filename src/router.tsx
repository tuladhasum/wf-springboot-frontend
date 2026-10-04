import { createBrowserRouter } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import HomePage from './pages/HomePage';
import GridPage from './pages/GridPage';

/**
 * Application routes.
 * Add new top-level pages here — they are automatically rendered
 * inside AppShell via the <Outlet />.
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'grid', element: <GridPage /> },
    ],
  },
]);
