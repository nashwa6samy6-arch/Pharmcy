'use client';

export default function ProductCarousel() {
  return (
    <div id="productCarousel" className="custom-carousel">
      <div className="custom-carousel-inner" id="carousel-inner">
        <div className="carousel-item active">
          <img src="/images/Pp1d7.jpg" className="carousel-img" alt="..." />
        </div>
        <div className="carousel-item">
          <img src="/images/images.png" className="carousel-img" alt="..." />
        </div>
        <div className="carousel-item">
          <img src="https://cdn.chefaa.com/public/uploads/products/hyalo-4control-cream-25gm-ool1-01675345650.png" className="carousel-img" alt="..." />
        </div>
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#productCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">السابق</span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#productCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">التالي</span>
      </button>
    </div>
  );
}