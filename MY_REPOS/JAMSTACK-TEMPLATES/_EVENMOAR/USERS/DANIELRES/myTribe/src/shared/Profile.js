import React from "react";

import Entry from "./Entry";
import LinkTo from "./LinkTo";

const Profile = ({ handleClickTo, person }) => (
  <div className="entries">
    <LinkTo target={person.invitedBy}>
      <Entry>Added by: {person.invitedBy}</Entry>
    </LinkTo>

    <Entry>Member since: {person.infos.addedAt}</Entry>

    <LinkTo external target={person.infos.fbProfileUrl}>
      <Entry>FB profile: {person.infos.fbProfileUrl}</Entry>
    </LinkTo>

    <LinkTo external target={person.infos.introUrl}>
      <Entry>Intro: {person.infos.introUrl}</Entry>
    </LinkTo>

    <LinkTo external target={`mailto:${person.infos.email}`}>
      <Entry>Email: {person.infos.email}</Entry>
    </LinkTo>

    <Entry>Phone: {person.infos.phone}</Entry>

    <Entry>Address: {person.infos.address}</Entry>
  </div>
);

export default Profile;
