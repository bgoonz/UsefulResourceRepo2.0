import { Component, Input } from '@angular/core';
import { Resource } from '../../shared/resource.model';
import { SettingsService } from '../../shared/settings.service';

@Component({
  selector: 'app-resource-detail-card',
  templateUrl: './resource-detail.component.html',
  styleUrls: ['./resource-detail.component.scss'],
})
export class ResourceDetailCardComponent {
  @Input() resource: Resource;
  @Input() isButtonDisplayed = true;

  constructor(private settingsService: SettingsService) {}

  get theme(): string {
    return this.settingsService.settings?.theme;
  }
}
