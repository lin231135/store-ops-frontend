import { useState } from 'react';
import { X, Save } from "lucide-react";

function EditProductModal({ isOpen, onClose, product, onSave }) {
    const [formData, setFormData] = useState({
        name: product?.name || '',
        category: product?.category || '',
        image: product?.image || '',
        price: product?.price || '',
        quantity: product?.quantity || 0,
        colors: product?.colors || ['#000000', '#ffffff']
    });

    const [errors, setErrors] = useState({});

    const categories = ["Panadería", "Proteínas", "Lácteos", "Vegetales", "Acompañamientos", "Bebidas", "Salsas"];

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'El nombre es requerido';
        }

        if (!formData.category) {
            newErrors.category = 'La categoría es requerida';
        }

        if (!formData.image.trim()) {
            newErrors.image = 'La URL de la imagen es requerida';
        }

        if (!formData.price || parseFloat(formData.price.replace('Q', '')) < 0) {
            newErrors.price = 'El precio debe ser mayor a 0';
        }

        if (formData.quantity < 0) {
            newErrors.quantity = 'La cantidad no puede ser negativa';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            const updatedProduct = {
                ...product,
                ...formData,
                price: formData.price.startsWith('Q') ? formData.price : `Q${formData.price}`
            };
            onSave(updatedProduct);
            onClose();
        }
    };

    const handleColorChange = (index, color) => {
        const newColors = [...formData.colors];
        newColors[index] = color;
        setFormData({ ...formData, colors: newColors });
    };

    const addColor = () => {
        if (formData.colors.length < 5) {
            setFormData({ ...formData, colors: [...formData.colors, '#000000'] });
        }
    };

    const removeColor = (index) => {
        if (formData.colors.length > 1) {
            const newColors = formData.colors.filter((_, i) => i !== index);
            setFormData({ ...formData, colors: newColors });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
            <div className="bg-white rounded-3 shadow-lg p-4" style={{ width: '90%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="mb-0">Editar Producto</h5>
                    <button
                        className="btn btn-outline-secondary btn-sm rounded-circle p-2"
                        onClick={onClose}
                        style={{ width: '32px', height: '32px' }}
                    >
                        <X size={16} />
                    </button>
                </div>

                <div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-medium">Nombre del Producto</label>
                            <input
                                type="text"
                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Ingrese el nombre del producto"
                            />
                            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-medium">Categoría</label>
                            <select
                                className={`form-select ${errors.category ? 'is-invalid' : ''}`}
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option value="">Seleccionar categoría</option>
                                {categories.map((cat, idx) => (
                                    <option key={idx} value={cat}>{cat}</option>
                                ))}
                            </select>
                            {errors.category && <div className="invalid-feedback">{errors.category}</div>}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-medium">Precio</label>
                            <div className="input-group">
                                <span className="input-group-text">Q</span>
                                <input
                                    type="number"
                                    step="0.01"
                                    className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                                    value={formData.price.replace('Q', '')}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    placeholder="0.00"
                                />
                                {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                            </div>
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-medium">Cantidad</label>
                            <input
                                type="number"
                                className={`form-control ${errors.quantity ? 'is-invalid' : ''}`}
                                value={formData.quantity}
                                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
                                placeholder="0"
                                min="0"
                            />
                            {errors.quantity && <div className="invalid-feedback">{errors.quantity}</div>}
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-medium">URL de la Imagen</label>
                        <input
                            type="url"
                            className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            placeholder="https://ejemplo.com/imagen.jpg"
                        />
                        {errors.image && <div className="invalid-feedback">{errors.image}</div>}
                        {formData.image && (
                            <div className="mt-2">
                                <img
                                    src={formData.image}
                                    alt="Vista previa"
                                    className="img-thumbnail"
                                    style={{ height: '60px', objectFit: 'cover' }}
                                    onError={(e) => e.target.style.display = 'none'}
                                />
                            </div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="form-label fw-medium">Colores</label>
                        <div className="d-flex flex-wrap gap-2 align-items-center">
                            {formData.colors.map((color, index) => (
                                <div key={index} className="d-flex align-items-center gap-1">
                                    <input
                                        type="color"
                                        value={color}
                                        onChange={(e) => handleColorChange(index, e.target.value)}
                                        className="form-control form-control-color border-0 p-1"
                                        style={{ width: '40px', height: '40px' }}
                                    />
                                    {formData.colors.length > 1 && (
                                        <button
                                            type="button"
                                            className="btn btn-outline-danger btn-sm rounded-circle p-1"
                                            onClick={() => removeColor(index)}
                                            style={{ width: '24px', height: '24px' }}
                                        >
                                            <X size={12} />
                                        </button>
                                    )}
                                </div>
                            ))}
                            {formData.colors.length < 5 && (
                                <button
                                    type="button"
                                    className="btn btn-outline-primary btn-sm"
                                    onClick={addColor}
                                >
                                    + Color
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="col-md-6 mb-3">
                        <label className="form-label fw-medium">Fecha de Expiración</label>
                        <input
                            type="date"
                            className="form-control"
                            value={dateUtils.toInputDate(formData.expirationDate)}
                            onChange={(e) => setFormData({ ...formData, expirationDate: e.target.value })}
                        />
                    </div>

                    <div className="d-flex gap-2">
                        <button
                            type="button"
                            className="btn btn-outline-secondary flex-fill"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary flex-fill d-flex align-items-center justify-content-center gap-2"
                            onClick={handleSubmit}
                        >
                            <Save size={16} />
                            Guardar Cambios
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProductModal