import { Wallet } from 'lucide-react';


const Header = () => (
    <nav className="topbar">
        <div className="topbar__brand">
            <span className="topbar__brand-icon">
                <Wallet size={18} />
            </span>
            <span>WalletWise</span>
        </div>
    </nav>
);

export default Header;