import { useState } from 'react'

import './App.css'
import { Pencil, Trash } from "lucide-react";


//DATOS DE PRUEVA
  const allProducts = [
  {
    image: "/AppleWatch2.svg",
    name: "Apple Watch Series 4",
    category: "Digital Product",
    price: "$690.00",
    quantity: 63,
    colors: ["black", "#d3d3d3", "#f9c2c2", "#dab6c4"]
  },
  {
    image: "https://picsum.photos/id/2/5000/3333",
    name: "Microsoft Headsquare",
    category: "Digital Product",
    price: "$190.00",
    quantity: 13,
    colors: ["black", "#dbeafe", "#fca5a5", "#facc15"]
  },
  {
    image: "/Dress.svg",
    name: "Women's Dress",
    category: "Fashion",
    price: "$640.00",
    quantity: 635,
    colors: ["#581c87", "#dbeafe", "black", "#3b82f6"]
  },
  {
    image: "/SamsunA50.svg",
    name: "Samsung A50",
    category: "Mobile",
    price: "$400.00",
    quantity: 67,
    colors: ["black", "#581c87", "#991b1b"]
  },
  {
    image: "/Camera.svg",
    name: "Camera",
    category: "Electronic",
    price: "$420.00",
    quantity: 52,
    colors: ["black", "#1e3a8a", "#581c87"]
  },
  {
    image: "https://picsum.photos/id/7/5000/3333",
    name: "Microsoft Headsquare",
    category: "Digital Product",
    price: "$190.00",
    quantity: 13,
    colors: ["black", "#dbeafe", "#fca5a5", "#facc15"]
  },
  {
    image: "/Dress.svg",
    name: "Women's Dress",
    category: "Fashion",
    price: "$640.00",
    quantity: 635,
    colors: ["#581c87", "#dbeafe", "black", "#3b82f6"]
  }
];


function Inventario() {
const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const categories = ["All", ...new Set(allProducts.map(p => p.category))];

  const filtered = allProducts.filter(product => {
    const matchName = product.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All" || product.category === category;
    return matchName && matchCategory;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const products = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="container my-4">
      <h2 className="mb-4">Inventario</h2>

      <div className="row g-3 mb-4">
        <div className="col-sm-6 col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar producto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-sm-6 col-md-4">
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Imagen</th>
              <th>Nombre del Producto</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Colores</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, idx) => (
              <tr key={idx}>
                <td>
                  <img src={product.image} alt={product.name} className="img-fluid" style={{ height: "56px" }} />
                </td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>
                  <div className="d-flex gap-1">
                    {product.colors.map((color, i) => (
                      <span
                        key={i}
                        className="rounded-circle border"
                        style={{ backgroundColor: color, width: "20px", height: "20px", display: "inline-block" }}
                      ></span>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <button className="btn btn-outline-secondary btn-sm">
                      <Pencil size={16} />
                    </button>
                    <button className="btn btn-outline-danger btn-sm">
                      <Trash size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <span className="text-muted small">
          Mostrando {itemsPerPage * (currentPage - 1) + 1}-
          {Math.min(itemsPerPage * currentPage, filtered.length)} de {filtered.length}
        </span>
        <div className="btn-group">
          <button
            className="btn btn-outline-primary btn-sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            &lt;
          </button>
          <button
            className="btn btn-outline-primary btn-sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );

}

export default Inventario
