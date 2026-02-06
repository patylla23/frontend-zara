import React, { useState, useEffect, useRef, useContext } from "react";
import "./ProductDetails.scss";
import ProductItemCard from "./ProductItemCard";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function ProductDetails({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useContext(AppContext);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [hoveredColor, setHoveredColor] = useState(null);
  const [scrollProgress, setScrollProgress] = useState({ left: 0, width: 100 });
  const carouselRef = useRef(null);

  useEffect(() => {
    if (!product) return;
    const colors = product.colorOptions || [];
    setSelectedColor(colors[0]?.name ?? null);
    setSelectedStorage(null);
  }, [product]);

  useEffect(() => {
    const items = product?.similarProducts || [];
    if (items.length === 0) return;
    const el = carouselRef.current;
    if (!el) return;
    const updateProgress = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      const maxScroll = scrollWidth - clientWidth;
      const trackWidth = el.offsetWidth;
      if (maxScroll <= 0) {
        setScrollProgress({ left: 0, width: trackWidth });
        return;
      }
      const thumbWidth = Math.max((clientWidth / scrollWidth) * trackWidth, 40);
      const left = (scrollLeft / maxScroll) * (trackWidth - thumbWidth);
      setScrollProgress({ left, width: thumbWidth });
    };
    updateProgress();
    const resizeObserver = new ResizeObserver(updateProgress);
    resizeObserver.observe(el);
    return () => resizeObserver.disconnect();
  }, [product]);

  if (!product) return null;

  const colorOptions = product.colorOptions || [];
  const storageOptions = product.storageOptions || [];
  const similarProducts = product.similarProducts || [];
  const specs = product.specs || {};

  const displayImage =
    (selectedColor &&
      colorOptions.find((c) => c.name === selectedColor)?.imageUrl) ||
    colorOptions[0]?.imageUrl;

  const selectedStorageData = storageOptions.find(
    (s) => s.capacity === selectedStorage
  );
  const displayPrice = selectedStorageData?.price ?? product.basePrice;

  return (
    <article className="product-details">
      {/* Prodcut details */}
      <section className="product-details__hero">
        {displayImage && (
          <div className="product-details__image-wrap">
            <img
              src={displayImage}
              alt={product.name}
              className="product-details__image"
            />
          </div>
        )}
        <h1 className="product-details__name">{product.name?.toUpperCase()}</h1>
        <p className="product-details__price">
          {selectedStorage ? `${displayPrice} EUR` : `From ${displayPrice} EUR`}
        </p>
      </section>

      {/* Storage options */}
      {storageOptions.length > 0 && (
        <section className="product-details__option">
          <p className="product-details__option-label">
            STORAGE ¿HOW MUCH SPACE DO YOU NEED?
          </p>
          <div className="product-details__storage-options">
            {storageOptions.map((prod) => (
              <button
                key={prod.capacity}
                type="button"
                className={`product-details__storage-btn ${
                  selectedStorage === prod.capacity
                    ? "product-details__storage-btn--selected"
                    : ""
                }`}
                onClick={() => setSelectedStorage(prod.capacity)}
              >
                {prod.capacity}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Color options */}
      {colorOptions.length > 0 && (
        <section className="product-details__option">
          <p className="product-details__option-label">
            COLOR. PICK YOUR FAVOURITE.
          </p>
          <div className="product-details__color-options">
            {colorOptions.map((opt) => (
              <button
                key={opt.name}
                type="button"
                className={`product-details__color-swatch ${
                  selectedColor === opt.name
                    ? "product-details__color-swatch--selected"
                    : ""
                }`}
                style={{ backgroundColor: opt.hexCode }}
                aria-label={opt.name}
                onClick={() => setSelectedColor(opt.name)}
                onMouseEnter={() => setHoveredColor(opt.name)}
                onMouseLeave={() => setHoveredColor(null)}
              />
            ))}
            {(hoveredColor || selectedColor) && (
              <p className="product-details__color-name">
                {hoveredColor || selectedColor}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Button */}
      <button
        className="product-details__add-button"
        disabled={storageOptions.length > 0 && !selectedStorage}
        onClick={() => {
          addToCart({
            ...product,
            imageUrl: displayImage,
            selectedStorage,
            selectedColor,
            basePrice: displayPrice,
          });
          navigate("/checkout");
        }}
      >
        AÑADIR
      </button>

      {/* Specifications */}
      <section className="product-details__specs">
        <h2 className="product-details__specs-title">SPECIFICATIONS</h2>
        <dl className="product-details__specs-list">
          <div className="product-details__specs-row">
            <dt className="product-details__specs-term">BRAND</dt>
            <dd className="product-details__specs-value">{product.brand}</dd>
          </div>
          <div className="product-details__specs-row">
            <dt className="product-details__specs-term">NAME</dt>
            <dd className="product-details__specs-value">{product.name}</dd>
          </div>
          {product.description && (
            <div className="product-details__specs-row">
              <dt className="product-details__specs-term">DESCRIPTION</dt>
              <dd className="product-details__specs-value">
                {product.description}
              </dd>
            </div>
          )}
          {specs.screen && (
            <div className="product-details__specs-row">
              <dt className="product-details__specs-term">SCREEN</dt>
              <dd className="product-details__specs-value">{specs.screen}</dd>
            </div>
          )}
          {specs.resolution && (
            <div className="product-details__specs-row">
              <dt className="product-details__specs-term">RESOLUTION</dt>
              <dd className="product-details__specs-value">
                {specs.resolution}
              </dd>
            </div>
          )}
          {specs.processor && (
            <div className="product-details__specs-row">
              <dt className="product-details__specs-term">PROCESSOR</dt>
              <dd className="product-details__specs-value">
                {specs.processor}
              </dd>
            </div>
          )}
          {specs.mainCamera && (
            <div className="product-details__specs-row">
              <dt className="product-details__specs-term">MAIN CAMERA</dt>
              <dd className="product-details__specs-value">
                {specs.mainCamera}
              </dd>
            </div>
          )}
          {specs.selfieCamera && (
            <div className="product-details__specs-row">
              <dt className="product-details__specs-term">SELFIE CAMERA</dt>
              <dd className="product-details__specs-value">
                {specs.selfieCamera}
              </dd>
            </div>
          )}
          {specs.battery && (
            <div className="product-details__specs-row">
              <dt className="product-details__specs-term">BATTERY</dt>
              <dd className="product-details__specs-value">{specs.battery}</dd>
            </div>
          )}
          {specs.os && (
            <div className="product-details__specs-row">
              <dt className="product-details__specs-term">OS</dt>
              <dd className="product-details__specs-value">{specs.os}</dd>
            </div>
          )}
          {specs.screenRefreshRate && (
            <div className="product-details__specs-row">
              <dt className="product-details__specs-term">
                SCREEN REFRESH RATE
              </dt>
              <dd className="product-details__specs-value">
                {specs.screenRefreshRate}
              </dd>
            </div>
          )}
        </dl>
      </section>

      {/* Similar items carousel */}
      <section className="product-details__carousel">
        <h2 className="product-details__carousel-title">SIMILAR ITEMS</h2>
        <div
          ref={carouselRef}
          className="product-details__carousel-scroll"
          onScroll={() => {
            const el = carouselRef.current;
            if (!el) return;
            const { scrollLeft, scrollWidth, clientWidth } = el;
            const maxScroll = scrollWidth - clientWidth;
            if (maxScroll <= 0) {
              setScrollProgress({ left: 0, width: 100 });
              return;
            }
            const trackWidth = el.offsetWidth;
            const thumbWidth = Math.max(
              (clientWidth / scrollWidth) * trackWidth,
              40
            );
            const left = (scrollLeft / maxScroll) * (trackWidth - thumbWidth);
            setScrollProgress({ left, width: thumbWidth });
          }}
        >
          {similarProducts.length > 0 ? (
            similarProducts.map((item) => (
              <ProductItemCard key={`${item.id}-${item.name}`} product={item} />
            ))
          ) : null}
        </div>
        <div className="product-details__carousel-track">
          <div
            className="product-details__carousel-thumb"
            style={{
              left: scrollProgress.left,
              width: scrollProgress.width,
            }}
          />
        </div>
      </section>
    </article>
  );
}

export default ProductDetails;
