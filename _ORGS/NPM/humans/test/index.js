var humans = require("..")
var test = require("tap").test

test("humans", function (t) {
  t.ok((typeof humans === "object"), "humans are objects")
  t.equal(Object.keys(humans).length, 20, "there are 20 humans")
  t.ok(humans.ceejbot, "one of them is ceejbot")
  t.equal(humans.ceejbot.email, "ceej@npmjs.com", "ceejbot's email address is ceej@npmjs.com")
  t.equal(humans.ceejbot.avatar, "https://s.gravatar.com/avatar/d4d41847af095b91aa8ed1d1145f5e03?size=512&default=retro", "ceejbot has an HTTPS gravatar")
  t.end()
})
