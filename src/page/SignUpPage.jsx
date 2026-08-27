import FinanceIllustration from '../components/FinanceIllustration';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '', confirm_password: '' });
  const { signup } = useAuthStore();
  const update = (name, value) => setFormData({ ...formData, [name]: value });
  const handleSubmit = (event) => { event.preventDefault(); if (!formData.fullName.trim()) return toast.error('Full name is required'); if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error('Enter a valid email address'); if (formData.password.length < 6) return toast.error('Password must have at least 6 characters'); if (formData.password !== formData.confirm_password) return toast.error('Passwords do not match'); signup(formData); };
  const field = (label, name, type, icon) => <label className="auth-field">{label}<span className="auth-field__control">{icon}<input type={type} value={formData[name]} onChange={(event) => update(name, event.target.value)} placeholder={`Enter your ${label.toLowerCase()}`} required /></span></label>;
  return <div className="auth-shell"><div className="auth-card auth-card--signup">
    <section className="auth-card__panel auth-card__panel--accent auth-card__visual"><div className="auth-card__eyebrow">WalletWise · Start simply</div><h1 className="auth-heading auth-heading--light">A calmer way to manage your money.</h1><p className="auth-copy auth-copy--light">Create your account and bring your budgets, expenses, and goals together.</p><div className="auth-illustration"><FinanceIllustration /></div></section>
    <section className="auth-card__panel"><Header /><div className="auth-form-wrap"><div className="auth-form-intro"><p className="auth-kicker">Create account</p><h2>Build better money habits</h2><p>It only takes a minute to get started.</p></div><form onSubmit={handleSubmit} className="auth-form">{field('Full name', 'fullName', 'text', <User size={17} />)}{field('Email address', 'email', 'email', <Mail size={17} />)}<label className="auth-field">Password<span className="auth-field__control"><Lock size={17} /><input type={showPassword ? 'text' : 'password'} value={formData.password} onChange={(event) => update('password', event.target.value)} placeholder="Create a password" required /><button type="button" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility">{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></span></label>{field('Confirm password', 'confirm_password', showPassword ? 'text' : 'password', <Lock size={17} />)}<button type="submit" className="btn btn--primary btn--block">Create account</button></form><p className="auth-footer">Already have an account? <Link to="/login">Sign in</Link></p></div></section>
  </div></div>;
};
export default SignUpPage;
