import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import "./App.scss";
import Header from "./components/Header";
import Search from "./components/Search";
import Gallery from "./components/Gallery";
import DataError from "./components/DataError";
import Loader from "./components/Loader";

function App() {
  const [photos, setPhotos] = useState([]);
  const [tags, setTags] = useState([]);
  const [query, setQuery] = useState("");
  const [hasMorePages, setHasMorePages] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    if (query) {
      fetchData();
    }
  }, [query]);

  const fetchData = async () => {
    const api = "https://api.unsplash.com/search/photos";
    const accessKey = process.env.REACT_APP_ACCESSKEY;

    try {
      const res = await fetch(
        `${api}?page=${pageNumber}&query=${query}&per_page=10&client_id=${accessKey}`
      );
      console.log(res);
      const data = await res.json();
      console.log(data);

      if (data.total_pages > 1) {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
        setHasMorePages(true);
      } else {
        setPageNumber(1);
      }
      getTags(data.results);
      setPhotos([...photos, ...data.results]);
    } catch (error) {
      console.log(error);
    }
  };

  const getTags = (array) => {
    const pickTitleNames = array
      .map((photo, i) => {
        const titles = photo.tags
          .map((tag) => tag)
          .map((item) => {
            const valuesArray = Object.entries(item).filter(
              ([key]) => key === "title"
            );
            return valuesArray;
          })
          .join()
          .split(",")
          .filter((el) => el !== "title");
        return titles;
      })
      .join()
      .split(",");
    const namesForTags = [...new Set(pickTitleNames)];

    let threeUniqueTags = [];
    let lastTag = "";

    function randomTags() {
      const randomNumber = Math.floor(Math.random() * namesForTags.length);
      let curTag = namesForTags[randomNumber];

      if (curTag === lastTag) {
        return randomTags();
      }

      lastTag = curTag;
      threeUniqueTags.push(curTag);
    }
    for (let i = 0; i < 3; i++) {
      randomTags();
    }
    return setTags(threeUniqueTags);
  };

  return (
    <div className="App">
      <Header />
      <Search
        photos={photos}
        setPhotos={setPhotos}
        query={query}
        setQuery={setQuery}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        tags={tags}
        setTags={setTags}
      />
      <DataError />
      <InfiniteScroll
        dataLength={photos.length}
        next={fetchData}
        hasMore={hasMorePages}
        loader={<Loader />}
      >
        <Gallery photos={photos} />
      </InfiniteScroll>
    </div>
  );
}

export default App;
