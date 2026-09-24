import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import * as productApi from '../api/products.js'
import ProductForm from '../components/ProductForm.jsx'

export default function ProductFormPage() {
    const { id } = useParams(); const editing = Boolean(id); const navigate = useNavigate(); const [product, setProduct] = useState(null); const [loading, setLoading] = useState(editing); const [saving, setSaving] = useState(false); const [error, setError] = useState('')
    useEffect(() => { if (!editing) return; productApi.getProduct(id).then(setProduct).catch((reason) => setError(reason.message)).finally(() => setLoading(false)) }, [editing, id])
    async function submit(values) { setSaving(true); setError(''); try { const result = editing ? await productApi.updateProduct(id, values) : await productApi.createProduct(values); const changes = JSON.parse(localStorage.getItem('nexgensis_changes') || '{}'); changes[result.id] = result; localStorage.setItem('nexgensis_changes', JSON.stringify(changes)); navigate(`/products/${result.id}`) } catch (reason) { setError(reason.message) } finally { setSaving(false) } }
    if (loading) return <div className="table-loader"><span className="loader-ring" /></div>
    if (editing && error) return <div className="error-state"><h3 className="state-title">Could not load this product</h3><p className="state-copy">{error}</p><Link className="soft-btn" to="/products">Back to products</Link></div>
    return <><div className="topline"><div><div className="eyebrow">Catalog / {editing ? 'edit' : 'new'}</div><h1 className="page-title">{editing ? 'Edit product' : 'Add a product'}</h1><p className="page-copy">{editing ? 'Make a precise update to this catalog item.' : 'Add a new item to the product library.'}</p></div></div>{error && <div className="form-error" style={{ maxWidth: 800, marginBottom: 12 }}>{error}</div>}<ProductForm initialValues={product || undefined} onSubmit={submit} saving={saving} /></>
}