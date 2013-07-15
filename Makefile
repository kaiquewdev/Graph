install:
	npm install && \
	npm install -g mocha markx

test:
	mocha -u tdd lib/*.test.js

doc:
	markx README.md >> readme.html && \
	lynx readme.html
