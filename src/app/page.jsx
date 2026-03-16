import Image from "next/image";
import styles from "./page.module.css";
import Hero from "../Hero"
import ProductCarousel from "../productCarousel";
import Spotlight from "../spotlight";
import Container from "../container";
import HeadCategoriesContainer from "../HeadCategoriesContainer";
import StepsSection from "../steps_section";
import ProductsGrid from "../products_grid";
import TeasersSection from "../TeasersSection";
import Teasers from "../teasers";
import OfferCarousel from "../OffersCarousel";

export default function page() {
  return (
    <>
    <Hero />
    <OfferCarousel />
      <Spotlight />
      <Container />
      <HeadCategoriesContainer />
      <StepsSection />
      <ProductsGrid />
      <TeasersSection />
      <Teasers />
    </>
    
  );
}
