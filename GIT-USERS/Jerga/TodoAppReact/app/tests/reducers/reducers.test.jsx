var expect = require("expect");
var df = require("deep-freeze-strict");

var reducers = require("reducers");

describe("Reducers", () => {
  describe("searchTextReducer", () => {
    it("should set searchText", () => {
      var action = {
        type: "SET_SEARCH_TEXT",
        searchText: "dog",
      };
      var res = reducers.searchTextReducer(df(""), df(action));

      expect(res).toEqual(action.searchText);
    });
  });

  describe("showCompletedReducer", () => {
    it("should toggle showCompleted", () => {
      var action = {
        type: "TOGGLE_SHOW_COMPLETED",
      };
      var res = reducers.showCompletedReducer(df(false), df(action));

      expect(res).toEqual(true);
    });
  });

  describe("todosReducer", () => {
    it("should add new todo", () => {
      var action = {
        type: "ADD_TODO",
        todo: {
          id: "123",
          text: "something to do",
          completed: false,
          createdAt: 9832798,
        },
      };
      var res = reducers.todosReducer(df([]), df(action));

      expect(res.length).toEqual(1);
      expect(res[0]).toEqual(action.todo);
    });

    it("should toggle todo", () => {
      var todos = [
        {
          id: "123",
          text: "Something",
          completed: true,
          createdAt: 123,
          completedAt: 125,
        },
      ];
      var updates = {
        completed: false,
        completedAt: null,
      };
      var action = {
        type: "UPDATE_TODO",
        id: todos[0].id,
        updates,
      };
      var res = reducers.todosReducer(df(todos), df(action));

      expect(res[0].completed).toEqual(updates.completed);
      expect(res[0].completedAt).toEqual(updates.completedAt);
      expect(res[0].text).toEqual(todos[0].text);
    });

    it("should add existing todos", () => {
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
      var res = reducers.todosReducer(df([]), df(action));

      expect(res.length).toEqual(1);
      expect(res[0]).toEqual(todos[0]);
    });

    it("should wipe todos on logout", () => {
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
        type: "CLEAN_TODOS",
      };
      var res = reducers.todosReducer(df(todos), df(action));

      expect(res.length).toEqual(0);
    });
  });
  describe("AuthReducer", () => {
    it("should save user uid", () => {
      var action = {
        type: "LOGIN",
        auth: {
          uid: "123",
        },
      };
      var auth = {
        uid: "123",
      };
      var res = reducers.authReducer(df({}), df(action));

      expect(res).toEqual(auth);
    });
    it("should set user uid to empty string", () => {
      var action = {
        type: "LOGOUT",
      };

      var auth = {
        uid: "",
      };
      var res = reducers.authReducer(df({}), df(action));

      expect(res).toEqual(auth);
    });
  });
});
