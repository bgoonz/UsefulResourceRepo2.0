package me.csestudents.tgpcet;

/**
 * Created by Ashish Patel on 3/8/2015.
 */


        import android.app.Activity;
        import android.app.AlertDialog;
        import android.app.Dialog;
        import android.content.DialogInterface;
        import android.content.Intent;
        import android.content.pm.ActivityInfo;
        import android.os.Bundle;
        import android.support.annotation.Nullable;
        import android.support.v4.app.Fragment;
        import android.support.v4.app.FragmentManager;
        import android.support.v4.app.FragmentTransaction;
        import android.view.LayoutInflater;
        import android.view.View;
        import android.view.ViewGroup;
        import android.view.Window;
        import android.widget.Button;
        import android.widget.EditText;
        import android.widget.ImageView;
        import android.widget.Toast;

        import com.parse.Parse;
        import com.parse.ParseInstallation;
        import com.parse.ParsePush;
        import com.parse.ParseQuery;
        import com.parse.PushService;

        import org.json.JSONException;
        import org.json.JSONObject;


public class HomeFragment extends Fragment {
    EditText pass;
    private int i = 0;
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_home,
                container, false);
        return view;
    }

    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        pass=(EditText)view.findViewById(R.id.pass);
        Button sendmessage =(Button)view.findViewById(R.id.sendmessage);
        sendmessage.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
               String password= pass.getText().toString();
                   if("admin".equals(pass.getText().toString())){
                   openAlert(v);



            }else{
                       Toast.makeText(getActivity(),"Wrong Password",Toast.LENGTH_LONG).show();
                   }
            }
        });



    }



    private void openAlert(View view) {
        final Dialog dialog = new Dialog(getActivity());
        dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
        //tell the Dialog to use the dialog.xml as it's layout description
        dialog.setContentView(R.layout.message_view);
        final EditText edmessage =(EditText)dialog.findViewById(R.id.edmessage);
        final Button dialogButton1 = (Button) dialog.findViewById(R.id.dialogButtonOK1);
        Button send=(Button)dialog.findViewById(R.id.send);
        send.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                String themessage = edmessage.getText().toString();
                JSONObject obj;
                if(themessage != null && !themessage.isEmpty()) {
                    try {
                        obj = new JSONObject();
                        obj.put("alert", themessage);
                        obj.put("action", "me.csestudents.tgpcet1.UPDATE_STATUS");
                        obj.put("customdata", themessage);

                        ParsePush push = new ParsePush();
                        ParseQuery query = ParseInstallation.getQuery();


                        // Notification for Android users
                        query.whereEqualTo("deviceType", "android");
                        push.setQuery(query);
                        push.setData(obj);
                        push.sendInBackground();
                    } catch (JSONException e) {
                        // TODO Auto-generated catch block
                        e.printStackTrace();
                    }
                    Toast.makeText(getActivity(), "Message sent", Toast.LENGTH_LONG).show();
                    edmessage.setText("");
                }else{
                    Toast.makeText(getActivity(), "Enter a message", Toast.LENGTH_LONG).show();
                }
            }
        });
        dialogButton1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                dialog.dismiss();
            }
        });

        dialog.show();
    }


}