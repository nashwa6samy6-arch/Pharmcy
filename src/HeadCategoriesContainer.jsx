"use client";

import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import data from "../data/db.json";

export default function HeadCategoriesContainer() {
  const categories = data.categories || [];

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4 font-bold text-2xl text-gray-800 relative">
        ابحث بالقسم
        <span className="block w-20 h-1 bg-blue-600 rounded mx-auto mt-2"></span>
      </h2>

      <div className="row g-3 justify-content-center">
        {categories.map((category) => (
          <div key={category.id} className="col-6 col-sm-4 col-md-3 col-lg-2">
            <Link
              href={category.slug}
              className="text-decoration-none"
            >
              <div
                className="card h-100 border-0 shadow-hover rounded-4 overflow-hidden"
                style={{
                  cursor: "pointer",
                  background: "linear-gradient(145deg, #ffffff, #f7f7f7)",
                }}
              >
                <img
                  src={category.image}
                  className="card-img-top img-hover"
                  alt={category.title}
                  style={{
                    height: "140px",
                    objectFit: "cover",
                    transition: "transform 0.4s ease",
                  }}
                />
                <div className="card-body d-flex align-items-center justify-content-center p-2">
                  <h6 className="card-title text-center text-dark fw-semibold m-0">
                    {category.title}
                  </h6>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* استايل داخلي */}
      <style jsx>{`
        .shadow-hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
        }
        .shadow-hover:hover {
          transform: translateY(-8px) scale(1.05);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
        }
        .img-hover:hover {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
}
