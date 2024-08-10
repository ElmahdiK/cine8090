import { Injectable } from "@angular/core";
import { MovieCard } from "../models/movie-card.model";
import { HttpClient } from "@angular/common/http";
import { from, Observable } from "rxjs";
import { environment } from "../../environments/environment";

// le decorateur "Injectable" est la façon la plus simple pour déclarer une classe comme étant un service

// "providedIn" explique à angular que ce service doit être enregistrer à la racine "root" de l'application
// qu'il y a aura qu'une seule instance de ce service et que donc toute l'application partagera les mêmes données et la même logique
// En effet, ce sera très souvent le cas pour vos services, car ça permet de s'assurer de n'avoir qu'une seule instance du service, partagée par tous les partis intéressés.
@Injectable({
  providedIn: "root",
})
export class MovieCardsService {
  result: MovieCard[] = [];
  API_KEY: string = environment.apiKey;
  BASE_URL: string = `https://api.themoviedb.org/3`;
  IMG_URL: string = `https://image.tmdb.org/t/p/w500`;
  //QUERY: string = `primary_release_date.gte=1980-01-01&primary_release_date.lte=1999-12-31`;

  QUERY: string = `with_companies=2&with_genres=16&primary_release_date.gte=1980-01-01&primary_release_date.lte=1999-12-31`;
  endpointURL: string = `${this.BASE_URL}/discover/movie?api_key=${this.API_KEY}&${this.QUERY}&sort_by=primary_release_date.desc`;
  movieCards: MovieCard[] = [];
  totalPages: number = 0;

  constructor(private http: HttpClient) {
    this.movieCards = [];
    this.totalPages = 0;
    this.getData().subscribe((data) => {
      data.results.forEach((item: MovieCard) => this.loadMovie(item));
      this.totalPages = data.total_pages;
    });
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

  getListMovies(page?: number) {
    this.movieCards = [];
    this.getMovies(page).then((res) => {
      res.results.forEach((item: MovieCard) => {
        this.movieCards.push({
          id: item.id,
          title: item.title,
          overview: item.overview,
          poster_path: this.IMG_URL + item.poster_path,
          backdrop_path: this.IMG_URL + item.backdrop_path,
          release_date: new Date(item.release_date),
        });
      });
    });
    return this.movieCards;
  }

  getTotalPages() {
    this.totalPages = 0;
    this.getMovies().then((res) => {
      this.totalPages = res.total_pages;
    });
    return this.totalPages;
  }

  async getMovies(page?: number): Promise<any> {
    const data = await fetch(
      page ? `${this.endpointURL}&page=${page}` : this.endpointURL
    );
    return (await data.json()) ?? [];
  }

  getData(page?: number): Observable<any> {
    return this.http.get(
      page ? `${this.endpointURL}&page=${page}` : this.endpointURL
    );
  }

  getContentMovie(): Promise<MovieCard[]> {
    return new Promise((resolve, reject) => {});
  }
  // getContent(): Promise<MovieCard[]> {
  //   return new Promise((resolve, reject) => {
  //     console.log(`ATTENTION api lancé !`);
  //     let movies: any = [];
  //     this.http.get(`${this.endpointURL}`).subscribe((data: any) => {
  //       console.log(data);
  //       this.TOTAL_PAGES = data.total_pages;

  //       for (let i = 1; i <= this.TOTAL_PAGES; i++) {
  //         this.http
  //           .get(`${this.endpointURL}&page=${i}`)
  //           .subscribe((data: any) => {
  //             data[`results`].forEach((item: any) => {
  //               // console.log(item);
  //               movies.push({
  //                 id: item.id,
  //                 title: item.title,
  //                 overview: item.overview,
  //                 poster_path: this.IMG_URL + item.poster_path,
  //                 backdrop_path: this.IMG_URL + item.backdrop_path,
  //                 release_date: new Date(item.release_date),
  //               });
  //             });
  //           });
  //         if (i === this.TOTAL_PAGES) {
  //           console.log(i, 'api terminé');
  //           resolve(movies);
  //         }
  //       }
  //     });
  //   });
  // }

  getPageContents(fromPage = 1) {
    return this.movieCards.slice(fromPage * 20 - 20, fromPage * 20);
  }

  // getTotalPages(): number {
  //   return this.TOTAL_PAGES;
  // }
  /*
        getContent(page=1) {
            let movies:any=[];
            return this.http.get(`${this.endpointURL}&page=${page}`).subscribe((data: any) => {
                data[`results`].forEach((item: any) => {
                    this.movieCards.push({
                        id: item.id,
                        title: item.title,
                        overview: item.overview,
                        poster_path: environment.IMG_URL + item.poster_path,
                        backdrop_path: environment.IMG_URL + item.backdrop_path,
                        release_date: new Date(item.release_date)
                    });
                    return this.movieCards;
                })
            })
        }
    */
  getAllMovieCards(page = 1) {
    return this.http.get(`${this.endpointURL}&page=${page}`);
    /*
                .toPromise()
                .then(
                    (res: any) => {
                        this.result = res.results.map((item: any) => {
                            this.movieCards.push({
                                id:item.id,
                                title:item.title,
                                overview:item.overview,
                                poster_path:environment.IMG_URL + item.poster_path,
                                backdrop_path:environment.IMG_URL + item.backdrop_path,
                                release_date:new Date(item.release_date)
                            });
                        })
                        console.log(this.movieCards);
                        resolve();
                    }, msg => reject());
        })*/
  }

  /*
        getAllMovieCards(): MovieCard[] {
            console.log("bon ok", this.movieCards)
            return this.movieCards;
        }*/

  getMovieCardById(movieCardId: number): MovieCard {
    console.log("ok", movieCardId, this.movieCards);

    const movieCard = this.movieCards.find(
      (movieCard) => movieCard.id === movieCardId
    );
    if (!movieCard) throw new Error("MovieCard not found!");
    else return movieCard;
  }

  /*
        getAllMovies() {
            // Create an Observable out of a promise
            const data = from(fetch(this.endpointURL));
            // Subscribe to begin listening for async result
            data.subscribe({
                next(response) { console.log(response.body); },
                error(err) { console.error('Error: ' + err); },
                complete() { console.log('Completed'); }
            });
            return "ok";
    
            //return this.http.get<any>(this.endpointURL);
        }
        */
  /*
    getAll() {
        console.log(this.endpointURL);
        return new Observable<any>((observer) => {
            this.http.get(this.endpointURL, { withCredentials: true }).subscribe((result: any) => {
                const movieCardList = [];
                //console.log("res", result);
                for (const element of result) {
                    console.log(element);
                    movieCardList.push({
                        id: element.id,
                        title: element.title,
                        description: element.overview,
                        imageUrl: this.IMG_URL + element.poster_path,
                        imageUrlBack: this.IMG_URL + element.backdrop_path,
                        releasedDate: new Date(element.release_date)
                    })
                }
                observer.next(movieCardList);
                observer.complete();
            }, error => {
                observer.error(error);
                observer.complete();
            })
        })
        //let movies: any = [];
        //for (let i = 1; i <= 1; i++) {
        // &page=${i}
        // this.http.get<any>(`${this.API_URL}&page=${num_page}`).subscribe(data => {

        // 1. HTTP Get request from EmpService 
        // 2. Receive the obersable and cast it into an moviecard array
        /*
        this.http.get<any>()
            .subscribe(data => {
                this.TOTAL_PAGES = (data.total_pages)
                data[`results`].forEach((element: any) => {
                    // console.log(element);
                    //if (element.poster_path){
                    movies.push({
                        id: element.id,
                        title: element.title,
                        description: element.overview,
                        imageUrl: this.IMG_URL + element.poster_path,
                        imageUrlBack: this.IMG_URL + element.backdrop_path,
                        releasedDate: new Date(element.release_date)
                    })
                    //}
                });
                //this.movieCards = movies;
            });
            */
  // }
  // return movies;
  //}

  /*
    getPageCurrent(): number {
        return this.NUM_PAGE;
    }

    getPageTotal(): number {
        return this.TOTAL_PAGES;
    }
*/
  /*
    getAllMovieCards(num_page: number): MovieCard[] {
        return this.movieCards;
    }

    getMovieCardById(movieCardId: number): MovieCard {
        console.log("hi", this.movieCards);
        const movieCard = this.movieCards.find(movieCard => movieCard.id === movieCardId);
        if (!movieCard) throw new Error('MovieCard not found!');
        else return movieCard;
    }*/
}
