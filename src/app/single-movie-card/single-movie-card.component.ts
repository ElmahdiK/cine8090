import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieCard } from '../models/movie-card.model';
import { MovieCardsService } from '../services/movie-cards.service';

@Component({
  selector: 'app-single-movie-card',
  templateUrl: './single-movie-card.component.html',
  styleUrls: ['./single-movie-card.component.scss'],
})
export class SingleMovieCardComponent implements OnInit {
  movieCard!: MovieCard;

  constructor(
    private movieCardsService: MovieCardsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // un snapshot est un aperçu instantané d'une valeur qui change au cours du temps
    const movieCardId = +this.route.snapshot.params['id']; // Ajouter le "+" au début de l'expression permet de cast (changer le type d'une variable) une string de nombres en number
    console.log('id', movieCardId);
    console.log(this.movieCardsService.movieCards);

    this.movieCard = this.movieCardsService.getMovieCardById(movieCardId);
    // if (this.movieCardsService.movieCards.length === 0) {
    //   console.log('movieCards data not loaded, so do it !');
    //   this.movieCardsService.getContent().then((d) => {
    //     this.movieCardsService.movieCards = d;
    //     setTimeout(
    //       () =>
    //         (this.movieCard =
    //           this.movieCardsService.getMovieCardById(movieCardId)),
    //       100
    //     );
    //   });
    // } else {
    //   console.log('movieCards data already assigned ;)))');
    //   this.movieCard = this.movieCardsService.getMovieCardById(movieCardId);
    // }
  }
}
