import React from "react";
import Link from "next/link";
import path from "path";
import fs from "fs";



export default async function generateStaticParams() {
  const filePath = path.join(process.cwd(), "data", "db.json");
  const jsonData = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(jsonData);
  const categories = data.categories || [];

  return (
    <section
      style={{
        padding: "50px 20px",
        background: "#f9f9f9",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            color: "#222",
            marginBottom: "40px",
            position: "relative",
          }}
        >
         الأقسام
          <span
            style={{
              content: '""',
              width: "80px",
              height: "4px",
              background: "#0d6efd",
              display: "block",
              margin: "10px auto 0",
              borderRadius: "4px",
            }}
          ></span>
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "25px",
          }}
        >
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.slug}
              style={{
                background: "#fff",
                borderRadius: "15px",
                padding: "20px",
                textAlign: "center",
                boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
                transition: "all 0.3s ease",
                cursor: "pointer",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "140px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "15px",
                  overflow: "hidden",
                  borderRadius: "12px",
                  background: "#f1f1f1",
                }}
              >
                <img
                  src={category.image}
                  alt={category.title}
                  style={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    objectFit: "contain",
                    transition: "transform 0.3s ease",
                  }}
                />
              </div>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  color: "#333",
                  margin: "0",
                }}
              >
                {category.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
