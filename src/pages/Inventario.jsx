import { useState } from 'react'

import './Inventario.css'
import { Pencil, Trash } from "lucide-react";
import AlertasStock from './AlertasStock';
import ConfiguracionStock from './ConfiguracionStock';
import { useStockConfig } from './useStockConfig';

//DATOS DE PRUEVA
const initialProducts = [
  {
    name: "Pan de hamburguesa",
    category: "Panadería",
    image: "https://th.bing.com/th/id/R.1389c38c6f6073d683f77bf96b3e6c5b?rik=AvGGzYahDXS7JA&riu=http%3a%2f%2fwww.panaderiasjulia.es%2farchivos%2fimage%2ftienda_productos%2fmedias%2f22-118-comprarpanaderiapan-de-hamburguesa.jpg&ehk=ONuGcAoxXYOfBlpr1OqhrvdCO2WKWSwBaQQTli9mNQ4%3d&risl=&pid=ImgRaw&r=0",
    price: "Q0.50",
    quantity: 120,
    colors: ["#deb887", "#d2b48c"]
  },
  {
    name: "Carne de res (150g)",
    category: "Proteínas",
    image: "https://medias.treew.com/imgproducts/middle/169397.jpg",
    price: "Q5.00",
    quantity: 80,
    colors: ["#8b0000", "#a52a2a"]
  },
  {
    name: "Queso cheddar",
    category: "Lácteos",
    image: "https://lacasadelqueso.com.ar/wp-content/uploads/2017/07/queso-cheddar-color-intenso.jpg",
    price: "Q1.00",
    quantity: 60,
    colors: ["#ffcc00", "#ffb300"]
  },
  {
    name: "Lechuga romana",
    category: "Vegetales",
    image: "https://huerto-en-casa.com/wp-content/uploads/2021/09/lechuga-romana.jpg",
    price: "Q0.75",
    quantity: 40,
    colors: ["#228b22", "#7cfc00"]
  },
  {
    name: "Tomate",
    category: "Vegetales",
    image: "https://th.bing.com/th/id/OIP.tLf9JumLo06aAkzvo6194AHaHG?rs=1&pid=ImgDetMain",
    price: "Q0.90",
    quantity: 50,
    colors: ["#ff6347", "#e32636"]
  },
  {
    name: "Cebolla morada",
    category: "Vegetales",
    image: "https://frutasyverduras.info/wp-content/uploads/2019/06/cebolla-morada-1024x711.jpg",
    price: "Q0.60",
    quantity: 30,
    colors: ["#800080", "#9932cc"]
  },
  {
    name: "Papas fritas congeladas",
    category: "Acompañamientos",
    image: "https://www.paulinacocina.net/wp-content/uploads/2017/10/frenchfries.jpg",
    price: "Q3.50",
    quantity: 100,
    colors: ["#f4a460", "#daa520"]
  },
  {
    name: "Refresco cola (355ml)",
    category: "Bebidas",
    image: "https://images-na.ssl-images-amazon.com/images/I/81mEIp4PMBL._SL1500_.jpg",
    price: "Q2.00",
    quantity: 200,
    colors: ["#3b2f2f", "#8b4513"]
  },
  {
    name: "Salsa kétchup",
    category: "Salsas",
    image: "https://th.bing.com/th/id/OIP.94MFGcImEKzXhL3gBQLK6QHaHa?rs=1&pid=ImgDetMain",
    price: "Q2.50",
    quantity: 20,
    colors: ["#b22222", "#dc143c"]
  },
  {
    name: "Mostaza",
    category: "Salsas",
    image: "https://i5-mx.walmartimages.com/gr/images/product-images/img_large/00750100330580L.jpg",
    price: "Q2.50",
    quantity: 20,
    colors: ["#ffd700", "#ffea00"]
  }
];


function Inventario() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const {
    stockMinimo,
    setStockMinimo,
    mostrarAlertas,
    setMostrarAlertas,
    getStockBadgeClass,
    contarProductosPorEstado
  } = useStockConfig();

  const estadisticas = contarProductosPorEstado(products);

  const itemsPerPage = 5;

  const categories = ["All", ...new Set(products.map(p => p.category))];

  const filtered = products.filter(product => {
    const matchName = product.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All" || product.category === category;
    return matchName && matchCategory;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const currentProducts = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (updatedProduct) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const handleDeleteClick = (productId) => {
    if (window.confirm('¿Está seguro de que desea eliminar este producto?')) {
      setProducts(products.filter(p => p.id !== productId));
      // Ajustar página si es necesario
      const newFiltered = products.filter(p => p.id !== productId).filter(product => {
        const matchName = product.name.toLowerCase().includes(search.toLowerCase());
        const matchCategory = category === "All" || product.category === category;
        return matchName && matchCategory;
      });
      const newTotalPages = Math.ceil(newFiltered.length / itemsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-primary fw-bold">Inventario</h2>

      {mostrarAlertas && (
        <AlertasStock products={products} stockMinimo={stockMinimo} />
      )}

      <ConfiguracionStock
        stockMinimo={stockMinimo}
        setStockMinimo={setStockMinimo}
        mostrarAlertas={mostrarAlertas}
        setMostrarAlertas={setMostrarAlertas}
        estadisticas={estadisticas}
      />

      <div className="row g-3 mb-4">
        <div className="col-sm-6 col-md-4">
          <input
            type="text"
            className="form-control border-2"
            placeholder="🔍 Buscar producto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-sm-6 col-md-4">
          <select
            className="form-select border-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-responsive shadow-sm rounded-3 overflow-hidden">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-primary">
            <tr>
              <th className="fw-bold">Imagen</th>
              <th className="fw-bold">Nombre del Producto</th>
              <th className="fw-bold">Categoría</th>
              <th className="fw-bold">Precio</th>
              <th className="fw-bold">Cantidad</th>
              <th className="fw-bold">Colores</th>
              <th className="fw-bold text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product, idx) => (
              <tr key={product.id} className="border-bottom">
                <td>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="img-fluid rounded-2 shadow-sm"
                    style={{ height: "56px", width: "56px", objectFit: "cover" }}
                  />
                </td>
                <td className="fw-medium">{product.name}</td>
                <td>
                  <span className="badge bg-light text-dark border">{product.category}</span>
                </td>
                <td className="fw-bold text-success">{product.price}</td>
                <td>
                  <span className={`badge ${getStockBadgeClass(product.quantity)}`}>
                    {product.quantity}
                  </span>
                </td>
                <td>
                  <div className="d-flex gap-1">
                    {product.colors.map((color, i) => (
                      <span
                        key={i}
                        className="rounded-circle border shadow-sm"
                        style={{
                          backgroundColor: color,
                          width: "24px",
                          height: "24px",
                          display: "inline-block"
                        }}
                        title={color}
                      ></span>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="d-flex gap-2 justify-content-center">
                    <button
                      className="btn btn-outline-primary btn-sm rounded-2"
                      onClick={() => handleEditClick(product)}
                      title="Editar producto"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm rounded-2"
                      onClick={() => handleDeleteClick(product.id)}
                      title="Eliminar producto"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-4">
        <span className="text-muted">
          Mostrando {itemsPerPage * (currentPage - 1) + 1}-
          {Math.min(itemsPerPage * currentPage, filtered.length)} de {filtered.length} productos
        </span>
        <div className="btn-group">
          <button
            className="btn btn-outline-primary"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            ← Anterior
          </button>
          <span className="btn btn-light disabled">
            {currentPage} de {totalPages}
          </span>
          <button
            className="btn btn-outline-primary"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Siguiente →
          </button>
        </div>
      </div>

      <EditProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
        onSave={handleSaveProduct}
      />
    </div>
  );
}

export default Inventario;