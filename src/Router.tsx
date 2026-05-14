import { lazy, Suspense } from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { AppLayout } from './AppLayout';
import { ErrorComponent } from './components/ErrorBoundary/components/ErrorComponent';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { ROUTES } from './constants/routes.consts';
import { Loader } from './components/UI/Loader/Loader';

const HomePage = lazy(() => import('./pages/Home/Home.page').then(module => ({ default: module.HomePage })));
const AboutPage = lazy(() => import('./pages/About/About.page'));
const ScannerPage = lazy(() => import('./pages/Scanner/Scanner.page'));
const StatisticsPage = lazy(() => import('./pages/Statistics/Statistics.page'));

const withSuspenseAndError = (element: React.ReactNode) => (
  <ErrorBoundary>
    <Suspense 
      fallback={
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <Loader />
        </div>
      }
    >
      {element}
    </Suspense>
  </ErrorBoundary>
);

const router = createHashRouter([
  {
    path: ROUTES.HOME,
    element: <AppLayout />,
    errorElement: (
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    ),
    children: [
      {
        index: true,
        element: withSuspenseAndError(<HomePage />),
      },
      {
        path: ROUTES.ABOUT,
        element: withSuspenseAndError(<AboutPage />),
      },
      {
        path: ROUTES.SCANNER,
        element: withSuspenseAndError(<ScannerPage />),
      },
      {
        path: ROUTES.STATISTICS,
        element: withSuspenseAndError(<StatisticsPage />),
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}