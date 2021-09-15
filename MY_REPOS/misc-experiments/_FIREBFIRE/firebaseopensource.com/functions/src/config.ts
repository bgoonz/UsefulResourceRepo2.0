
import { Github } from "./github";
import * as functions from "firebase-functions";

export class Config {
  // TODO: Dynamic branch
  static github = new Github(Config.get("github.token"), "master");

  static readonly FEATURED_BLACKLIST_PROJECTS_URL = Github.getRawContentUrl(
    "firebase",
    "firebaseopensource.com",
    "config/feature_blacklist_projects.json",
    "master"
  );

  static readonly ADDITIONAL_PROJECTS_URL = Github.getRawContentUrl(
    "firebase",
    "firebaseopensource.com",
    "config/additional_projects.json",
    "master"
  );

  static ADDITIONAL_PROJECTS: string[] = [];
  static FEATURED_BLACKLIST_PROJECTS: string[] = [];

  static async loadGlobalConfig() {
    if (
      this.ADDITIONAL_PROJECTS.length > 0 &&
      this.FEATURED_BLACKLIST_PROJECTS.length > 0
    ) {
      return;
    }

    const additionalData = await this.github.getRawContent(
      this.ADDITIONAL_PROJECTS_URL
    );
    this.ADDITIONAL_PROJECTS = JSON.parse(additionalData).projects;

    const blacklistData = await this.github.getRawContent(
      this.FEATURED_BLACKLIST_PROJECTS_URL
    );
    this.FEATURED_BLACKLIST_PROJECTS = JSON.parse(blacklistData).projects;
  }

  /**
   * Get a config key, either from the env or from local.
   */
  static get(key: string): string {
    try {
      return this._getNestedProperty(functions.config(), key);
    } catch (e) {
      const newKey = key.replace(".", "_");
      return process.env[newKey];
    }
  }

  static _getNestedProperty(obj: any, name: string): string {
    const pieces = name.split(".");
    let val = obj;
    pieces.forEach(piece => {
      val = val[piece];
    });

    return val;
  }
}
