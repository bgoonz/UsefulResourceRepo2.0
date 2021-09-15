import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Resource, ResourceAlert } from '../../shared/resource.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-resource-form',
  templateUrl: './resource-update.component.html',
  styleUrls: ['./resource-update.component.scss'],
})
export class ResourceUpdateComponent {
  @Output() onResourceUpdate = new EventEmitter<Resource>();
  @Input() alert: ResourceAlert;
  @Input() onSubmit: (resource: Resource) => Observable<Resource>;
  @Input() set resource(selectedResource: Resource) {
    this.selectedResource = { ...selectedResource };
  }

  selectedResource: Resource;
  types = Resource.types;

  submitForm() {
    this.onSubmit(this.selectedResource);
  }
}
