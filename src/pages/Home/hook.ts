import { getMoviesByCategory, request, searchMoviesByName } from "@/services";
import { useEffect, useState } from "react";

const useMovies = () => {
  const [previousCategory, setPreviousCategory] = useState("now_playing");
  const [currentCategory, setCurrentCategory] = useState("now_playing");
  const [currentSearchKey, setCurrentSearchKey] = useState("");
  const [displayData, setDisplayData] = useState([]);
  const [display, setDisplay] = useState("grid");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    now_playing: {
      page: 0,
      totalPages: 0,
      data: [],
    },
    top_rated: {
      page: 0,
      data: [],
    },
    search: {
      page: 0,
      data: [],
    },
  });

  const toggleDisplay = () => {
    setDisplay((c) => (c === "grid" ? "list" : "grid"));
  };
  const toggleLoading = () => {
    setLoading((c) => !c);
  };
  const getMovies = async function ({
    categoryName = "",
    searchKey = "",
    page = 1,
  }) {
    setLoading(true);
    if (searchKey) {
      const res = await searchMoviesByName(searchKey, page);
      if (res && res.success) {
        let updatedData = (data as any).search.data.concat(res.results);
        if (searchKey !== currentSearchKey) {
          setCurrentSearchKey(searchKey);
          updatedData = res.results;
        }
        setData((c) => ({
          ...c,
          search: {
            page,
            data: updatedData,
            totalPage: res.total_pages,
          },
        }));
        setPreviousCategory(currentCategory);
        setCurrentCategory("search");
        setDisplayData(updatedData);
      } else {
        setError({
          stamp: Date.now(),
          message:
            res && res.status_message
              ? res.status_message
              : "Something went wrong",
        });
      }
      setLoading(false);
      return;
    }
    if (categoryName) {
      const res = await getMoviesByCategory(categoryName, page);
      if (res && res.success) {
        const updatedData = (data as any)[categoryName].data.concat(
          res.results
        );
        setData((c) => ({
          ...c,
          [categoryName]: {
            page,
            data: updatedData,
            totalPage: res.total_pages,
          },
        }));
        setDisplayData(updatedData);
      } else {
        setError({
          stamp: Date.now(),
          message:
            res && res.status_message
              ? res.status_message
              : "Something went wrong",
        });
      }
      setPreviousCategory(currentCategory);
      setCurrentCategory(categoryName);
      setCurrentSearchKey("");
      setLoading(false);
      return;
    }
    setLoading(false);
    setCurrentCategory(previousCategory);
    setDisplayData((data as any)[previousCategory].data);
  };
  const changeCategory = (categoryName: string) => {
    if (!(data as any)[categoryName].page) {
      setLoading(true);
      getMovies({ categoryName, page: 1 });
    } else {
      setDisplayData((data as any)[categoryName].data);
    }
    setCurrentSearchKey("");
    setCurrentCategory(categoryName);
  };
  const searchMovies = (searchKey: string) => {
    getMovies({ searchKey });
  };
  const loadMore = () => {
    const currentCategoryInfo = data[currentCategory];
    getMovies({
      searchKey: currentSearchKey,
      categoryName: currentCategory,
      page: currentCategoryInfo.page + 1,
    });
  };

  useEffect(() => {
    document.title = "Home";
    getMovies({
      categoryName: "now_playing",
      page: 1,
    });
  }, []);

  return {
    error,
    display,
    loading,
    displayData,
    currentCategory,
    loadMore,
    getMovies,
    searchMovies,
    toggleDisplay,
    toggleLoading,
    changeCategory,
  };
};

export { useMovies };
