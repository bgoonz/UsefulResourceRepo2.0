import { Injectable } from '@angular/core';
import { ResourceSettings } from './resource.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  settings = new ResourceSettings();
  settingsSubject = new Subject<ResourceSettings>();

  constructor() {
    this.settingsSubject.subscribe((settings) => {
      this.settings = settings;
    });
  }

  loadSettings() {
    const settings = localStorage.getItem('resource-settings');
    const parsedSettings = settings
      ? JSON.parse(settings)
      : new ResourceSettings();
    this.settingsSubject.next(parsedSettings);
  }

  saveSettings(settings: ResourceSettings) {
    localStorage.setItem('resource-settings', JSON.stringify(settings));
    this.settingsSubject.next(settings);
  }
}
