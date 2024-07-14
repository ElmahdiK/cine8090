import { Component, OnInit } from '@angular/core';
import { MovieCard } from '../models/movie-card.model';
import { MovieCardsService } from '../services/movie-cards.service';
import { environment } from '../../environments/environment';
import { from, Observable } from 'rxjs';

@Component({
  selector: 'app-movie-card-list',
  templateUrl: './movie-card-list.component.html',
  styleUrls: ['./movie-card-list.component.scss'],
})
export class MovieCardListComponent implements OnInit {
  movieCards: MovieCard[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  IMG_URL: string = `https://image.tmdb.org/t/p/w500`;

  constructor(private movieCardsService: MovieCardsService) {
    // this.totalPages = this.movieCardsService.TOTAL_PAGES;
    // console.log(this.totalPages);
  }

  ngOnInit(): void {
    // this.movieCardsService.getData(this.currentPage).subscribe((data) => {
    //   this.movieCards = [];
    //   data.results.forEach((item: MovieCard) => this.loadMovie(item));
    //   this.totalPages = data.total_pages;
    // });
    this.movieCards = this.movieCardsService.movieCards;
    this.totalPages = this.movieCardsService.totalPages;
  }

  loadMovie(item: MovieCard) {
    this.movieCards.push({
      id: item.id,
      title: item.title,
      overview: item.overview,
      poster_path: this.IMG_URL + item.poster_path,
      backdrop_path: this.IMG_URL + item.backdrop_path,
      release_date: new Date(item.release_date),
    });
  }

  onNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      // this.movieCards = this.movieCardsService.getListMovies(this.currentPage);
      this.movieCardsService.getData(this.currentPage).subscribe((data) => {
        this.movieCards = [];
        data.results.forEach((item: MovieCard) => this.loadMovie(item));
      });
    }
  }

  onPreviewPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.movieCardsService.getData(this.currentPage).subscribe((data) => {
        this.movieCards = [];
        data.results.forEach((item: MovieCard) => this.loadMovie(item));
      });
      // this.movieCards = this.movieCardsService.getListMovies(this.currentPage);
    }
  }
}
