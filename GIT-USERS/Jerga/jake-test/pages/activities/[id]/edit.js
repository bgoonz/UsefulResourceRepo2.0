import React from "react";
import Router from "next/router";
import AddActivityForm from "../../../components/addActivityForm";
import { getActivityById, updateActivity } from "../../../actions";

class EditActivity extends React.Component {
  static async getInitialProps({ query }) {
    const activity = await getActivityById(query.id);
    return { activity };
  }

  HandleUpdateActivity = (activity) => {
    updateActivity(activity).then((updatedActivity) => {
      Router.push("/activities/[id]", `/activities/${activity.id}`);
    });
  };

  render() {
    const { activity } = this.props;
    return (
      <div className="container">
        <h1>Edit Activity</h1>
        <AddActivityForm
          submitButton="Update"
          initialData={activity}
          handleFormSubmit={this.HandleUpdateActivity}
        />
      </div>
    );
  }
}

export default EditActivity;
