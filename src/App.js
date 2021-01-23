import React from "react";
import "./App.css";
import css from "./App.module.css";
import Header from "./components/shared/Header/index";
import Home from "./components/Home/index";
import Footer from "./components/shared/Footer/index";

export default function App() {
  return (
    <div className={css.container}>
      <div className={css.stickyFooter}>
        <Header />
        <Home />
      </div>
      <Footer />
    </div>
  );
}
