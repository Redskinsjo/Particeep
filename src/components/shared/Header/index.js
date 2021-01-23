import React from "react";
import css from "./index.module.css";
import Logo from "../../../assets/img/logo.png";
import Layout from "../Layout/index";

const layoutStyle = {
  height: "100%",
};

export default function Header() {
  return (
    <div className={css.container}>
      <Layout style={layoutStyle}>
        <img src={Logo} alt="logo" style={{ height: "100%" }}></img>
      </Layout>
    </div>
  );
}
