import { Navigate, Route, Routes } from 'react-router-dom';

import { ROUTES } from 'client/constants';

import { Main } from './main';

export function Root() {
  console.log('qwewqe');
  return (
    <Routes>
      <Route path={ROUTES.ROOT}>
        <Route index element={<Main />} />
        {/* <Route path={ROUTES.INGESTION.CREATE} element={<IngestionCreate />} />
        <Route path={ROUTES.INGESTION.DETAILS} element={<IngestionCreate />} /> */}
      </Route>

      <Route path={ROUTES.ROOT} element={<Navigate to={ROUTES.ROOT} />} />

      <Route path="*" element={<Navigate to={ROUTES.ROOT} />} />
    </Routes>
  );
}
