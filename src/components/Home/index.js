import React, { useState, useEffect } from "react";
import css from "./index.module.css";
import Layout from "../shared/Layout/index";
import MovieCard from "../Card/index";
import RecursiveText from "../RecursiveText/index";
import Dechire from "../../assets/img/dechire.svg";
import { movies$ } from "../../assets/data/movies.js";
import "antd/dist/antd.css";
import { message, Modal, Select, Pagination } from "antd";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMinusSquare,
  faThumbsUp,
  faThumbsDown,
  faSmile,
  faFrown,
} from "@fortawesome/free-solid-svg-icons";
library.add(faMinusSquare, faThumbsUp, faThumbsDown, faSmile, faFrown);

const { confirm } = Modal;
const { Option } = Select;

const layoutStyles = {
  display: "flex",
  flexDirection: "column",
  minHeight: 379,
};

const Home = () => {
  // movies state stocks all the data
  const [movies, setMovies] = useState();
  // filteredMovies state serves to process the data w/o losing the count of all the data
  const [filteredMovies, setFilteredMovies] = useState();
  // displayedMovies state is actually the list of elements to display on the screen
  const [displayedMovies, setDisplayedMovies] = useState();
  // isLiked state stocks the movies that were liked by the user
  const [isLiked, setIsLiked] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // categories state tracks dynamically the available filters
  const [categories, setCategories] = useState([]);
  // for pagination
  const [pageSize, setPageSize] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  // set the movies to be displayed conditionnaly to the pagination
  const handlePageChange = (page, pageSize) => {
    if (!filteredMovies) {
      if (page === 1) {
        const displayedMovies = movies.slice(0, pageSize);
        setDisplayedMovies(displayedMovies);
      } else {
        const skip = (page - 1) * pageSize;
        const displayedMovies = movies.slice(skip, skip + pageSize);
        setDisplayedMovies(displayedMovies);
      }
    } else {
      if (page === 1) {
        const displayedMovies = filteredMovies.slice(0, pageSize);
        setDisplayedMovies(displayedMovies);
      } else {
        const skip = (page - 1) * pageSize;
        const displayedMovies = filteredMovies.slice(skip, skip + pageSize);
        setDisplayedMovies(displayedMovies);
      }
    }
  };

  // set the movies to be displayed conditionnaly to the filters
  const handleFilterChange = (value) => {
    if (value === "all categories") {
      setFilteredMovies(movies);
      if (currentPage === 1) {
        const displayedMovies = movies.slice(0, pageSize);
        setDisplayedMovies(displayedMovies);
      } else {
        const skip = (currentPage - 1) * pageSize;
        const displayedMovies = movies.slice(skip, skip + pageSize);
        setDisplayedMovies(displayedMovies);
      }
    } else {
      const filterMovies = movies.filter((movie) => {
        return movie.category.toLowerCase() === value.toLowerCase();
      });
      setFilteredMovies(filterMovies);
      if (currentPage === 1) {
        const displayedMovies = filterMovies.slice(0, pageSize);

        setDisplayedMovies(displayedMovies);
      } else {
        const skip = (currentPage - 1) * pageSize;
        const displayedMovies = filterMovies.slice(skip, skip + pageSize);

        setDisplayedMovies(displayedMovies);
      }
    }
  };

  // Create the DOM list of filter options
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

  // Manage the list of categories from the movies available
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
      setDisplayedMovies(data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (movies) {
      updateCategories(movies);
      setDisplayedMovies(movies);
    }
  }, [movies]);

  let renderMovies;
  if (!isLoading) {
    renderMovies = displayedMovies.map((movie) => {
      return (
        <MovieCard
          movie={movie}
          showConfirm={showConfirm}
          isLiked={isLiked}
          setIsLiked={setIsLiked}
          key={movie.id}
        />
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
          <div
            style={{
              marginLeft: 10,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {!isLoading && (
              <Select
                defaultValue="select a category"
                style={{ width: 170 }}
                onChange={handleFilterChange}
              >
                {renderFilters}
              </Select>
            )}
            <div style={{ width: 250, display: "flex", alignItems: "center" }}>
              {!isLoading && <RecursiveText />}
            </div>
          </div>
          <div className={css.renderMovies_container} style={{ marginTop: 35 }}>
            {renderMovies}
          </div>
        </div>
        <div className={css.pagination_container} style={{ marginTop: 30 }}>
          <Pagination
            current={currentPage || 1}
            pageSizeOptions={[4, 8, 12]}
            pageSize={pageSize || 12}
            total={filteredMovies ? filteredMovies.length : movies?.length}
            showSizeChanger={true}
            onChange={(page, pageSize) => {
              setCurrentPage(page);
              setPageSize(pageSize);
              handlePageChange(page, pageSize);
            }}
          ></Pagination>
        </div>
      </Layout>
      <img src={Dechire} alt="torn effect" className={css.effect} />
    </div>
  );
};

export default Home;
