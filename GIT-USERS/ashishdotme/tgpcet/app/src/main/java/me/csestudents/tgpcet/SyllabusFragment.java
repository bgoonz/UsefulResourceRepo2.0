package me.csestudents.tgpcet;
/**
 * Created by Ashish Patel on 3/8/2015.
 */


import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.Toast;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;


public class SyllabusFragment extends Fragment {


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_syllabus,
                container, false);

        return view;
    }

    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        ImageView sem1,sem2,sem3,sem4;
        sem1=(ImageView)view.findViewById(R.id.sem1);
        sem2=(ImageView)view.findViewById(R.id.sem2);
        sem3=(ImageView)view.findViewById(R.id.sem3);
        sem4=(ImageView)view.findViewById(R.id.sem4);

        String extStorageDirectory = Environment.getExternalStorageDirectory().toString();
        String basepath = extStorageDirectory + "/Tgpcet";
//...

// in onCreate


        File dest=new File(basepath);
        if(!dest.exists()) {

            final int[] mSongs = new int[]{R.raw.firstsem, R.raw.secondsem, R.raw.cse3rdand4thsem, R.raw.cse5and6sem};
            for (int i = 0; i < mSongs.length; i++) {
                try {
                    String path = Environment.getExternalStorageDirectory() + "/Tgpcet";
                    File dir = new File(path);
                    if (dir.mkdirs() || dir.isDirectory()) {
                        String str_song_name = i + ".pdf";
                        CopyRAWtoSDCard(mSongs[i], path + File.separator + str_song_name);
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }



        sem1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {


                File file = new File("/sdcard/Tgpcet/0.pdf");
                Intent intent = new Intent(Intent.ACTION_VIEW, Uri.fromFile(file));
                intent.setDataAndType(Uri.fromFile(file),"application/pdf");
                intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
                intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                try
                {
                    getActivity().startActivity(intent);
                }
                catch (ActivityNotFoundException e)
                {
                    Toast.makeText(getActivity(), "NO Pdf Viewer", Toast.LENGTH_SHORT).show();
                }
            }
        });

        sem2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {


                File file = new File("/sdcard/Tgpcet/1.pdf");
                Intent intent = new Intent(Intent.ACTION_VIEW, Uri.fromFile(file));
                intent.setDataAndType(Uri.fromFile(file),"application/pdf");
                intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
                intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                try
                {
                    getActivity().startActivity(intent);
                }
                catch (ActivityNotFoundException e)
                {
                    Toast.makeText(getActivity(), "NO Pdf Viewer", Toast.LENGTH_SHORT).show();
                }
            }
        });
        sem3.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {


                File file = new File("/sdcard/Tgpcet/2.pdf");
                Intent intent = new Intent(Intent.ACTION_VIEW, Uri.fromFile(file));
                intent.setDataAndType(Uri.fromFile(file),"application/pdf");
                intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
                intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                try
                {
                    getActivity().startActivity(intent);
                }
                catch (ActivityNotFoundException e)
                {
                    Toast.makeText(getActivity(), "NO Pdf Viewer", Toast.LENGTH_SHORT).show();
                }
            }
        });
        sem4.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {


                File file = new File("/sdcard/Tgpcet/3.pdf");
                Intent intent = new Intent(Intent.ACTION_VIEW, Uri.fromFile(file));
                intent.setDataAndType(Uri.fromFile(file),"application/pdf");
                intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
                intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                try
                {
                    getActivity().startActivity(intent);
                }
                catch (ActivityNotFoundException e)
                {
                    Toast.makeText(getActivity(), "NO Pdf Viewer", Toast.LENGTH_SHORT).show();
                }
            }
        });


    }

    private void CopyRAWtoSDCard(int id, String path) throws IOException {
        InputStream in = getResources().openRawResource(id);
        FileOutputStream out = new FileOutputStream(path);
        byte[] buff = new byte[1024];
        int read = 0;
        try {
            while ((read = in.read(buff)) > 0) {
                out.write(buff, 0, read);
            }
        } finally {
            in.close();
            out.close();
        }


}}