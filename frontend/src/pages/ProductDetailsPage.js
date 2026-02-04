import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../api/data";
import NavBar from "../components/NavBar";
import ProductDetails from "../components/ProductDetails";
import { useNavigate } from "react-router-dom";
import ChevronIcon from "../assets/icons/chevron_left.svg";
import "./ProductDetailsPage.scss";

function ProductDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    fetchProduct(id).then((data) => {
      if (!cancelled) setProduct(data);
    });
    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <>
      <NavBar />
      <main className="home-content">
        <div className="back-button-container">
          <button className="back-button" onClick={() => navigate("/products")}>
            <img
              src={ChevronIcon}
              alt="arrow left"
              className="back-button__icon"
            />
            {"BACK"}
          </button>
          <ProductDetails product={product} />
        </div>
      </main>
    </>
  );
}

export default ProductDetailsPage;
