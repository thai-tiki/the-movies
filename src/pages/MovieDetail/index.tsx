import { useParams } from "react-router-dom";

import Spinner from "@/components/Spinner";

import { useMovie } from "./hooks";
import { useToast } from "@/hooks/useToast";
import { Image } from "@/components/Image";
import { usePullToRefresh } from "@/hooks/usePullToRefresh";

const MovieDetail = ({}) => {
  const params = useParams();
  const { createPullElement } = usePullToRefresh();

  const { data, loading, productionInfo, genres, error } = useMovie(params?.id);
  const { createToastElement } = useToast(error);
  if (loading) {
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
      {!data ? (
        <div className="flex flex-col items-center justify-center min-h-screen text-gray-300 text-6xl uppercase">
          <div>404</div>
          <div>Movie not found</div>
        </div>
      ) : (
        <div className="p-2 px-10 bg-gray-800 min-h-screen">
          <h2 className="text-orange-400 py-2 font-medium text-2xl">
            {data.title}
          </h2>
          <div className="grid grid-cols-6 pt-2">
            <div className="col-span-2">
              <Image
                src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
                className="rounded"
                alt=""
              />
            </div>
            <div className="col-span-4 pl-4 bg-slate-100 rounded-r pr-10 pt-4">
              <div>{genres}</div>
              <div className="py-2 font-medium text-lg">{productionInfo}</div>
              <div className="flex pb-2">
                <div className="font-bold">Status</div>
                <div>{": " + data.status}</div>
              </div>
              <div className="flex pb-2">
                <div className="font-bold">Release</div>
                <div>{": " + data.release_date}</div>
              </div>
              <div className="flex pb-2">
                <div className="font-bold">Rating</div>
                <div>{": " + data.vote_average}</div>
                <div>{`(${data.vote_count})`}</div>
              </div>
              <div className="text-orange-300 font-medium text-lg">Plot</div>
              <div className="text-justify">{data.overview}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetail;
