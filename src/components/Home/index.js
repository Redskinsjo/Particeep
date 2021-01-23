import React, { useState, useEffect } from "react";
import css from "./index.module.css";
import Layout from "../shared/Layout/index";
import { movies$ } from "../../assets/data/movies.js";
import "antd/dist/antd.css";
import { Card, message, Modal, Slider, Select, Pagination } from "antd";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMinusSquare,
  faThumbsUp,
  faThumbsDown,
  faSmile,
  faFrown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faMinusSquare, faThumbsUp, faThumbsDown, faSmile, faFrown);

const { confirm } = Modal;
const { Option } = Select;

const layoutStyles = {
  display: "flex",
  flexDirection: "column",
  minHeight: 379,
};

const Home = () => {
  const [movies, setMovies] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pageSize, setPageSize] = useState();
  const [currentPage, setCurrentPage] = useState();

  const handlePageChange = (page, pageSize) => {
    if (page === 1) {
      movies$.then((data) => {
        const moviesDisplayed = data.slice(0, pageSize);
        setMovies(moviesDisplayed);
      });
    } else {
      const skip = (page - 1) * pageSize;
      movies$.then((data) => {
        const moviesDisplayed = data.slice(skip, skip + pageSize);
        setMovies(moviesDisplayed);
      });
    }
  };

  const handleFilterChange = (value) => {
    if (value === "all categories") {
      return fetchData();
    } else {
      const filteredMovies = movies.filter((movie) => {
        return movie.category.toLowerCase() === value.toLowerCase();
      });
      setMovies(filteredMovies);
    }
  };

  let renderFilters;
  if (!isLoading) {
    renderFilters = categories.map((category, index) => {
      return (
        <Option value={category.toLowerCase()} key={index}>
          {category}
        </Option>
      );
    });
  }

  const updateCategories = (movies) => {
    let categories = [];
    const copy = [...movies];
    categories.push("All categories");
    for (let i = 0; i < copy.length; i++) {
      if (!categories.includes(copy[i].category)) {
        categories.push(copy[i].category);
      }
    }
    setCategories(categories);
    setIsLoading(false);
  };

  // Confirm delete of movie
  function showConfirm(id) {
    confirm({
      title: "Voulez-vous supprimer ce film?",
      content: "Cette action est irréversible",
      onOk() {
        const filteredMovies = movies.filter((movie) => movie.id !== id);
        setMovies(filteredMovies);
        message.success("Le film a été supprimé");
      },
      onCancel() {},
    });
  }

  // Retrieve data from promise into hook
  const fetchData = () => {
    movies$.then((data) => {
      setMovies(data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (movies) updateCategories(movies);
  }, [movies]);

  let renderMovies;
  if (!isLoading) {
    renderMovies = movies.map((movie) => {
      return (
        // Card component from ant design
        <Card
          key={movie.id}
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
          <p>{movie.category}</p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Toggle like/dislike the card */}
            {!isLiked.includes(movie.id) ? (
              <FontAwesomeIcon
                icon={["fas", "thumbs-up"]}
                className={css.like}
                onClick={() => {
                  const likes = [...isLiked, movie.id];
                  setIsLiked(likes);
                }}
              />
            ) : (
              <FontAwesomeIcon
                icon={["fas", "thumbs-down"]}
                className={css.dislike}
                onClick={() => {
                  const likes = isLiked.filter((like) => like !== movie.id);
                  setIsLiked(likes);
                }}
              />
            )}

            {/* Slider Measure of likes against dislikes */}
            <div style={{ width: 115, display: "flex", alignItems: "center" }}>
              <span style={{ fontSize: 10 }}>{movie.likes}</span>

              <FontAwesomeIcon
                icon={["fas", "smile"]}
                style={{ marginLeft: 5 }}
              />
              <div style={{ width: "80%" }}>
                <Slider
                  value={movie.likes}
                  disabled={true}
                  max={movie.dislikes + movie.likes}
                />
              </div>
              <FontAwesomeIcon
                icon={["fas", "frown"]}
                style={{ marginRight: 5 }}
              />
              <span style={{ fontSize: 10 }}>{movie.dislikes}</span>
            </div>
          </div>
        </Card>
      );
    });
  }

  return (
    <div className={css.container}>
      <Layout style={layoutStyles}>
        <div
          style={{
            flexGrow: 1,
          }}
        >
          <div style={{ marginLeft: 10 }}>
            {!isLoading && (
              <Select
                defaultValue="select a category"
                style={{ width: 170 }}
                onChange={handleFilterChange}
              >
                {renderFilters}
              </Select>
            )}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {renderMovies}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 30,
          }}
        >
          <Pagination
            current={currentPage || 1}
            pageSizeOptions={[4, 8, 12]}
            pageSize={pageSize || 12}
            total={12}
            showSizeChanger={true}
            onChange={(page, pageSize) => {
              setCurrentPage(page);
              setPageSize(pageSize);
              handlePageChange(page, pageSize);
            }}
          ></Pagination>
        </div>
      </Layout>
    </div>
  );
};

export default Home;
