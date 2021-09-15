import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Resource } from '../../shared/resource.model';
import { SettingsService } from '../../shared/settings.service';

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss'],
})
export class ResourceListComponent {
  @Input() resources: Resource[];
  @Input() activeId: string;
  @Output() onResourceClick = new EventEmitter<Resource>();

  constructor(private settingsService: SettingsService) {}

  get theme(): string {
    return this.settingsService.settings?.theme;
  }

  get jsonResources() {
    return JSON.stringify(this.resources);
  }

  handleResourceSelect(resource: Resource) {
    this.onResourceClick.next(resource);
  }
}
