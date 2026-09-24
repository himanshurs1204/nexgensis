import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './context/AuthContext.jsx'
import DashboardLayout from './components/DashboardLayout.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ProductDetailsPage from './pages/ProductDetailsPage.jsx'
import ProductFormPage from './pages/ProductFormPage.jsx'
import ProductsPage from './pages/ProductsPage.jsx'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="screen-loader"><span className="loader-ring" /></div>
  return user ? children : <Navigate to="/login" replace />
}

function App() {
  return <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
      <Route index element={<Navigate to="/products" replace />} />
      <Route path="products" element={<ProductsPage />} />
      <Route path="products/new" element={<ProductFormPage />} />
      <Route path="products/:id/edit" element={<ProductFormPage />} />
      <Route path="products/:id" element={<ProductDetailsPage />} />
    </Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
}

export default App
