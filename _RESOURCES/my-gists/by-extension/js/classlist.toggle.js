classList.item(index); // Returns the item in the list by its index, or undefined if index is greater than or equal to the list's length
classList.contains(token); // Returns true if the list contains the given token, otherwise false.
classList.add(token1[, ...tokenN]); // Adds the specified token(s) to the list.
classList.remove(token1[, ...tokenN]); // Removes the specified token(s) from the list.
classList.replace(oldToken, newToken); // Replaces token with newToken.
classList.supports(token); // Returns true if a given token is in the associated attribute's supported tokens.
classList.toggle(token[, force]); // Removes token from the list if it exists, or adds token to the list if it doesn't. Returns a boolean indicating whether token is in the list after the operation.
classList.entries(); // Returns an iterator, allowing you to go through all key/value pairs contained in this object.
classList.forEach(callback[ ,thisArg]); // Executes a provided callback function once per DOMTokenList element.
classList.keys(); // Returns an iterator, allowing you to go through all keys of the key/value pairs contained in this object.
classList.values(); // Returns an iterator, allowing you to go through all values of the key/value pairs contained in this object.
