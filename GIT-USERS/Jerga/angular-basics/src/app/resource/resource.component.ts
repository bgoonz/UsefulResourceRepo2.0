import { Component, OnInit, OnDestroy } from '@angular/core';
import { Resource, ResourceAlert } from './shared/resource.model';
import { ResourceService } from './shared/resource.service';

import { AlertComponent } from './shared/alert.component';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
})
export class ResourceComponent
  extends AlertComponent
  implements OnInit, OnDestroy
{
  public selectedResource: Resource;
  public isDetailView = true;
  public resources: Resource[] = [];

  constructor(private resourceService: ResourceService) {
    super();
  }

  ngOnInit() {
    this.getResources();
  }

  ngOnDestroy() {
    this.clearAlertTimeout();
  }

  private getResources() {
    this.resourceService.getResources().subscribe((resources: Resource[]) => {
      this.resources = resources;
    });
  }

  private selectResource(resource: Resource): Resource {
    if (!resource?._id) {
      this.selectedResource = null;
      return null;
    }

    this.selectedResource = { ...resource };
    return this.selectedResource;
  }

  private findResourceIndex(resource: Resource): number {
    return this.resources.findIndex((r) => r._id === resource._id);
  }

  public handleSearch(searchedTitle: string) {
    if (!searchedTitle) {
      return this.getResources();
    }

    this.resourceService
      .searchResources(searchedTitle)
      .subscribe((resources) => {
        this.resources = resources;
        this.selectResource(null);
        !this.isDetailView ? (this.isDetailView = true) : null;
      });
  }

  public updateResource = (resource: Resource) => {
    this.resourceService.updateResource(resource._id, resource).subscribe(
      (updatedResource) => {
        this.hydrateResources(updatedResource);
        this.setAlert('success', 'Resource was updated!');
      },
      (error: string) => {
        this.setAlert('error', error);
      }
    );
  };

  public deleteResource() {
    const isConfirm = confirm('Are you sure?');

    if (!this.activeResource?._id) {
      alert('No resource selected!');
      return;
    }

    if (isConfirm) {
      this.resourceService
        .deleteResource(this.activeResource._id)
        .subscribe((dResource) => {
          const index = this.findResourceIndex(dResource);
          this.resources.splice(index, 1);
          this.selectResource(this.resources[0]);
        });
    }
  }

  public hydrateResources(resource: Resource) {
    const index = this.findResourceIndex(resource);
    this.resources[index] = resource;
    this.selectResource(resource);
  }

  public toggleView() {
    this.isDetailView = !this.isDetailView;
  }

  public handleResourceSelect(resource: Resource) {
    this.clearAlertTimeout();
    this.selectResource(resource);
  }

  get hasResources(): boolean {
    return this.resources && this.resourcesCount > 0;
  }

  get activeResource(): Resource {
    return (
      this.selectedResource || (this.hasResources && this.resources[0]) || null
    );
  }

  get resourcesCount(): number {
    return this.resources.length;
  }

  get btnViewClass(): String {
    return this.isDetailView ? 'btn-warning' : 'btn-primary';
  }
}
