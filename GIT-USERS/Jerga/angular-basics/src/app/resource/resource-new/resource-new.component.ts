import { Component } from '@angular/core';
import { ResourceService } from '../shared/resource.service';
import { AlertComponent } from '../shared/alert.component';
import { Resource } from '../shared/resource.model';

@Component({
  selector: 'app-resource-new',
  templateUrl: './resource-new.component.html',
  styleUrls: ['./resource-new.component.scss'],
})
export class ResourceNewComponent extends AlertComponent {
  resource = new Resource();

  constructor(private resourceService: ResourceService) {
    super();
  }

  createResource = (resource: Resource) => {
    this.resourceService.createResource(resource).subscribe(
      (newResource) => {
        this.setAlert('success', 'Resource was created!');
      },
      (error: string) => {
        this.setAlert('error', error);
      }
    );
  };
}
