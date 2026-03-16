"use client";

import React from "react";

const data = [
  {
    id: 1,
    title: "فرز الحبوب؟ لا شكرًا!",
    description:
      "تنظيم مثالي من خلال عبوات فردية. وداعًا لفوضى الأدوية.",
    image:
      "https://www.mycare.de/medias/banner-service-verblisterung-300x300px.jpg?context=bWFzdGVyfHJvb3R8MTAyMDZ8aW1hZ2UvanBlZ3xoNGUvaGVhLzEwMjYwMDU5NTUzODIyLmpwZ3xmZjY2MDVhZDc4MzQ0Y2I2ZjZkNDdkZTkyN2MxN2RmNzZlZGExNTQzZTAyYWQwYmQ5Njc4NGZhNDM2ODIyYTk2",
    alt: "عبوة أدوية",
    link: "/medpac",
    linkText: "اطلب عبواتك الفردية"
  },
  {
    id: 2,
    title: "تحضير الوصفات: أبعد من المعتاد",
    description:
      "أدوية، علاج هرموني وكريمات مخصصة لاحتياجاتك. تصنيع دقيق.",
    image:
      "https://www.mycare.de/medias/banner-service-rezepturen-300x300px.jpg?context=bWFzdGVyfHJvb3R8ODM2OHxpbWFnZS9qcGVnfGhhNS9oY2IvMTAyNjAwNTk2ODQ4OTQuanBnfDVhZTQ2YTVmZTJiNjAzMDUwY2YyYWQ0OTBiMmQwNWRlZDkxMDk5Yjk0NDIxY2IzYjAwYzBkYjhiNDE4ZWNhYjQ",
    alt: "تحضير وصفة",
    link: "/apotheken-kompetenz/rezeptur",
    linkText: "اطلب الآن"
  },
  {
    id: 3,
    title: "هل لديك وصفة إلكترونية؟",
    description:
      "أرسلها بسهولة واحصل على الأدوية مع توصيل مجاني وسري إلى منزلك.",
    image:
      "https://www.mycare.de/medias/banner-service-spezialversorgung-300x300px.jpg?context=bWFzdGVyfHJvb3R8ODU0NXxpbWFnZS9qcGVnfGhhMC9oMmUvMTAyNjAwNjkxMjIwNzguanBnfGEzMzk1YjdhYjVlODk4MjI4M2ViNjI1ZGRiYzhjZWY4NjAyNzlhMWNhNTVjZWRmYTNmYjVmY2NjNmJmZDVlZGI",
    alt: "وصفة إلكترونية",
    link: "/rezepte-einloesen",
    linkText: "أرسل وصفتك"
  }
];

export default function CardsSection() {
  return (
    <section className="cards-container">
      {data.map((item) => (
        <div className="card" key={item.id}>
          <img src={item.image} alt={item.alt} />
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <a href={item.link}>{item.linkText}</a>
        </div>
      ))}

      <style jsx>{`
        .cards-container {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
          padding: 20px;
        }

        .card {
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          text-align: center;
          padding: 15px;
          width: 280px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .card:hover {
          transform: translateY(-10px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }

        .card img {
          width: 100%;
          border-radius: 8px;
          margin-bottom: 10px;
        }

        .card h3 {
          font-size: 18px;
          color: #333;
          margin-bottom: 8px;
        }

        .card p {
          font-size: 14px;
          color: #666;
          margin-bottom: 12px;
        }

        .card a {
          display: inline-block;
          background: #009688;
          color: #fff;
          padding: 8px 16px;
          border-radius: 5px;
          text-decoration: none;
          transition: background 0.3s ease;
        }

        .card a:hover {
          background: #00796b;
        }
      `}</style>
    </section>
  );
}
