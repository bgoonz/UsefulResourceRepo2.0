import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import Service from "@ember/service";

const StubMapsService = Service.extend({
  getMapElement(location) {
    this.set("calledWithLocation", location);
    const div = document.createElement("div");
    div.setAttribute("id", "myMap");
    const testingEnv = document.getElementById("ember-testing");
    testingEnv.appendChild(div);
  },
});

moduleForComponent("location map", "Integration | Component | location map", {
  integration: true,

  beforeEach: function () {
    this.register("service:maps", StubMapsService);
    this.inject.service("maps", { as: "mapService" });
  },
});

test("should append map element to container element", function (assert) {
  this.set("myCity", "New York");
  this.set("myStreet", "Times Square");
  this.render(hbs`{{#location-map city=myCity street=myStreet}}
                        {{/location-map}}`);

  assert.ok(document.getElementById("myMap"), "container should be rendered");
  assert.equal(
    this.get("mapService.calledWithLocation"),
    "New York,Times Square",
    "should call service with New York"
  );
});
