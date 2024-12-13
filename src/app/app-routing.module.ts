import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MovieCardListComponent } from "./components/movie-card-list/movie-card-list.component";
import { LandingPageComponent } from "./components/landing-page/landing-page.component";
import { Injectable } from "@angular/core";
import { SingleMovieCardComponent } from "./components/single-movie-card/single-movie-card.component";
import { AboutComponent } from "./components/about/about.component";
import { ContactComponent } from "./components/contact/contact.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";


const routes: Routes = [
    { path: 'moviecards/:id', component: SingleMovieCardComponent },
    { path: 'moviecards', component: MovieCardListComponent },

    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },

    { path: '', component: LandingPageComponent },
    { path: '**', component: NotFoundComponent }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})

@Injectable({
    providedIn: 'root'
})

export class AppRoutingModule {}