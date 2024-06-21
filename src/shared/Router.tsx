import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Layout from '../component/common/Layout';
import MovieList from '../component/MovieList';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<MovieList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
