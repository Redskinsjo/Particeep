import React, { useRef } from "react";
import css from "./index.module.css";
import "antd/dist/antd.css";
import { Card, Slider } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MovieCard = ({ movie, showConfirm, isLiked, setIsLiked }) => {
  const likeElem = useRef();
  const plusOneLikeElem = useRef();

  // use of imperative code to notify a like
  const handleLikeClick = () => {
    likeElem.current.style.color = "red";
    likeElem.current.style.fontSize = "13px";
    plusOneLikeElem.current.textContent = "+1";
    setTimeout(() => {
      likeElem.current.style.color = "black";
      likeElem.current.style.fontSize = "10px";
      plusOneLikeElem.current.textContent = "  ";
    }, 1500);
  };
  return (
    // Card component from ant design
    <Card
      title={movie.title}
      headStyle={{ fontWeight: "bold" }}
      extra={
        <FontAwesomeIcon
          icon={["fas", "minus-square"]}
          className={css.trash}
          onClick={() => {
            showConfirm(movie.id);
          }}
        />
      }
      className={css.card}
      style={
        isLiked.includes(movie.id)
          ? { backgroundColor: "rgb(170, 170, 255)" }
          : null
      }
    >
      {/* Content of the card */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>{movie.category}</p>
        <span ref={plusOneLikeElem} style={{ fontSize: 14 }}></span>
      </div>
      <div className={css.toggle_container}>
        {/* Toggle like/dislike the card */}
        {!isLiked.includes(movie.id) ? (
          <FontAwesomeIcon
            icon={["fas", "thumbs-up"]}
            className={css.like}
            onClick={() => {
              const likes = [...isLiked, movie.id];
              setIsLiked(likes);
              movie.likes = movie.likes + 1;
              handleLikeClick();
            }}
          />
        ) : (
          <FontAwesomeIcon
            icon={["fas", "thumbs-down"]}
            className={css.dislike}
            onClick={() => {
              const likes = isLiked.filter((like) => like !== movie.id);
              setIsLiked(likes);
              movie.likes = movie.likes - 1;
            }}
          />
        )}

        {/* Slider Measure of likes against dislikes */}
        <div className={css.slider_container} style={{ width: 120 }}>
          <span ref={likeElem} style={{ fontSize: 10 }}>
            {movie.likes}
          </span>

          <FontAwesomeIcon icon={["fas", "smile"]} style={{ marginLeft: 5 }} />
          <div style={{ width: "80%" }}>
            <Slider
              value={movie.likes}
              disabled={true}
              max={movie.dislikes + movie.likes}
            />
          </div>
          <FontAwesomeIcon icon={["fas", "frown"]} style={{ marginRight: 5 }} />
          <span style={{ fontSize: 10 }}>{movie.dislikes}</span>
        </div>
      </div>
    </Card>
  );
};

export default MovieCard;
