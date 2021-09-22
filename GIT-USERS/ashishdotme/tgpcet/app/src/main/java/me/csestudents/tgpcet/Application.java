package me.csestudents.tgpcet;

import com.parse.Parse;
import com.parse.ParseAnalytics;
import com.parse.ParseInstallation;
import com.parse.PushService;

public class Application extends android.app.Application {

  public Application() {
  }

  @Override
  public void onCreate() {
    super.onCreate();

	// Initialize the Parse SDK.

      Parse.initialize(getApplicationContext(),"PnvbtQpr75bUA4QJf6bOqLeN6RBPSmIK7COapg2B", "b2793WCZWIwKAhPl7v8yYfszv1UrMNPIE7Ponsss");

      PushService.setDefaultPushCallback(getApplicationContext(), ShowPopUp.class);
      PushService.subscribe(getApplicationContext(), "tgpcet", MainActivity.class);
      ParseInstallation.getCurrentInstallation().saveInBackground();

	// Specify an Activity to handle all pushes by default.

  }
}