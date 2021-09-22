import { ResourceAlert } from './resource.model';

export class AlertComponent {
  public timeoutId: number;
  public alert: ResourceAlert;

  public setAlert(type: string, message: string) {
    this.alert = new ResourceAlert();
    this.alert[type] = message;

    this.timeoutId = setTimeout(() => (this.alert = new ResourceAlert()), 2000);
  }

  public clearAlertTimeout() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.alert = new ResourceAlert();
    }
  }
}
