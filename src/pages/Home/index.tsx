import { useEffect } from "react";

import Card from "@/components/Card";
import Spinner from "@/components/Spinner";
import SearchBar from "@/components/SearchBar";
import styles from "./styles.module.scss";

import { useMovies } from "./hook";
import { useToast } from "@/hooks/useToast";
import { usePullToRefresh } from "@/hooks/usePullToRefresh";

const categories = [
  {
    id: "now_playing",
    title: "Now Playing",
  },
  {
    id: "top_rated",
    title: "Top Rated",
  },
];

function Home() {
  const {
    error,
    display,
    loading,
    displayData,
    currentCategory,
    loadMore,
    searchMovies,
    toggleDisplay,
    changeCategory,
  } = useMovies();

  const { createPullElement } = usePullToRefresh();
  const { createToastElement } = useToast(error);

  const renderCard = () => {
    let cardWrapperClass =
      "gap-2 px-2 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 ";
    let loadMoreWrapperClass = "lg:col-span-4 md:col-span-3 sm:col-span-2";
    if (display !== "grid") {
      cardWrapperClass = "gap-2 px-2 grid-cols-1 ";
      loadMoreWrapperClass = "col-span-1";
    }
    cardWrapperClass += styles.cardContainer;
    return (
      <div className={cardWrapperClass}>
        {displayData.map((item: any) => (
          <div className="mb-4" key={item.id}>
            <Card data={item} type={display} />
          </div>
        ))}
        <div
          className={`flex items-center justify-center w-full py-2 ${loadMoreWrapperClass}`}
        >
          {loading ? (
            <Spinner />
          ) : (
            <div className="text-blue-300" onClick={loadMore}>
              Load more
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderCategories = () => {
    return categories.map((category) => {
      let bgStyle = "";
      if (category.id === currentCategory) bgStyle = "bg-gray-300";
      return (
        <li onClick={() => changeCategory(category.id)} key={category.id}>
          <div
            className={`p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-300 ${bgStyle}`}
          >
            <span className="ml-3">{category.title}</span>
          </div>
        </li>
      );
    });
  };

  if (loading && !displayData.length) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      {createPullElement()}
      {createToastElement()}
      <div className="flex relative min-h-screen">
        <div className="w-40 h-full lg:w-64 md:w-48 sm:w-40 shrink hidden lg:block md:block sm:hidden">
          <aside
            className="w-40 h-full lg:w-64 md:w-48 sm:w-40 absolute top-0 left-0 pt-4"
            aria-label="Sidebar"
          >
            <div className="h-full overflow-y-auto py-4 px-3 bg-gray-200 rounded dark:bg-gray-800">
              <ul className="space-y-2">{renderCategories()}</ul>
            </div>
          </aside>
        </div>
        <div className="flex-1">
          <div className="px-2 py-4">
            <div className="flex top-0 sticky items-center">
              <div className="flex-1">
                <SearchBar
                  placeholder="Search movies..."
                  onSearch={searchMovies}
                />
              </div>
              <div
                className="ml-3 p-3 border-slate-300 border rounded"
                onClick={toggleDisplay}
              >
                <img
                  className=""
                  width={25}
                  height={25}
                  src={`./${display}.svg`}
                />
              </div>
            </div>
          </div>
          {renderCard()}
        </div>
      </div>
    </>
  );
}

export default Home;
