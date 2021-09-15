import { Component, OnInit } from '@angular/core';
import { ResourceSettings } from '../shared/resource.model';
import { SettingsService } from '../shared/settings.service';

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.scss'],
})
export class SettingsModalComponent implements OnInit {
  isOpen = false;
  settings = new ResourceSettings();

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {}

  saveSettings() {
    // saveSettings -> settingsService
    this.settingsService.saveSettings({ ...this.settings });
    this.isOpen = false;
  }
}
