import {
  COLLABORATION_CREATED_FROM_OFFER,
  FETCH_USER_MESSAGES_SUCCESS,
  SET_COLLABORATION,
  SET_COLLABORATION_JOINED_PEOPLE,
  UPDATE_COLLABORATION_USER,
} from "../types";
import * as api from "../api";

export const collaborate =
  ({ collaboration, message }) =>
  (dispatch) =>
    api.createCollaboration(collaboration).then((collabId) => {
      message.cta = `/collaborations/${collabId}`;
      api.sendMessage(message);
      api.markOfferAsInCollaboration(collaboration.fromOffer);
      dispatch({
        type: COLLABORATION_CREATED_FROM_OFFER,
        offerId: collaboration.fromOffer,
        offersType: "sent",
      });
      return collabId;
    });

export const subscribeToMessages = (userId) => (dispatch) =>
  api.subscribeToMessages(userId, (messages) =>
    dispatch({ type: FETCH_USER_MESSAGES_SUCCESS, messages })
  );

// export const markMessageAsRead = message => dispatch =>
//   api.markMessageAsRead(message)
//      .then(_ => dispatch({type: MARK_MESSAGE_AS_READ, messageId: message.id}))

export const markMessageAsRead = (message) => api.markMessageAsRead(message);

export const fetchCollaborations = (userId) => api.fetchCollaborations(userId);

export const subscribeToCollaboration = (collabId, done) => (dispatch) =>
  api.subscribeToCollaboration(collabId, async (collaboration) => {
    let joinedPeople = [];

    if (collaboration.joinedPeople) {
      joinedPeople = await Promise.all(
        collaboration.joinedPeople.map(async (userRef) => {
          const userSnapshot = await userRef.get();
          return { id: userSnapshot.id, ...userSnapshot.data() };
        })
      );
    }

    dispatch({ type: SET_COLLABORATION, collaboration });
    dispatch({ type: SET_COLLABORATION_JOINED_PEOPLE, joinedPeople });
    done({ joinedPeople });
  });

export const joinCollaboration = (collabId, userId) =>
  api.joinCollaboration(collabId, userId);

export const subscribeToProfile = (uid) => (dispatch) =>
  api.subscribeToProfile(uid, (user) =>
    dispatch({ type: UPDATE_COLLABORATION_USER, user })
  );
