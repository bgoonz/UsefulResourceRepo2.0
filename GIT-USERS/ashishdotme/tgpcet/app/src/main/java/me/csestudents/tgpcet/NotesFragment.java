package me.csestudents.tgpcet;

import java.util.ArrayList;
import java.util.HashMap;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.ListAdapter;
import android.widget.ListView;
import android.widget.SimpleAdapter;
import android.widget.TextView;
import android.widget.Toast;
import me.csestudents.tgpcet.JSONParser;

/**
 * Created by Ashish Patel on 4/5/2015.
 */
public class NotesFragment extends Fragment {
    ListView list;
    TextView ver;
    TextView name;
    TextView api;
    Button Btngetdata;
    ArrayList<HashMap<String, String>> oslist = new ArrayList<HashMap<String, String>>();
    //URL to get JSON Array
    private static String url = "http://ashish.me/cse/get_json.php";
    //JSON Node Names
    private static final String TAG_OS = "android";
    private static final String TAG_VER = "article_id";
    private static final String TAG_NAME = "article_content";
    private static final String TAG_API = "article_title";
    JSONArray android = null;
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_notes,
                container, false);
        return view;
    }

    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        oslist = new ArrayList<HashMap<String, String>>();

        if (isNetworkAvailable(getActivity())) {
            // available network
            new JSONParse().execute();
        } else {
            // no network
            Toast.makeText(getActivity(),"No internet",Toast.LENGTH_LONG).show();
        }



    }

    public static boolean isNetworkAvailable(Context context) {
        return ((ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE)).getActiveNetworkInfo() != null;
    }

    private class JSONParse extends AsyncTask<String, String, JSONObject> {
        private ProgressDialog pDialog;
        @Override
        protected void onPreExecute() {
            super.onPreExecute();
            ver = (TextView)getView().findViewById(R.id.vers);
            name = (TextView)getView().findViewById(R.id.name);
            api = (TextView)getView().findViewById(R.id.api);
            pDialog = new ProgressDialog(getActivity());
            pDialog.setMessage("Getting Data ...");
            pDialog.setIndeterminate(false);
            pDialog.setCancelable(true);
            pDialog.show();

        }
        @Override
        protected JSONObject doInBackground(String... args) {
            JSONParser jParser = new JSONParser();
            // Getting JSON from URL
            JSONObject json = jParser.getJSONFromUrl(url);
            return json;
        }
        @Override
        protected void onPostExecute(JSONObject json) {
            pDialog.dismiss();
            try {
                // Getting JSON Array from URL
                android = json.getJSONArray(TAG_OS);
                for(int i = 0; i < android.length(); i++){
                    JSONObject c = android.getJSONObject(i);
                    // Storing  JSON item in a Variable
                    String article_id = c.getString(TAG_VER);
                    String article_title = c.getString(TAG_NAME);
                    String article_content = c.getString(TAG_API);
                    // Adding value HashMap key => value
                    HashMap<String, String> map = new HashMap<String, String>();
                    map.put(TAG_VER, article_id);
                    map.put(TAG_NAME, article_content);
                    map.put(TAG_API, article_title);
                    oslist.add(map);
                    list=(ListView)getView().findViewById(R.id.list);
                    ListAdapter adapter = new SimpleAdapter(getActivity(), oslist,
                            R.layout.list_v,
                            new String[] { TAG_VER,TAG_NAME, TAG_API }, new int[] {
                            R.id.vers,R.id.api, R.id.name});
                    list.setAdapter(adapter);
                    list.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                        public void onItemClick(AdapterView<?> parent, View view,
                                                int position, long id) {

                            Log.e("item clicks", "selected: " + position);
                            String item = list.getItemAtPosition(position).toString();

                            String contactNum = ((TextView)view.findViewById(R.id.name)).getText().toString();
                            String apiName = ((TextView)view.findViewById(R.id.api)).getText().toString();

                            Log.e("phone number", contactNum);
                            Toast.makeText(getActivity(), "Downloading "+apiName, Toast.LENGTH_SHORT).show();
                            String ashishweb=contactNum;
                            Intent i = new Intent(Intent.ACTION_VIEW);
                            i.setData(Uri.parse(ashishweb));
                            startActivity(i);

                        }
                    });
                }
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
    }

}
