import { getMovieById, request } from "@/services";
import { useEffect, useState } from "react";

type Company = {
  logo_path: string;
  name: string;
  id: number;
};

type Genre = {
  id: number;
  name: string;
};

const useMovie = (id: string) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [genres, setGenres] = useState("");
  const [loading, setLoading] = useState(true);
  const [productionInfo, setProductionInfo] = useState("");

  const getMovie = async function () {
    setLoading(true);
    const res = await getMovieById(id);
    if (res && res.success) {
      setData(res);
      document.title = res.title;
      setGenres(getGenreInfo(res.genres));
      setProductionInfo(getProductionInfo(res.production_companies));
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
  };

  const getProductionInfo = (companies: Company[] = []) => {
    return companies.reduce(
      (pre, c, i) => pre + c.name + (i === companies.length - 1 ? "" : " - "),
      ""
    );
  };

  const getGenreInfo = (genres: Genre[] = []) => {
    return genres.reduce(
      (pre, g, i) => pre + g.name + (i === genres.length - 1 ? "" : ", "),
      ""
    );
  };

  useEffect(() => {
    getMovie();
  }, [id]);

  return { data, loading, productionInfo, genres, error };
};

export { useMovie };
