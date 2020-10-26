import React, { useState, useEffect, useRef } from "react";
import "./App.scss";
import Header from "./components/Header";
import Search from "./components/Search";
import Gallery from "./components/Gallery";
import DataError from "./components/DataError";

function App() {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState([""]);
  const [page, setPage] = useState(1);

  const loaderRef = useRef();

  useEffect(() => {
    setData(query);
  }, [query]);

  useEffect(() => {
    window.addEventListener("scroll", showMorePictures);
  }, [page, query]);

  const showMorePictures = async (e) => {
    const {
      scrollTop,
      scrollHeight,
      clientHeight,
    } = e.path[1].document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 1) {
      showLoading();
    }
  };

  const showLoading = () => {
    const loader = loaderRef.current.classList;
    loader.add("open");

    setTimeout(() => {
      loader.remove("open");

      setTimeout(() => {
        setPage(page + 1);
        setData(query);
      }, 300);
    }, 1000);
  };

  const setData = async (queryWord) => {
    const api = "https://api.unsplash.com/search/photos";
    const clietId = "2kNZqP1DiER5-WGIGGzPtuv5oVJRriAUzZvqznmFtRM";

    try {
      const res = await fetch(
        `${api}?page=${page}&query=${queryWord}&per_page=10&client_id=${clietId}`
      );
      const data = await res.json();
      setPhotos([...photos, ...data.results]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <Header />
      <Search query={query} setQuery={setQuery} />
      <DataError />
      <Gallery photos={photos} />
      <div ref={loaderRef} className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default App;
