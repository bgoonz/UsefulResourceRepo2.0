import firebase, { firebaseRef, gitHubProvider } from "../firebase";

export const addInserat = (inserat) => {
  return {
    type: "ADD_INSERAT",
    inserat,
  };
};

export const addInserats = (inserats) => {
  return {
    type: "ADD_INSERATS",
    inserats,
  };
};

export const startAddInserats = () => {
  return (dispatch, getState) => {
    const inseratsRef = firebaseRef.child(`users`);

    inseratsRef.once("value").then(
      (snapshot) => {
        var allInseratsObj = snapshot.val();
        var usersArray = [];
        var parsedInserats = [];

        Object.keys(allInseratsObj).forEach((usersId) => {
          usersArray.push(allInseratsObj[usersId]);
        });

        var inseratsArray = [];

        usersArray.map((user) => {
          Object.keys(user).forEach((userId) => {
            inseratsArray.push(user[userId]);
          });
        });

        inseratsArray.map((inserat) => {
          Object.keys(inserat).forEach((inseratId) => {
            parsedInserats.push(inserat[inseratId]);
          });
        });

        dispatch(addInserats(parsedInserats));
      },
      (e) => {
        console.log(e);
      }
    );
  };
};

export const startAddInserat = (inserat) => {
  return (dispatch, getState) => {
    var uid = getState().auth.uid;
    var todoRef = firebaseRef.child(`users/${uid}/inserats`).push(inserat);

    return todoRef.then(() => {
      dispatch(
        addInserat({
          ...inserat,
          id: todoRef.key,
        })
      );
    });
  };
};

export const startLogin = () => {
  return (dispatch, getState) => {
    firebase
      .auth()
      .signInWithPopup(gitHubProvider)
      .then(
        (result) => {
          console.log("Auth worked", result);
        },
        (error) => {
          console.log("Unable to auth", error);
        }
      );
  };
};

export const login = (uid) => {
  return {
    type: "LOGIN",
    auth: {
      uid,
    },
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
  };
};

export const startLogout = () => {
  return (dispatch, getState) => {
    firebase
      .auth()
      .signOut()
      .then(
        (result) => {
          console.log("Logout out");
        },
        (error) => {
          console.log("Error occured ", error);
        }
      );

    dispatch(logout());
  };
};
