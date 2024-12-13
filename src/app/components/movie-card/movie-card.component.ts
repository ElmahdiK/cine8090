import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  @Input() movieCard!: Movie;

  constructor(
   // private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onViewMovieCard() {
    // this.movieService.currentPage=12;
    this.router.navigateByUrl(`moviecards/${this.movieCard.id}`);
  }
}
