import React from "react";
import {connect} from 'react-redux';

class TestFile extends React.Component {
    constructor(props) {
        super(props);
    }

        render(){
            return(
<<<<<<< HEAD
              <div> Just Testing File! </div>

=======
              <div> Just Testing File!
                Going to do recursive merge!!!
                Doing changes in Master!!!
               </div>
>>>>>>> iss53
            )
        }
}

function test(){
  console.log("No conflicting change in master!!!");
}

export default TestFile;
