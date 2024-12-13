import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Movie } from "../../models/movie.model";
import { MovieService } from "../../services/movie.service";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Component({
  selector: "app-single-movie-card",
  templateUrl: "./single-movie-card.component.html",
  styleUrls: ["./single-movie-card.component.scss"],
})
export class SingleMovieCardComponent implements OnInit {
  movieCard!: Movie;
  IMG_URL: string = `https://image.tmdb.org/t/p/w500`;
  movieTrailerKey: SafeResourceUrl | undefined;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    // un snapshot est un aperçu instantané d'une valeur qui change au cours du temps
    const movieId = +this.route.snapshot.params["id"]; // Ajouter le "+" au début de l'expression permet de cast (changer le type d'une variable) une string de nombres en number

    const movieInfos = this.movieService.getMovieById(movieId);

    this.movieService.getMovieTrailerById(movieId).subscribe((data) => {
      const trailer = data.results.find(
        (video: any) => video.type === "Trailer"
      );
      if (trailer)
        this.movieTrailerKey = this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://www.youtube.com/embed/${trailer.key}`
        );

      this.movieCard = {
        id: movieInfos.id,
        title: movieInfos.title,
        overview: movieInfos.overview,
        poster_path: this.movieService.IMG_URL + movieInfos.poster_path,
        backdrop_path: movieInfos.backdrop_path
          ? this.movieService.IMG_URL + movieInfos.backdrop_path
          : "",
        release_date: movieInfos.release_date!,
      };
    });
  }
}
