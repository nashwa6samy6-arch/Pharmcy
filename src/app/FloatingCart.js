"use client";
import Link from "next/link";
import styles from "./page.module.css";

export default function FloatingCart() {
  return (
    <Link href="/cart" className={styles.floatingCartBtn}>
      🛒
    </Link>
  );
}
