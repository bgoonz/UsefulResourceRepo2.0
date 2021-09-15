"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('./models'),
    Project = _require.Project,
    Task = _require.Task;

var _require2 = require('./index'),
    initDb = _require2.initDb;

initDb(true).then(function () {
  // createProject is a promise
  var createProject = Project.create({
    name: 'Sequelize Workshop',
    date: new Date()
  });
  var createTasks = Promise.all([Task.create({
    name: 'Lecture',
    difficulty: 3
  }), Task.create({
    name: 'Live Coding',
    difficulty: 10
  })]);
  return Promise.all([createProject, createTasks]);
}).then(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      project = _ref2[0],
      tasks = _ref2[1];

  var _tasks = _slicedToArray(tasks, 2),
      lecture = _tasks[0],
      liveCode = _tasks[1];

  return project.setTasks(tasks);
}).then(function () {
  console.log('I have seeded the database.');
  process.exit(0);
})["catch"](function (e) {
  console.error(e);
  process.exit(1);
});