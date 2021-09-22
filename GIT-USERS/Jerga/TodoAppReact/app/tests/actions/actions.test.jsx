import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import firebase, { firebaseRef } from "app/firebase";

var expect = require("expect");
var actions = require("actions");

var createMockStore = configureMockStore([thunk]);

describe("Actions", () => {
  it("should generate search text action", () => {
    var action = {
      type: "SET_SEARCH_TEXT",
      searchText: "Some search text",
    };
    var res = actions.setSearchText(action.searchText);

    expect(res).toEqual(action);
  });

  it("should generate toggle show completed action", () => {
    var action = {
      type: "TOGGLE_SHOW_COMPLETED",
    };
    var res = actions.toggleShowCompleted();

    expect(res).toEqual(action);
  });

  it("should generate add todos action object", () => {
    var todos = [
      {
        id: 111,
        text: "anything",
        completed: false,
        completedAt: undefined,
        createdAt: 44,
      },
    ];

    var action = {
      type: "ADD_TODOS",
      todos,
    };
    var res = actions.addTodos(todos);

    expect(res).toEqual(action);
  });

  it("should generate update todo action", () => {
    var action = {
      type: "UPDATE_TODO",
      id: "123",
      updates: { completed: false },
    };
    var res = actions.updateTodo(action.id, action.updates);

    expect(res).toEqual(action);
  });

  it("should generate add todo action object", () => {
    var action = {
      type: "ADD_TODO",
      todo: {
        id: "124",
        text: "bla bla",
        completed: false,
        createdAt: 0,
      },
    };
    var res = actions.addTodo(action.todo);

    expect(res).toEqual(action);
  });
  describe("Tests with firebase todos", () => {
    var testTodoRef;
    var uid;
    var todosRef;

    beforeEach((done) => {
      var credential = firebase.auth.GithubAuthProvider.credential(
        process.env.GITHUB_ACCESS_TOKEN
      );

      firebase
        .auth()
        .signInWithCredential(credential)
        .then((user) => {
          uid = user.uid;
          todosRef = firebaseRef.child(`users/${uid}/todos`);

          return todosRef.remove();
        })
        .then(() => {
          testTodoRef = todosRef.push();

          return testTodoRef.set({
            text: "Something todo",
            completed: false,
            createdAt: 32424,
          });
        })
        .then(() => done())
        .catch(done);
    });

    afterEach((done) => {
      todosRef.remove().then(() => done());
    });

    it("should toggle todo and dispatch UPDATE_TODO action", (done) => {
      const store = createMockStore({ auth: { uid } });
      const action = actions.startToggleTodo(testTodoRef.key, true);
      //   console.log(action);

      store.dispatch(action).then(() => {
        const mockAction = store.getActions();

        expect(mockAction[0]).toInclude({
          type: "UPDATE_TODO",
          id: testTodoRef.key,
        });

        expect(mockAction[0].updates).toInclude({
          completed: true,
        });

        expect(mockAction[0].updates.completedAt).toExist();

        done();
      }, done);
    });

    it("should populate todos and dispatch ADD_TODOS actions", (done) => {
      const store = createMockStore({ auth: { uid } });
      const action = actions.startAddTodos();

      store.dispatch(action).then(() => {
        const mockAction = store.getActions();
        console.log(mockAction);
        expect(mockAction[0]).toInclude({
          type: "ADD_TODOS",
        });
        expect(mockAction[0].todos.length).toEqual(1);
        expect(mockAction[0].todos[0].text).toEqual("Something todo");
        done();
      }, done);
    });

    it("should get user ID and dispatch LOGIN actions", () => {
      var action = {
        type: "LOGIN",
        auth: {
          uid: "124",
        },
      };
      var res = actions.login(action.auth.uid);
      expect(res).toEqual(action);
    });

    it("should set auth state to empty string and dispatch LOGOUT actions", () => {
      var action = {
        type: "LOGOUT",
      };

      var res = actions.logout();
      expect(res).toEqual(action);
    });
    it("Should create todo and dispatch ADD_TODO", (done) => {
      const store = createMockStore({ auth: { uid } });
      const todoText = "My todo item";

      store
        .dispatch(actions.startAddTodo(todoText))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0]).toInclude({
            type: "ADD_TODO",
          });
          expect(actions[0].todo).toInclude({
            text: todoText,
          });
          done();
        })
        .catch(done);
    });
  });
});
