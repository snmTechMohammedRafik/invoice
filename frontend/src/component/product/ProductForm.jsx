import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, modifyProduct, fetchProductById } from '../redux/productSlice';
import { useNavigate, useParams } from 'react-router-dom';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [inStock, setInStock] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { product } = useSelector((state) => state.product);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (product && product._id === id) { // ✅ Ensure product matches URL ID
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setInStock(product.inStock);
    }
  }, [product, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = { name, description, price, inStock };

    if (id) {
      dispatch(modifyProduct({ id, productData }));
    } else {
      dispatch(addProduct(productData));
    }

    navigate('/products');
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">{id ? 'Update Product' : 'Create Product'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">In Stock</label>
          <input
            type="checkbox"
            checked={inStock}
            onChange={() => setInStock(!inStock)}
            className="mr-2"
          />
          In Stock
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          {id ? 'Update Product' : 'Create Product'}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
