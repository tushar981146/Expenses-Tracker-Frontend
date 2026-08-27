import { Menu, User, Ellipsis } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore';


function Head({ toggle }) {
  const { authUser } = useAuthStore();

  return (
    <header className="page-header">
      <button onClick={toggle} className="mobile-toggle" aria-label="Open navigation">
        <Menu size={18} />
      </button>
      <h1 className="page-header__title">Dashboard Overview</h1>

      <div className="page-header__meta">
        <span className="page-header__greeting">Welcome, {authUser?.fullName || 'there'}!</span>
        <img
          src={authUser?.profilePic || '/avatar.png'}
          alt="Profile"
          className="page-header__avatar"
        />
      </div>
    </header>
  );
}

export default Head
