package me.csestudents.tgpcet;

import android.app.Activity;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.view.Window;
import android.widget.Button;
import android.widget.TextView;

import com.parse.ParseAnalytics;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by Ashish Patel on 4/7/2015.
 */
public class ShowPopUp extends Activity implements View.OnClickListener {
    Button ok;
    Button cancel;
    boolean click = true;
    String heading;
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.popupdialog);
        TextView txtView = (TextView) findViewById(R.id.durationTitle);
        ParseAnalytics.trackAppOpened(getIntent());
        Bundle mBundle = getIntent().getExtras();
        String mData = mBundle.getString("com.parse.Data");
        System.out.println("DATA : xxxxx : " + mData);
        JSONObject jObject;
        if (!TextUtils.isEmpty(mData)) {
            try {
                jObject = new JSONObject(mData);
                String mResponse = jObject.getString("customdata");
                txtView.setText(mResponse);
            } catch (JSONException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
            setTitle("Message");
        Bundle bundle = getIntent().getExtras();
        String message = bundle.getString("message1");
        if (!TextUtils.isEmpty(message)) {
            txtView.setText(message);
        }

        cancel = (Button)findViewById(R.id.popCancelB);
        cancel.setOnClickListener(this);
    }
    @Override
    public void onClick(View arg0) {
        // TODO Auto-generated method stub
        finish();
    }
}