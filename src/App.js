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
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMorePages, setHasMorePages] = useState(false);

  useEffect(() => {
    fetchData(query);
  }, [query]);

  const fetchData = async (queryWord) => {
    const api = "https://api.unsplash.com/search/photos";
    const accessKey = process.env.REACT_APP_ACCESSKEY;

    try {
      console.log(query);
      const res = await fetch(
        `${api}?page=${pageNumber}&query=${queryWord}&per_page=10&client_id=${accessKey}`
      );
      console.log(res);
      const data = await res.json();

      setPhotos([...photos, ...data.results]);
      console.log(data.total_pages);
      setHasMorePages(data.total_pages > 1)
        ? setPageNumber(pageNumber + 1)
        : setPageNumber(1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <Header />
      <Search query={query} setQuery={setQuery} />
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
