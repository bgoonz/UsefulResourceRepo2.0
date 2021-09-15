describe("Github APP tests", function () {
  var jsonTest1 = { name: "Bob", gitID: "12321312" };
  var jsonTest2 = [
    { name: "repo1", user: "Bob" },
    { name: "repo2", user: "Bob" },
  ];

  describe("when user object is created", function () {
    it("should be able to create object from JSONs", function () {
      expect(
        dataController.addUser(
          JSON.stringify(jsonTest1),
          JSON.stringify(jsonTest2)
        ).user.name
      ).toEqual("Bob");
    });

    it("should be able to create object from JSONs", function () {
      expect(
        dataController.addUser(
          JSON.stringify(jsonTest1),
          JSON.stringify(jsonTest2)
        ).repos[0].name
      ).toEqual("repo1");
    });
  });

  //NOT WORKING YET
  // describe('should allow multi stage asynchronisity', function () {
  //     beforeEach(function (done) {
  //         //set up
  //         var initialState = {};
  //         testing.asyncGetCallToGit('jerga99', false, initialState);
  //         done();
  //     });
  // });

  // it(function (done) {
  //     expect(initialState.done).toEqual(true);
  //     done();
  // });
});
