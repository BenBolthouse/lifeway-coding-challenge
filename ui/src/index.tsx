import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import ProfileArea from './areas/ProfileArea';
import NoContentArea from './areas/NoContentArea';
import AppProvider from './contexts/AppContext';

const router = createBrowserRouter([
  {
    path: "profiles",
    element: <ProfileArea />,
  },
  {
    path: "*",
    element: <NoContentArea />
  },
]);

const root = createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </React.StrictMode>
);
