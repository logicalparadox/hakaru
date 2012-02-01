
TESTS = test/*.js
REPORTER = spec
BENCHMARKS = benchmark/*.js

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		$(TESTS)

bench:
	@NODE_ENV=bench ./node_modules/.bin/matcha \
		$(BENCHMARKS)

.PHONY: test bench
