import "../styles.css";
import Navbar from "./Navbar/Navbar";
import CardContainer from "./CardContainer";
import Spinner from "./Spinner";
import SearchSource from "./SearchSource";
import { useEffect, useRef, useState, useLayoutEffect } from "react";

var fired = false;

export default function App() {
  // const [category, setCategory] = useState("business");
  const [articles, setArticles] = useState({
    category: "business",
    country: "in",
    allArticles: [],
    articlesToDisplay: [],
    hasMore: null,
    currentPage: 1
  });

  let apiKey = process.env.API_KEY;
  // let apiKey = "0ded4179405f4b389479556faf3aa966";

  let url = `https://newsapi.org/v2/top-headlines?country=${articles.country}&category=${articles.category}&apiKey=${apiKey}`;
  let sources = [];

  async function fetchData() {

    // console.log("Initial Fetch");

    fired = true;
    let data = await fetch(url);
    let parsedData = await data.json();

    // console.log("Total Results : ", parsedData.totalResults);
    // console.log("1st Page results : ", parsedData.articles.length);

    let totalArticles = parsedData.totalResults;
    let currentArticles = parsedData.articles.length;
    let moreDataAvailable = currentArticles !== totalArticles;

    setArticles((prev) => {
      return {
        category: prev.category,
        country: prev.country,
        allArticles: parsedData.articles,
        articlesToDisplay: parsedData.articles,
        hasMore: moreDataAvailable,
        currentPage: prev.currentPage
      }
    });
  }

  async function fetchMoreData() {

    if (!articles.hasMore) {
      // console.log("Hehe im here");
      return;
    }

    // console.log("Fetching more data");

    let nextPageUrl = url + "&page=" + (articles.currentPage);
    fired = true;
    let data = await fetch(nextPageUrl);
    let parsedData = await data.json();

    if (parsedData.articles.length === 0) {
      console.log("Coming here");
      setArticles((prev) => {
        return {
          category: prev.category,
          country: prev.country,
          allArticles: [...prev.allArticles],
          articlesToDisplay: [...prev.allArticles],
          hasMore: false,
          currentPage: prev.currentPage
        }
      });
      return;
    }

    let newArticlesArray = [...articles.allArticles, ...parsedData.articles]

    let totalArticles = parsedData.totalResults;
    let currentArticles = newArticlesArray.length;
    let moreDataAvailable = currentArticles !== totalArticles;

    setArticles((prev) => {
      return {
        category: prev.category,
        country: prev.country,
        allArticles: [...prev.allArticles, ...parsedData.articles],
        articlesToDisplay: [...prev.allArticles, ...parsedData.articles],
        hasMore: moreDataAvailable,
        currentPage: prev.currentPage
      }
    });
  }

  async function fetchSources(sourceUrl) {
    let data = await fetch(sourceUrl);
    let parsedData = await data.json();
    sources = parsedData.sources;
  }

  // useEffect(() => {
  //   let sourceUrl = `https://newsapi.org/v2/top-headlines/sources?apiKey=${apiKey}`;
  //   fetchSources(sourceUrl);
  // }, [])

  useEffect(() => {
    fired = false;
  }, [articles.allArticles]);

  useEffect(() => {
    fetchData();
  }, [articles.category, articles.country]);

  const firstUpdateDone = useRef(false);
  useEffect(() => {
    if (!firstUpdateDone.current) {
      firstUpdateDone.current = true;
      return;
    }
    fetchMoreData();
  }, [articles.currentPage]);

  function handleCategoryChange(event) {
    firstUpdateDone.current = false;
    setArticles((prev) => {
      return {
        category: event.target.value.toLowerCase(),
        country: prev.country,
        allArticles: [],
        articlesToDisplay: [],
        currentPage: 1,
        hasMore: null
      }
    })
  }

  function handleCountryChange(event) {
    firstUpdateDone.current = false;
    setArticles((prev) => {
      return {
        category: prev.category,
        country: event.target.value,
        allArticles: [],
        articlesToDisplay: [],
        currentPage: 1,
        hasMore: null
      }
    })
  }

  window.addEventListener("scroll", () => {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (Math.ceil(window.scrollY) >= scrollableHeight && (fired === false)) {
      setArticles((prev) => {
        return (prev.hasMore)
          ? { ...prev, currentPage: prev.currentPage + 1 }
          : { ...prev }
      })
      fired = true;
      // setTimeout(() => {
      //   fired = false
      // }, 5000);
    }
  })

  // Search by sources
  function search(e) {
    let searchTerm = e.target.value;
    if (searchTerm === '') {
      setArticles(prev => {
        return {
          category: prev.category,
          country: prev.country,
          allArticles: prev.allArticles,
          articlesToDisplay: prev.allArticles,
          hasMore: prev.hasMore,
          currentPage: prev.currentPage
        }
      })
      return;
    }
    let filteredArticles = [];
    articles.allArticles.forEach(article => {
      if (article.author !== null) {
        let cardTitle = article.source.name.toLowerCase();
        if (cardTitle.includes(searchTerm)) {
          filteredArticles.push(article);
        };
      }
    });
    setArticles((prev) => {
      return {
        category: prev.category,
        country: prev.country,
        allArticles: prev.allArticles,
        articlesToDisplay: filteredArticles,
        hasMore: prev.hasMore,
        currentPage: prev.currentPage
      }
    });
  }

  return (
    <>
      <Navbar
        country={articles.country}
        category={articles.category}
        onCountryClick={handleCountryChange}
        onCategoryClick={handleCategoryChange}
      />
      <SearchSource search={search} />
      <div className="news-type-heading">
        <h1>{articles.category.charAt(0).toUpperCase() + articles.category.slice(1)}</h1>
        <hr></hr>
      </div>
      {(articles.allArticles.length === 0)
        ?
        <Spinner />
        :
        <CardContainer articles={articles.articlesToDisplay} />
      }
      {(articles.hasMore) && <Spinner />}
    </>
  );
}
