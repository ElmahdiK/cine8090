import { Component, OnInit } from "@angular/core";
import { Movie } from "../../models/movie.model";
import { MovieService } from "../../services/movie.service";
import { Observable, of } from "rxjs";
import { concatMap } from "rxjs/operators";

@Component({
  selector: "app-movie-card-list",
  templateUrl: "./movie-card-list.component.html",
  styleUrls: ["./movie-card-list.component.scss"],
})
export class MovieCardListComponent implements OnInit {
  movieCards: Movie[] = [];
  totalResultats: number = 0;
  totalPages: number = 1;
  currentPage: number = 1;
  page: number = 1;

  constructor(private movieService: MovieService) {}

  loadMovies(totalPage: number): Observable<any> {
    return of(...Array.from({ length: totalPage - 1 }, (_, i) => i + 2)) // Crée un Observable des pages à récupérer
      .pipe(concatMap((i) => this.movieService.getMoviesByPage(i)));
  }

  ngOnInit(): void {
    if (!this.movieService.movieDB.length) {
      console.log("service called");

      this.movieService
        .getMoviesByPage(this.movieService.currentPage)
        .subscribe((data) => {
          this.totalPages = this.movieService.totalPages = data.total_pages;
          this.totalResultats = this.movieService.totalResultats =
            data.total_results;

          this.movieService.movieDB.push(data.results);
          this.viewPage(this.currentPage - 1);

          this.loadMovies(this.totalPages).subscribe((data) => {
            this.movieService.movieDB.push(data.results);
          });
        });
    } else {
      this.currentPage = this.movieService.currentPage;
      this.totalPages = this.movieService.totalPages;
      this.totalResultats = this.movieService.totalResultats;
      this.viewPage(this.currentPage - 1);
    }
  }

  navigatePage(increment: number) {
    const newPage = this.movieService.currentPage + increment;
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.movieService.currentPage = newPage;
      this.currentPage = newPage;
      this.viewPage(this.currentPage - 1);
    }
  }

  viewPage(numPage: number) {
    const movieData = this.movieService.movieDB[numPage];
    if (movieData) this.loadMovie(movieData);
  }
  onNextPage() {
    this.navigatePage(1);
  }

  onPreviewPage() {
    this.navigatePage(-1);
  }

  loadMovie(movies: any) {
    this.movieCards = [];
    movies.forEach((item: Movie) => {
      this.movieCards.push({
        id: item.id,
        title: item.title,
        overview: item.overview,
        poster_path: this.movieService.IMG_URL + item.poster_path,
        backdrop_path: this.movieService.IMG_URL + item.backdrop_path,
        release_date: new Date(item.release_date),
      });
    });
  }
}
