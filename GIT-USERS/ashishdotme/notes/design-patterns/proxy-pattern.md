## Proxy Pattern

A proxy is an object that has the same interface as another object and is used in place of that other object. It provides a surrogate or placeholder for another object to control access to it. It intends to add a wrapper and delegation to protect the real component from undue complexity.

- It allows us to create placeholder wrappers for objects
- A proxy Object allows external access control to the object
- Implements the same interface as the original object

## Use cases

- Caching remotely accessed data
- Optimize or pre process data on access
- Logging
- Encryption
- Simulating private and inaccessible properties
- Data validation

```javascript
// External API Service
function CryptocurrencyAPI() {
  this.getValue = function (coin) {
    console.log("Calling External API...");
    switch (coin) {
      case "Bitcoin":
        return "$8,500";
      case "Litecoin":
        return "$50";
      case "Ethereum":
        return "$175";
      default:
        return "NA";
    }
  };
}

function CryptocurrencyProxy() {
  this.api = new CryptocurrencyAPI();
  this.cache = {};

  this.getValue = function (coin) {
    if (this.cache[coin] == null) {
      this.cache[coin] = this.api.getValue(coin);
    }
    return this.cache[coin];
  };
}

const proxy = new CryptocurrencyProxy();
console.log(proxy.getValue("Bitcoin"));
console.log(proxy.getValue("Litecoin"));
```
