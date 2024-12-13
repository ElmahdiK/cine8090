export class Movie {
  [x: string]: any;
  id!: number;
  title!: string;
  overview!: string;
  poster_path!: string;
  backdrop_path!: string;
  release_date!: Date;
}

export interface MovieAPIResponse {
  results: Movie[];
  total_results: number;
  total_pages: number;
}