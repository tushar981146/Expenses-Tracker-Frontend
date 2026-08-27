import FinanceIllustration from '../components/FinanceIllustration';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useAuthStore();
  const update = (name, value) => setFormData({ ...formData, [name]: value });

  return <div className="auth-shell"><div className="auth-card auth-card--login">
    <section className="auth-card__panel auth-card__panel--accent auth-card__visual"><div className="auth-card__eyebrow">WalletWise · Secure access</div><h2 className="auth-heading auth-heading--light">Welcome back to your finance workspace.</h2><p className="auth-copy auth-copy--light">Sign in to review your spending, track progress, and keep your goals moving forward.</p><div className="auth-illustration"><FinanceIllustration /></div></section>
    <section className="auth-card__panel"><Header /><div className="auth-form-wrap"><div className="auth-form-intro"><p className="auth-kicker">Login</p><h1>Sign in to continue</h1><p>Use your email and password to unlock your dashboard.</p></div><form onSubmit={(event) => { event.preventDefault(); login(formData); }} className="auth-form"><label className="auth-field">Email address<span className="auth-field__control"><Mail size={17} /><input type="email" value={formData.email} onChange={(event) => update('email', event.target.value)} placeholder="Enter your email" required /></span></label><label className="auth-field">Password<span className="auth-field__control"><Lock size={17} /><input type={showPassword ? 'text' : 'password'} value={formData.password} onChange={(event) => update('password', event.target.value)} placeholder="Enter your password" required /><button type="button" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility">{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></span></label><button type="submit" className="btn btn--primary btn--block">Sign in</button></form><p className="auth-footer">Don&apos;t have an account? <Link to="/signup">Create one</Link></p></div></section>
  </div></div>;
};
export default LoginPage;
