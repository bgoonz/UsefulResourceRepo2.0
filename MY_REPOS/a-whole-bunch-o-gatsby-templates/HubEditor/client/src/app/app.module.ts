import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MonacoEditorModule } from 'ngx-monaco';
import { TreeModule } from 'angular-tree-component';

import { reducers } from './store';
import { Effects } from './store/effects';

import { AppComponent } from './app.component';
import { LoadReposComponent } from './components/load-repos/load-repos.component';
import { ViewRepoComponent } from './components/view-repo/view-repo.component';

import { RepoService } from './services/repo.service';

import { AppRoutes } from './app.routes';
import { FileExplorerComponent } from './components/file-explorer/file-explorer.component';
import { CodeEditorComponent } from './components/code-editor/code-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadReposComponent,
    ViewRepoComponent,
    FileExplorerComponent,
    CodeEditorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(AppRoutes),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(Effects),
    MonacoEditorModule.forRoot(),
    TreeModule
  ],
  providers: [RepoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
