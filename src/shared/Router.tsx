import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Layout from '../component/common/Layout';
import MediaList from '../component/media/MediaList';
import NotFound from '../component/common/NotFound';
import AuthPage from '../component/auth/AuthPage';
import Mypage from '../pages/Mypage';
import MyCalendar from '../pages/mycalendar/MyCalendar';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<MediaList />} />
          <Route path='/mypage' element={<Mypage />} />
          <Route path='/mycalendar' element={<MyCalendar />} />
        </Route>
        <Route path='/auth' element={<AuthPage />} />
        <Route />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
