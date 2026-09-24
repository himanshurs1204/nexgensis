import { LayoutDashboard, LogOut, Package, Plus } from 'lucide-react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function DashboardLayout() {
    const { user, signOut } = useAuth(); const navigate = useNavigate(); const location = useLocation()
    const initials = `${user?.firstName?.[0] || 'E'}${user?.lastName?.[0] || 'M'}`
    return <div className="app-shell">
        <aside className="sidebar">
            <div className="brand"><div className="brand-mark">N</div><div className="brand-copy"><span className="brand-name">nexgensis</span><span className="brand-sub">product desk</span></div></div>
            <div className="nav-label">Workspace</div>
            <nav>
                <NavLink to="/products" className={({ isActive }) => `nav-link ${isActive && !location.pathname.includes('/new') && !location.pathname.includes('/edit') ? 'active' : ''}`}><LayoutDashboard size={16} /><span>Overview</span></NavLink>
                <NavLink to="/products" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}><Package size={16} /><span>Products</span></NavLink>
                <NavLink to="/products/new" className="nav-link"><Plus size={16} /><span>Add product</span></NavLink>
            </nav>
            <div className="sidebar-footer"><div className="user-mini"><div className="avatar">{initials}</div><div className="user-copy"><div className="user-name">{user?.firstName || 'Emily'} {user?.lastName || 'Stone'}</div><div className="user-role">administrator</div></div><button className="logout" title="Log out" onClick={() => { signOut(); navigate('/login') }}><LogOut size={15} /></button></div></div>
        </aside>
        <main className="main-content"><Outlet /></main>
    </div>
}