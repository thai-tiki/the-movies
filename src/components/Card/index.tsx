import { Link } from "react-router-dom";

import styles from "./styles.module.scss";
import { Image } from "@/components/Image";

export interface Dates {
  maximum: Date;
  minimum: Date;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: OriginalLanguage;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export enum OriginalLanguage {
  De = "de",
  En = "en",
  Es = "es",
  Vi = "vi",
}

type Props = {
  data: Movie;
  type: string;
};

const Card = ({ data, type }: Props) => {
  if (type === "grid")
    return (
      <Link to={`/movie/${data.id}`} type="div" className="flex justify-center">
        <div className="rounded-lg shadow-lg bg-white max-w-sm">
          <a href="#!">
            <Image
              src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
              className="rounded-t-lg"
              alt=""
            />
          </a>
          <div className="p-6">
            <h5
              className={`text-gray-900 text-xl font-medium mb-2 ${styles.cardTitle}`}
            >
              {data.title}
            </h5>
            <p
              title={data.overview}
              className={`text-gray-700 text-base ${styles.cardContent}`}
            >
              {data.overview}
            </p>
          </div>
        </div>
      </Link>
    );

  return (
    <Link to={`/movie/${data.id}`} type="div" className="w-full p-1">
      <div className="flow-root w-full">
        <ul role="list" className="divide-y w-full">
          <li className="py-2 sm:py-1">
            <div className="flex items-center space-x-4 w-full">
              <div className="w-32 shrink">
                <Image
                  src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
                  className="rounded"
                  alt=""
                />
              </div>
              <div className="flex-1">
                <p className="text-lg font-medium text-gray-900 dark:text-white">
                  {data.title}
                </p>
                <p className={`text-gray-500 text-base ${styles.cardContent}`}>
                  {data.overview}
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </Link>
  );
};

export default Card;
