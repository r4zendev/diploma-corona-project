import { Navigate, Route, Routes } from 'react-router-dom';

import { ROUTES } from 'client/constants';

import { Info, Main, News, Curing, Status } from './scenes';

export function Root() {
  return (
    <Routes>
      <Route path={ROUTES.ROOT}>
        <Route index element={<Main />} />
        <Route path={ROUTES.INFO} element={<Info />} />
        <Route path={ROUTES.NEWS} element={<News />} />
        <Route path={ROUTES.CURING} element={<Curing />} />
        <Route path={ROUTES.STATUS} element={<Status />} />
      </Route>

      <Route path={ROUTES.ROOT} element={<Navigate to={ROUTES.ROOT} />} />

      <Route path="*" element={<Navigate to={ROUTES.ROOT} />} />
    </Routes>
  );
}
