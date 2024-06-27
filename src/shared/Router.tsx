import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Layout from '../component/common/Layout';
import MediaList from '../component/media/MediaList';
import NotFound from '../component/common/NotFound';
import AuthPage from '../component/auth/AuthPage';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<MediaList />} />
        </Route>
        <Route path='/auth' element={<AuthPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
