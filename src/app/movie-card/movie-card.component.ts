import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieCard } from '../models/movie-card.model';
import { MovieCardsService } from '../services/movie-cards.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  @Input() movieCard!: MovieCard;

  constructor(
    private movieCardsService: MovieCardsService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onViewMovieCard() {
    // this.movieCardsService.currentPage=12;
    this.router.navigateByUrl(`moviecards/${this.movieCard.id}`);
  }
}
