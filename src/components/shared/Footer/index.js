import React from "react";
import css from "./index.module.css";

export default function Footer() {
  return (
    <div className={css.container}>
      <div style={{ width: 270, textAlign: "center" }}>
        Site créé en <span className={css.tech}> React </span> par{" "}
        <div style={{ display: "inline" }}>
          <a
            href="https://github.com/Redskinsjo?tab=repositories"
            className={css.myProfile}
          >
            <span>Jonathan Carnos</span>
          </a>
        </div>
      </div>
    </div>
  );
}
