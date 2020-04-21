import { AuthSettings } from "./../app/auth/models/auth-settings.model";

class AppSettings {
  readonly apiBaseUrl: string;
  readonly authSettings: AuthSettings

  constructor(untypedSettings: any) {
    for (let settingKey in untypedSettings) {
      this[settingKey] = untypedSettings[settingKey];
    }
  }
}

export let appSettings = new AppSettings((<any>window).APP_SETTINGS);