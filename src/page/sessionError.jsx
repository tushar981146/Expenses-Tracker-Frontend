import { useCallback, useEffect, useState } from 'react';
import { ArrowRight, LogOut, RefreshCw, ShieldAlert } from 'lucide-react';

const SessionError = () => {
  const [countdown, setCountdown] = useState(10);
  const [isClearing, setIsClearing] = useState(false);
  const redirect = useCallback(() => { window.location.assign('/login'); }, []);

  useEffect(() => {
    const clearSession = () => { setIsClearing(true); try { localStorage.removeItem('accessToken'); localStorage.removeItem('refreshToken'); localStorage.removeItem('user_data'); } finally { setIsClearing(false); } };
    clearSession();
    const timer = setInterval(() => setCountdown((value) => { if (value <= 1) { clearInterval(timer); redirect(); return 0; } return value - 1; }), 1000);
    return () => clearInterval(timer);
  }, [redirect]);

  return <main className="session-shell"><section className="session-card"><div className="session-card__accent" /><div className="session-card__content"><div className="session-card__icon"><ShieldAlert size={36} /></div><h1>Session expired</h1><p>Your security token is no longer valid. For your protection, you have been logged out.</p><div className="session-card__status"><div className="session-card__status-title">{isClearing ? <RefreshCw size={15} /> : <LogOut size={15} />}{isClearing ? 'Cleaning session…' : 'Redirecting to login'}</div><div className="session-card__progress"><span style={{ width: `${(countdown / 10) * 100}%` }} /></div><p>Redirecting in {countdown}s</p></div><button onClick={redirect} className="btn btn--primary btn--block">Sign in again <ArrowRight size={17} /></button><button onClick={() => window.location.reload()} className="session-card__refresh">Didn&apos;t redirect? Refresh page</button></div><footer className="session-card__footer">Secure authentication shield</footer></section></main>;
};
export default SessionError;
