import React from "react";
import css from "./index.module.css";

export default function Layout({ children, style }) {
  return (
    <div className={css.container} style={style || null}>
      {children}
    </div>
  );
}
