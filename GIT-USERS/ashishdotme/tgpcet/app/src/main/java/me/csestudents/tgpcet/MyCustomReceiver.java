package me.csestudents.tgpcet;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

import com.parse.ParseAnalytics;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Iterator;

/**
 * Created by Ashish Patel on 4/7/2015.
 */
public class MyCustomReceiver extends BroadcastReceiver {
    private static final String TAG = "MyCustomReceiver";
    @Override
    public void onReceive(Context context, Intent intent) {

        try {
            if (intent == null)
            {
                Log.d(TAG, "Receiver intent null");
            }
            else
            {
                String action = intent.getAction();
                Log.d(TAG, "got action " + action );
                if (action.equals("me.csestudents.tgpcet.UPDATE_STATUS"))
                {
                    String channel = intent.getExtras().getString("com.parse.Channel");
                    JSONObject json = new JSONObject(intent.getExtras().getString("com.parse.Data"));
                    Log.d(TAG, "got action " + action + " on channel " + channel + " with:");
                    Iterator itr = json.keys();
                    while (itr.hasNext()) {
                        String key = (String) itr.next();
                        if (key.equals("customdata"))
                        {
                            String message = json.getString("customdata");
                            Intent pupInt = new Intent(context, ShowPopUp.class);
                            pupInt.putExtra("message1", message);
                            pupInt.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK );
                            context.getApplicationContext().startActivity(pupInt);
                        }
                        Log.d(TAG, "..." + key + " => " + json.getString(key));
                    }
                }
            }
        } catch (JSONException e) {
            Log.d(TAG, "JSONException: " + e.getMessage());
        }
    }
}