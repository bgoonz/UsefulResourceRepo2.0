package me.csestudents.tgpcet;

import android.app.Activity;
import android.content.pm.ActivityInfo;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;

/**
 * Created by Ashish Patel on 4/6/2015.
 */
public class StartingFragment extends Fragment {
    ImageView box11,box22,box33,box44;
    private Fragment mFragment = null;
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_starting,
                container, false);

        return view;
    }

    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        box11 =(ImageView)view.findViewById(R.id.box11);
        box22 =(ImageView)view.findViewById(R.id.box22);
        box33 =(ImageView)view.findViewById(R.id.box33);
        box44 =(ImageView)view.findViewById(R.id.box44);

        box11.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Fragment mFragment1 = new HomeFragment();
                FragmentTransaction transaction = getFragmentManager().beginTransaction();

// Replace whatever is in the fragment_container view with this fragment,
// and add the transaction to the back stack
                transaction.replace(R.id.content_frame, mFragment1);
                transaction.addToBackStack(null);

// Commit the transaction
                transaction.commit();
            }
        });

        box22.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Fragment mFragment2 = new SyllabusFragment();
                FragmentTransaction transaction = getFragmentManager().beginTransaction();

// Replace whatever is in the fragment_container view with this fragment,
// and add the transaction to the back stack
                transaction.replace(R.id.content_frame, mFragment2);
                transaction.addToBackStack(null);

// Commit the transaction
                transaction.commit();
            }
        });

        box33.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Fragment mFragment3 = new ContactFragment();
                FragmentTransaction transaction = getFragmentManager().beginTransaction();

// Replace whatever is in the fragment_container view with this fragment,
// and add the transaction to the back stack
                transaction.replace(R.id.content_frame, mFragment3);
                transaction.addToBackStack(null);

// Commit the transaction
                transaction.commit();
            }
        });

        box44.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Fragment mFragment4 = new NotesFragment();
                FragmentTransaction transaction = getFragmentManager().beginTransaction();

// Replace whatever is in the fragment_container view with this fragment,
// and add the transaction to the back stack
                transaction.replace(R.id.content_frame, mFragment4);
                transaction.addToBackStack(null);

// Commit the transaction
                transaction.commit();
            }
        });

    }
    @Override
    public void setUserVisibleHint(boolean isVisibleToUser) {
        super.setUserVisibleHint(isVisibleToUser);
        if(isVisibleToUser) {
            Activity a = getActivity();
            if(a != null) a.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        }
    }


}