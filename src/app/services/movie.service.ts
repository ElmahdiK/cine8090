import { Injectable } from "@angular/core";
import { Movie, MovieAPIResponse } from "../models/movie.model";
import { HttpClient } from "@angular/common/http";
import { Observable, of, tap } from "rxjs";
import { environment } from "../../environments/environment";

// le decorateur "Injectable" est la façon la plus simple pour déclarer une classe comme étant un service
// "providedIn" explique à angular que ce service doit être enregistrer à la racine "root" de l'application
// qu'il y a aura qu'une seule instance de ce service et que donc toute l'application partagera les mêmes données et la même logique
// En effet, ce sera très souvent le cas pour vos services, car ça permet de s'assurer de n'avoir qu'une seule instance du service, partagée par tous les partis intéressés.
@Injectable({
  providedIn: "root",
})
export class MovieService {
  API_KEY: string = environment.apiKey;
  BASE_URL: string = `https://api.themoviedb.org/3`;
  PARAMS: string = `with_genres=16&with_companies=3&language=fr-FR&primary_release_date.gte=1920-01-01&primary_release_date.lte=2024-12-31&sort_by=primary_release_date.asc`;
  endpointURL: string = `${this.BASE_URL}/discover/movie?api_key=${this.API_KEY}&${this.PARAMS}`;

  movieDB: any = [];
  IMG_URL: string = `https://image.tmdb.org/t/p/w500`;

  currentPage: number = 1;
  totalResultats: number = 1;
  totalPages: number = 1;

  constructor(private http: HttpClient) {}

  getMoviesByPage(page: number): Observable<any> {
    return this.http.get<MovieAPIResponse>(`${this.endpointURL}&page=${page}`);
  }

  getMovieTrailerById(movie_id: number): Observable<any> {
    return this.http.get<any>(
      `${this.BASE_URL}/movie/${movie_id}/videos?api_key=${this.API_KEY}&language=fr-FR`
    );
  }

  getMovieById(movie_id: number): Movie {
    const movie = this.movieDB[this.currentPage - 1].find(
      (movieCard: any) => movieCard.id === movie_id
    );
    if (!movie) throw new Error("Movie not found!");
    return movie;
  }
}
