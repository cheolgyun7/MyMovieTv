import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Layout from '../component/common/Layout';
import MovieList from '../component/MovieList';
import NotFound from '../component/common/NotFound';
import AuthPage from '../component/auth/AuthPage';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<MovieList />} />
        </Route>
        <Route path='/auth' element={<AuthPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
