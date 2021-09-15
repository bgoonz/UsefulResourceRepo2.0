package me.csestudents.tgpcet;

/**
 * Created by Ashish Patel on 3/9/2015.
 */
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;


public class ProfessorsFragment extends Fragment {
    TextView mob1,mob2,mob3,mob4,mob5,mob6,mob7,mob8,mob9;
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_professors,
                container, false);

        return view;
    }

    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        mob1=(TextView)view.findViewById(R.id.mob1);
        mob2=(TextView)view.findViewById(R.id.mob2);
        mob3=(TextView)view.findViewById(R.id.mob3);
        mob4=(TextView)view.findViewById(R.id.mob4);
        mob5=(TextView)view.findViewById(R.id.mob5);
        mob6=(TextView)view.findViewById(R.id.mob6);
        mob7=(TextView)view.findViewById(R.id.mob7);
        mob8=(TextView)view.findViewById(R.id.mob8);
        mob9=(TextView)view.findViewById(R.id.mob9);

        mob1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String num = mob1.getText().toString();
                Intent intent = new Intent(Intent.ACTION_CALL, Uri.parse("tel:" + num));
                startActivity(intent);
            }
        });

        mob2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String num = mob2.getText().toString();
                Intent intent = new Intent(Intent.ACTION_CALL, Uri.parse("tel:" + num));
                startActivity(intent);
            }
        });

        mob3.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String num = mob3.getText().toString();
                Intent intent = new Intent(Intent.ACTION_CALL, Uri.parse("tel:" + num));
                startActivity(intent);
            }
        });

        mob4.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String num = mob4.getText().toString();
                Intent intent = new Intent(Intent.ACTION_CALL, Uri.parse("tel:" + num));
                startActivity(intent);
            }
        });

        mob5.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String num = mob5.getText().toString();
                Intent intent = new Intent(Intent.ACTION_CALL, Uri.parse("tel:" + num));
                startActivity(intent);
            }
        });

        mob6.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String num = mob6.getText().toString();
                Intent intent = new Intent(Intent.ACTION_CALL, Uri.parse("tel:" + num));
                startActivity(intent);
            }
        });

        mob7.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String num = mob7.getText().toString();
                Intent intent = new Intent(Intent.ACTION_CALL, Uri.parse("tel:" + num));
                startActivity(intent);
            }
        });

        mob8.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String num = mob8.getText().toString();
                Intent intent = new Intent(Intent.ACTION_CALL, Uri.parse("tel:" + num));
                startActivity(intent);
            }
        });

        mob9.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String num = mob9.getText().toString();
                Intent intent = new Intent(Intent.ACTION_CALL, Uri.parse("tel:" + num));
                startActivity(intent);
            }
        });
    }
}
