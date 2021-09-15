
build: node_modules components index.js
	@component build --dev

components: component.json
	@component install --dev

clean:
	@rm -fr build node_modules components

node_modules: package.json
	@npm install

test: build
	@./node_modules/.bin/mocha --reporter spec
	@component test phantom

.PHONY: clean test
