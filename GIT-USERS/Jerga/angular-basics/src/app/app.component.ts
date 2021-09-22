import { Component, OnInit } from '@angular/core';
import { SettingsService } from './resource/shared/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Welcome to my Application';

  constructor(private settingsService: SettingsService) {}

  ngOnInit() {
    this.settingsService.loadSettings();
  }

  get theme(): string {
    return this.settingsService.settings?.theme;
  }
}
