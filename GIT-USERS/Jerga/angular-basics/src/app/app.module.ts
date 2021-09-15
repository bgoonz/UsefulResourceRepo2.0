import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { ResourceModule } from './resource/resource.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';

const routes: Routes = [
  { path: '', redirectTo: 'resources', pathMatch: 'full' },
];

@NgModule({
  // The set od components, directives, pipes (declarables) that belong to
  // this module
  declarations: [AppComponent, HeaderComponent],
  // The set of NgModules whose exported declarables are available to template
  // in this module
  imports: [BrowserModule, ResourceModule, RouterModule.forRoot(routes)],
  bootstrap: [AppComponent],
})
export class AppModule {}
