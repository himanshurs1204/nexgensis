import { useState } from 'react'

const emptyProduct = { title: '', description: '', price: '', category: '', stock: '', brand: '', thumbnail: '' }

export default function ProductForm({ initialValues = emptyProduct, onSubmit, saving }) {
    const [values, setValues] = useState({ ...emptyProduct, ...initialValues }); const [error, setError] = useState('')
    function change(event) { setValues((current) => ({ ...current, [event.target.name]: event.target.value })) }
    function submit(event) { event.preventDefault(); if (!values.title.trim() || !values.price || !values.category.trim()) { setError('Title, price, and category are required.'); return }; setError(''); onSubmit({ ...values, price: Number(values.price), stock: Number(values.stock || 0) }) }
    return <form className="form-card" onSubmit={submit}><div className="form-grid">
        <div className="form-full"><label className="form-label" htmlFor="title">Product title</label><input className="form-input" id="title" name="title" value={values.title} onChange={change} placeholder="e.g. Studio headphones" /></div>
        <div><label className="form-label" htmlFor="category">Category</label><input className="form-input" id="category" name="category" value={values.category} onChange={change} placeholder="e.g. audio" /></div>
        <div><label className="form-label" htmlFor="brand">Brand</label><input className="form-input" id="brand" name="brand" value={values.brand} onChange={change} placeholder="e.g. Soundcore" /></div>
        <div><label className="form-label" htmlFor="price">Price</label><input className="form-input" id="price" name="price" type="number" min="0" step="0.01" value={values.price} onChange={change} placeholder="0.00" /></div>
        <div><label className="form-label" htmlFor="stock">Stock</label><input className="form-input" id="stock" name="stock" type="number" min="0" value={values.stock} onChange={change} placeholder="0" /></div>
        <div className="form-full"><label className="form-label" htmlFor="thumbnail">Image URL</label><input className="form-input" id="thumbnail" name="thumbnail" value={values.thumbnail} onChange={change} placeholder="https://..." /></div>
        <div className="form-full"><label className="form-label" htmlFor="description">Description</label><textarea className="form-input" id="description" name="description" rows="4" value={values.description} onChange={change} placeholder="Describe the product..." style={{ height: 'auto', paddingTop: 12 }} /></div>
    </div>{error && <div className="form-error">{error}</div>}<div className="form-actions"><button type="button" className="soft-btn" onClick={() => window.history.back()}>Cancel</button><button type="submit" className="primary-btn" disabled={saving}>{saving ? 'Saving...' : 'Save product'}</button></div></form>
}