import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ResourceComponent } from './resource.component';
import { ResourceSearchComponent } from './components/resource-search/resource-search.component';
import { ResourceListComponent } from './components/resource-list/resource-list.component';
import { ResourceDetailCardComponent } from './components/resource-detail/resource-detail.component';
import { ResourceUpdateComponent } from './components/resource-update/resource-update.component';
import { ResourceNewComponent } from './resource-new/resource-new.component';
import { ResourceDetailComponent } from './resource-detail/resource-detail.component';
import { ResourceOutletComponent } from './resource-outlet.component';
import { ModalComponent } from '../shared/modal/modal.component';
import { SettingsModalComponent } from './settings-modal/settings-modal.component';

const routes: Routes = [
  {
    path: 'resources',
    component: ResourceOutletComponent,
    children: [
      { path: '', component: ResourceComponent },
      { path: 'new', component: ResourceNewComponent },
      { path: ':id', component: ResourceDetailComponent },
    ],
  },
];

@NgModule({
  declarations: [
    ResourceComponent,
    ResourceSearchComponent,
    ResourceListComponent,
    ResourceDetailCardComponent,
    ResourceUpdateComponent,
    ResourceNewComponent,
    ResourceOutletComponent,
    ResourceDetailComponent,
    ModalComponent,
    SettingsModalComponent,
  ],
  exports: [ResourceComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
})
export class ResourceModule {}
