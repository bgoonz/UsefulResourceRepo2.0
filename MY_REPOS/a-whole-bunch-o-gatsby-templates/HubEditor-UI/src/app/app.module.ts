import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './store';
import { LoadReposEffects } from './store/effects/load-repos.effects';
import { LoadRepoContentEffects } from './store/effects/repo-content.effects';

import { AppComponent } from './app.component';
import { LoadReposComponent } from './components/load-repos/load-repos.component';
import { ViewRepoComponent } from './components/view-repo/view-repo.component';

import { RepoService } from './services/repo.service';

import { AppRoutes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    LoadReposComponent,
    ViewRepoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(AppRoutes),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([LoadReposEffects, LoadRepoContentEffects])
  ],
  providers: [RepoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
