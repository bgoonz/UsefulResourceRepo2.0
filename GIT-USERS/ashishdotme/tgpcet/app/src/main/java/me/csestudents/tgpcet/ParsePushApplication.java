package me.csestudents.tgpcet;

import android.app.Application;

import com.parse.Parse;
import com.parse.PushService;

/**
 * Created by andrew on 4/22/14.
 */
public class ParsePushApplication extends Application {

    @Override
    public void onCreate(){
        Parse.initialize(this, getString(R.string.parseAppID), getString(R.string.parseClientID));
        PushService.setDefaultPushCallback(this, MainActivity.class);
    }
}
