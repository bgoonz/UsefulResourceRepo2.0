import { Route, Routes } from '@angular/router';
import { LoadReposComponent } from './components/load-repos/load-repos.component';
import { ViewRepoComponent } from './components/view-repo/view-repo.component';

const RootRoute: Route = {
    path: '',
    redirectTo: '/load-repos',
    pathMatch: 'full'
}

const LoadRepoRoute: Route = {
    path: 'load-repos',
    component: LoadReposComponent
};

const ViewRepoRoute: Route = {
    path: 'view-repo/:user/:repo',
    component: ViewRepoComponent
};

export const AppRoutes: Routes = [
    RootRoute,
    LoadRepoRoute,
    ViewRepoRoute
];
