import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  removeProduct,
  modifyProduct,
} from "../redux/productSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Importing icons

const ProductTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, loading, error } = useSelector((state) => state.product);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(removeProduct(id));
    toast.success("Product deleted");
  };

  const handleEdit = (id) => {
    navigate(`/products/${id}`); // ✅ Redirect to edit page
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (editProduct) {
      dispatch(
        modifyProduct({ id: editProduct._id, productData: editProduct })
      );
      toast.success("Product updated");
      setEditProduct(null);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    toast.error(error.message);
  }

  return (
    <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Product List
      </h2>
      <button
        onClick={() => navigate("/products/new")}
        className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-4 py-2 rounded-md mb-4 hover:from-blue-600 hover:to-teal-500 transition-all duration-300"
      >
        Add Product
      </button>
      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products available</p>
      ) : (
        <table className="min-w-full table-auto divide-y divide-gray-200 table-striped">
          <thead className="bg-gray-200 text-gray-800">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">In Stock</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={product._id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-200 transition-all duration-300`}
              >
                <td className="px-6 py-3 text-gray-700">{product.name}</td>
                <td className="px-6 py-3 text-gray-700">${product.price}</td>
                <td className="px-6 py-3 text-gray-700">
                  {product.inStock ? "Yes" : "No"}
                </td>
                <td className="px-6 py-3 space-x-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-300"
                    onClick={() => handleEdit(product._id)} // ✅ Use `_id`
                  >
                    <FaEdit className="inline-block mr-2" />
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-300"
                    onClick={() => handleDelete(product._id)} // ✅ Use `_id`
                  >
                    <FaTrashAlt className="inline-block mr-2" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editProduct && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Edit Product</h2>
            <form onSubmit={handleUpdate} className="flex flex-col gap-4">
              <input
                type="text"
                value={editProduct.name}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, name: e.target.value })
                }
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Product Name"
              />
              <input
                type="number"
                value={editProduct.price}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, price: e.target.value })
                }
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Price"
              />
              <label className="flex items-center gap-2 text-gray-700">
                <input
                  type="checkbox"
                  checked={editProduct.inStock}
                  onChange={(e) =>
                    setEditProduct({
                      ...editProduct,
                      inStock: e.target.checked,
                    })
                  }
                  className="focus:ring-2 focus:ring-blue-400"
                />
                In Stock
              </label>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-teal-500 text-white px-6 py-3 rounded-md hover:bg-teal-600 transition-all duration-300"
                >
                  Update
                </button>
                <button
                  type="button"
                  className="bg-gray-400 text-white px-6 py-3 rounded-md hover:bg-gray-500 transition-all duration-300"
                  onClick={() => setEditProduct(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
