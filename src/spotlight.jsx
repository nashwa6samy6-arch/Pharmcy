"use client";

export default function Spotlight() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column", // ترتيب الكل تحت بعض
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        gap: "30px", // مسافة بين البلوكات
        backgroundColor: "#f5f5f5",
        padding: "20px",
      }}
    >
      {/* الصف الأول - 3 صور جنب بعض */}
      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        <div
          style={{
            backgroundImage:
              "url('https://sidalih.com/cdn/shop/files/d2_copy_12_940x.png?v=1733069823')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "250px",
            height: "250px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        ></div>
        <div
          style={{
            backgroundImage:
              "url('https://sidalih.com/cdn/shop/files/d2_copy_10_940x.png?v=1733069823')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "250px",
            height: "250px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        ></div>
        <div
          style={{
            backgroundImage:
              "url('https://sidalih.com/cdn/shop/files/2_0ff23147-7b8b-476a-88ad-74d873fc7e4c_940x.png?v=1733067363')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "250px",
            height: "250px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        ></div>
      </div>

      {/* باقي الصور تحت بعض */}
      <div>
        <a href="#">
          <img
            src="https://bestpharmacy.gr/pub/media/wysiwyg/slider_small/2025-EN/solgar_995_EN.png"
            alt=""
            style={{
              width: "800px",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          />
        </a>
      </div>
      <div>
        <a href="#">
          <img
            src="https://bestpharmacy.gr/pub/media/wysiwyg/slider_small/2025-EN/lerbolario995_EN_1.jpg"
            alt=""
            style={{
              width: "800px",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          />
        </a>
      </div>
    </div>
  );
}
