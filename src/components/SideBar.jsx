import { LayoutDashboard, DollarSign, BarChart3, Settings, Wallet, X, LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const Sidebar = ({ isMenuOpen, toggleMenu }) => {
    const navItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
        { name: 'Expenses', icon: DollarSign, path: '/expenses' },
        { name: 'Reports', icon: BarChart3, path: '/reports' },
        { name: 'Profile_Settings', icon: Settings, path: '/profile_settings' },
    ];

    const { logout } = useAuthStore();

    return (
        <aside className={`sidebar ${isMenuOpen ? 'sidebar--open' : ''}`}>
            <div className="sidebar__brand">
                <div className="sidebar__brand-title">
                    <span className="sidebar__brand-icon">
                        <Wallet size={18} />
                    </span>
                    <span>WalletWise</span>
                </div>
                <button onClick={toggleMenu} className="mobile-toggle" aria-label="Close navigation">
                    <X size={18} />
                </button>
            </div>

            <nav className="sidebar__nav">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) => `sidebar__link ${isActive ? 'active' : ''}`}
                    >
                        <item.icon size={18} />
                        <span>{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="sidebar__footer">
                <button onClick={logout}>
                    <LogOut size={18} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;