import { Loader } from 'lucide-react'
import {Toaster} from 'react-hot-toast'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from "./page/HomePage"
import SignUpPage from "./page/SignUpPage"
import LoginPage from "./page/LoginPage"
import Dashboard from './page/Dashboard';
import Report from './components/Report';
import TransactionsTable from './components/TransactionsTable';
import HomeDashboard from './components/HomeDashboard';
import ProfileSetting from './components/ProfileSetting';
import Lists from './components/Lists';
import { refreshTokenOnLoad } from './libs/axios';
import SessionError from './page/sessionError';
import AnimatedErrorPage from './page/AnimatedErrorPage';

function App() {
  const { authUser } = useAuthStore();

  useEffect(() => {
    refreshTokenOnLoad();
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/dashboard" />}>
          <Route index element={authUser ? <HomeDashboard /> : <Navigate to="/dashboard" />} />
          <Route path="expenses" element={authUser ? <Lists /> : <Navigate to="/dashboard" />} />
          <Route path="expenses/:id" element={authUser ? <TransactionsTable /> : <Navigate to="/dashboard" />} />
          <Route path="reports" element={authUser ? <Report /> : <Navigate to="/dashboard" />} />
          <Route path="profile_settings" element={authUser ? <ProfileSetting /> : <Navigate to="/dashboard" />} />
        </Route>
        <Route path="/dashboard" element={!authUser ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/session-error" element={<SessionError />} />
        <Route path="/error" element={<AnimatedErrorPage />} />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
