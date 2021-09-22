import firebase, { firebaseRef } from "../firebase/index.jsx";
import _ from "lodash";

export const fetchChannels = (channels, selectedChannel) => {
  return {
    type: "FETCH_CHANNELS",
    channels,
    selectedChannel,
  };
};

export const fetchMessages = (messages) => {
  return {
    type: "FETCH_MESSAGES",
    messages,
  };
};

export const addMessage = (messages) => {
  return {
    type: "ADD_MESSAGE",
    messages,
  };
};

export const queryMessage = (message) => {
  return (dispatch, getState) => {
    //  getState().messages[message.key] = message;

    var messages = getState().messages;

    messages[message.key] = message;

    dispatch(addMessage(messages));
  };
};

export const startAddMessage = (message) => {
  return (dispatch, getState) => {
    return firebaseRef.child(getState().channels.selectedChannel.key).push({
      message,
    });
  };
};

export const startFetchChannels = () => {
  return (dispatch, getState) => {
    var channels = {};
    let selectedChannel;

    return firebaseRef
      .once("value", (snapshot) => {
        channels = snapshot.val();

        // _.mapKeys(channels, (value, key) => {
        //
        //     chatRooms.push(key);
        // });
        //

        _(channels)
          .keys()
          .each((key, index) => {
            channels[key].key = key;
            if (index == 0) {
              channels[key].selected = true;
              selectedChannel = channels[key];
            }
          });
      })
      .then(() => {
        dispatch(fetchChannels(channels, selectedChannel));
      })
      .catch((error) => {
        throw error;
      });
  };
};

export const startFetchMessages = () => {
  return (dispatch, getState) => {
    var messages;

    return firebaseRef
      .child(`${getState().channels.selectedChannel.key}`)
      .once("value", (snapshot) => {
        messages = snapshot.val();

        _(messages)
          .keys()
          .each((k) => {
            messages[k].key = k;
          });
      })
      .then(() => {
        dispatch(fetchMessages(messages));
      });
  };
};

export const fetchChannel = (selectedChannel) => {
  return {
    type: "FETCH_CHANNEL",
    selectedChannel,
  };
};

export const channelOpened = (selectedChannel) => {
  return (dispatch, getState) => {
    //   console.log("CHANNEL_OPENED: ", getState().channels);
    // debugger;
    _(getState().channels)
      .values()
      .each((channel) => {
        channel.selected = false;
      });

    selectedChannel.selected = true;

    console.log("CHANNEL_OPENED: ", getState().channels);

    dispatch(fetchChannel(selectedChannel));
  };
};
