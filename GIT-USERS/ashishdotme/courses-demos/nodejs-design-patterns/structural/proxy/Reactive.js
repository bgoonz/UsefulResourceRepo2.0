const obj = {
  name: "Ansu",
  age: 23,
  city: "Pune",
  country: "India",
};

const makeReactive = (obj, observer) => {
  return new Proxy(obj, {
    set(target, key, value) {
      observer({ [key]: value });
      return (target[key] = value);
    },
  });
};

const reactive = makeReactive(obj, (res) => console.log(res));
reactive.color = "blue";
