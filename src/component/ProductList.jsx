import { ChakraProvider } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

function ProductList() {
  const [allProducts, setAllProducts] = useState(null);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: 0,
    images: [],
  });
  const [editProduct, setEditProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://supergiftme.adaptable.app/items");
      setAllProducts(response.data.sort((a,b)=>b.id-a.id));
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`https://supergiftme.adaptable.app/items/${productId}`);
      setAllProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
    } catch (error) {
      console.error("Error deleting product:", error.message);
    }
  };

  const handleCreate = async () => {
    try {
      const response = await axios.post("https://supergiftme.adaptable.app/items", newProduct);
      setAllProducts((prevProducts) => [response.data, ...prevProducts]);
      setNewProduct({
        title: "",
        price: 0,
        images: [""],
      });
    } catch (error) {
      console.error("Error creating product:", error.message);
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`https://supergiftme.adaptable.app/items/${editProduct.id}`, editProduct);
      setAllProducts((prevProducts) =>
        prevProducts.map((product) => (product.id === editProduct.id ? response.data : product))
      );
      setEditProduct({
        title: "",
        price: 0,
        images: [""],
      });
    } catch (error) {
      console.error("Error updating product:", error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ChakraProvider>
      <div className="App">
        <div className="product-container">
          <div className="product-box">
            <h1 className="new-product-title">{editProduct ? "Edit Product" : "New Product"}</h1>
            <div className="product-info">
              <label>Title:</label>
              <input className="product-info-input"
                type="text"
                value={editProduct ? editProduct.title : newProduct.title}
                onChange={(e) =>
                  editProduct
                    ? setEditProduct({ ...editProduct, title: e.target.value })
                    : setNewProduct({ ...newProduct, title: e.target.value })
                }
              />
              <label>Price:</label>
              <input
                type="number"
                value={editProduct ? editProduct.price : newProduct.price}
                onChange={(e) =>
                  editProduct
                    ? setEditProduct({ ...editProduct, price: e.target.value })
                    : setNewProduct({ ...newProduct, price: e.target.value })
                }
              />
              <label>Image URL:</label>
              <input
                type="text"
                value={editProduct ? editProduct.images[0] : newProduct.images[0]}
                onChange={(e) =>
                  editProduct
                    ? setEditProduct({ ...editProduct, images: [e.target.value] })
                    : setNewProduct({ ...newProduct, images: [e.target.value] })
                }
              />
              {editProduct ? (
                <button onClick={handleUpdate}>Update Product</button>
              ) : (
                <button onClick={handleCreate}>Create Product</button>
              )}
            </div>
          </div>
          {allProducts &&
            allProducts.map((product) => (
              <div key={product.id} className="product-box">
                <h1 className="product-title">{product.title}</h1>
                <img
                  className="product-image"
                  src={product.images[0]}
                  alt="Product"
                />
                <h2 className="product-price">{product.price} € </h2>

                <button className="edit-button" onClick={() => handleEdit(product)}>
        Edit
      </button>
                <button className="delete-button" onClick={() => handleDelete(product.id)}>

        <span role="img" aria-label="Delete" className="delete-icon">
          🗑️
        </span>
      </button>
              </div>
            ))}
        </div>
      </div>
    </ChakraProvider>
  );
}

export default ProductList;