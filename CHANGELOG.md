# [0.2.0-alpha.1](https://github.com/uphg/unfunt/compare/v0.1.0-alpha.1...v0.2.0-alpha.1) (2025-11-04)


### Bug Fixes

* disable no-sparse-arrays rule in ESLint config and simplify test expectation for creating intermediate arrays ([5396cb6](https://github.com/uphg/unfunt/commit/5396cb67427f57dfa3276ee66d32c72748af9f66))
* improve multiple utility functions and remove get method ([847722c](https://github.com/uphg/unfunt/commit/847722c56dfed3dd51f0e0f9a5f742209774e79a))
* **object:** improve get/set functions and path handling ([402735d](https://github.com/uphg/unfunt/commit/402735df76fe2eb8cd0e3601e8e27eca375f2e15))
* update import paths in test files ([1726857](https://github.com/uphg/unfunt/commit/1726857840e38d4fb94acac62b387b052e042683))


### Code Refactoring

* rename remain method to unslice for better semantic clarity ([6da366b](https://github.com/uphg/unfunt/commit/6da366b655eb6398b00e00a50352bc2ce239a1d5))


### Features

* add forOwn utility for iterating over own enumerable properties ([ff4e3e6](https://github.com/uphg/unfunt/commit/ff4e3e6bd146858cee536223eb119ba2f89e7044))
* add GitHub Actions CI/CD workflows ([78260d7](https://github.com/uphg/unfunt/commit/78260d75052182d4b5747edad7d47511c13425e5))
* add object get and set utilities with comprehensive path support ([fdfdfbf](https://github.com/uphg/unfunt/commit/fdfdfbf6431c44a4923c9c0577b43724b6ffa237))
* **array:** add remove utility function ([efc43f9](https://github.com/uphg/unfunt/commit/efc43f95ca761d9f9aa64713520349816042c013))
* **build:** add build-packages script and update package.json ([ccce047](https://github.com/uphg/unfunt/commit/ccce047d136b66240c3a525d18cd69e67188a8e0))
* **build:** add support for building individual npm packages ([afe091a](https://github.com/uphg/unfunt/commit/afe091a6a17da7ac2faf49fce4e0641e9c9c77f6))
* **function:** add memoize utility and improve path handling ([65648d0](https://github.com/uphg/unfunt/commit/65648d015cc5e7f4c8276fd8888e4d84bd236d65))
* **function:** enhance memoize with MapQueue and add structure module ([e3cb37c](https://github.com/uphg/unfunt/commit/e3cb37c28c1b7fb0bbbc44fa6a14fa3a3338c40a))
* implement 16 new utility methods across all modules ([f583c71](https://github.com/uphg/unfunt/commit/f583c71d7638c02e07fac839e45170d791800b23))
* improve vitest config with better test display and organization ([c1e6cc7](https://github.com/uphg/unfunt/commit/c1e6cc7a47b4d7eed16a4a600154a9feae3793d0))
* logo ([5ec36f2](https://github.com/uphg/unfunt/commit/5ec36f24acf293de851dc91dac922b1bf9030480))
* **number:** add toNumber utility and improve number conversion ([f1ef641](https://github.com/uphg/unfunt/commit/f1ef641a5b622a692ba24d3321bc9a6c8ecffab6))
* **object:** add clone and cloneDeep utility functions ([fff62b0](https://github.com/uphg/unfunt/commit/fff62b0cfc0370f32e0566645102742d66a8d9cc))
* **object:** improve get function type definitions with overloads ([527907c](https://github.com/uphg/unfunt/commit/527907cd904266f42aaf8b3ec71dbb0171fc6e86))
* **release:** add npm-packages publishing support to release script ([65bb915](https://github.com/uphg/unfunt/commit/65bb91565b74787b0aac6e9661e9596503601253))
* **typed:** add makeMap utility function ([2153828](https://github.com/uphg/unfunt/commit/21538280ab7e61618f03d298ab8655ee94b6ae9b))


### BREAKING CHANGES

* remain() method has been renamed to unslice()
* Removed get() function from object exports



# [0.2.0-alpha.1](https://github.com/uphg/unfunt/compare/v0.1.0-alpha.1...v0.2.0-alpha.1) (2025-11-04)


### Bug Fixes

* disable no-sparse-arrays rule in ESLint config and simplify test expectation for creating intermediate arrays ([5396cb6](https://github.com/uphg/unfunt/commit/5396cb67427f57dfa3276ee66d32c72748af9f66))
* improve multiple utility functions and remove get method ([847722c](https://github.com/uphg/unfunt/commit/847722c56dfed3dd51f0e0f9a5f742209774e79a))
* **object:** improve get/set functions and path handling ([402735d](https://github.com/uphg/unfunt/commit/402735df76fe2eb8cd0e3601e8e27eca375f2e15))
* update import paths in test files ([1726857](https://github.com/uphg/unfunt/commit/1726857840e38d4fb94acac62b387b052e042683))


### Code Refactoring

* rename remain method to unslice for better semantic clarity ([6da366b](https://github.com/uphg/unfunt/commit/6da366b655eb6398b00e00a50352bc2ce239a1d5))


### Features

* add forOwn utility for iterating over own enumerable properties ([ff4e3e6](https://github.com/uphg/unfunt/commit/ff4e3e6bd146858cee536223eb119ba2f89e7044))
* add GitHub Actions CI/CD workflows ([78260d7](https://github.com/uphg/unfunt/commit/78260d75052182d4b5747edad7d47511c13425e5))
* add object get and set utilities with comprehensive path support ([fdfdfbf](https://github.com/uphg/unfunt/commit/fdfdfbf6431c44a4923c9c0577b43724b6ffa237))
* **array:** add remove utility function ([efc43f9](https://github.com/uphg/unfunt/commit/efc43f95ca761d9f9aa64713520349816042c013))
* **build:** add build-packages script and update package.json ([ccce047](https://github.com/uphg/unfunt/commit/ccce047d136b66240c3a525d18cd69e67188a8e0))
* **build:** add support for building individual npm packages ([afe091a](https://github.com/uphg/unfunt/commit/afe091a6a17da7ac2faf49fce4e0641e9c9c77f6))
* **function:** add memoize utility and improve path handling ([65648d0](https://github.com/uphg/unfunt/commit/65648d015cc5e7f4c8276fd8888e4d84bd236d65))
* **function:** enhance memoize with MapQueue and add structure module ([e3cb37c](https://github.com/uphg/unfunt/commit/e3cb37c28c1b7fb0bbbc44fa6a14fa3a3338c40a))
* implement 16 new utility methods across all modules ([f583c71](https://github.com/uphg/unfunt/commit/f583c71d7638c02e07fac839e45170d791800b23))
* improve vitest config with better test display and organization ([c1e6cc7](https://github.com/uphg/unfunt/commit/c1e6cc7a47b4d7eed16a4a600154a9feae3793d0))
* logo ([5ec36f2](https://github.com/uphg/unfunt/commit/5ec36f24acf293de851dc91dac922b1bf9030480))
* **number:** add toNumber utility and improve number conversion ([f1ef641](https://github.com/uphg/unfunt/commit/f1ef641a5b622a692ba24d3321bc9a6c8ecffab6))
* **object:** add clone and cloneDeep utility functions ([fff62b0](https://github.com/uphg/unfunt/commit/fff62b0cfc0370f32e0566645102742d66a8d9cc))
* **object:** improve get function type definitions with overloads ([527907c](https://github.com/uphg/unfunt/commit/527907cd904266f42aaf8b3ec71dbb0171fc6e86))
* **release:** add npm-packages publishing support to release script ([65bb915](https://github.com/uphg/unfunt/commit/65bb91565b74787b0aac6e9661e9596503601253))
* **typed:** add makeMap utility function ([2153828](https://github.com/uphg/unfunt/commit/21538280ab7e61618f03d298ab8655ee94b6ae9b))


### BREAKING CHANGES

* remain() method has been renamed to unslice()
* Removed get() function from object exports



# [0.2.0-alpha.1](https://github.com/uphg/unfunt/compare/v0.1.0-alpha.1...v0.2.0-alpha.1) (2025-11-04)


### Bug Fixes

* disable no-sparse-arrays rule in ESLint config and simplify test expectation for creating intermediate arrays ([5396cb6](https://github.com/uphg/unfunt/commit/5396cb67427f57dfa3276ee66d32c72748af9f66))
* improve multiple utility functions and remove get method ([847722c](https://github.com/uphg/unfunt/commit/847722c56dfed3dd51f0e0f9a5f742209774e79a))
* **object:** improve get/set functions and path handling ([402735d](https://github.com/uphg/unfunt/commit/402735df76fe2eb8cd0e3601e8e27eca375f2e15))
* update import paths in test files ([1726857](https://github.com/uphg/unfunt/commit/1726857840e38d4fb94acac62b387b052e042683))


### Code Refactoring

* rename remain method to unslice for better semantic clarity ([6da366b](https://github.com/uphg/unfunt/commit/6da366b655eb6398b00e00a50352bc2ce239a1d5))


### Features

* add forOwn utility for iterating over own enumerable properties ([ff4e3e6](https://github.com/uphg/unfunt/commit/ff4e3e6bd146858cee536223eb119ba2f89e7044))
* add GitHub Actions CI/CD workflows ([78260d7](https://github.com/uphg/unfunt/commit/78260d75052182d4b5747edad7d47511c13425e5))
* add object get and set utilities with comprehensive path support ([fdfdfbf](https://github.com/uphg/unfunt/commit/fdfdfbf6431c44a4923c9c0577b43724b6ffa237))
* **array:** add remove utility function ([efc43f9](https://github.com/uphg/unfunt/commit/efc43f95ca761d9f9aa64713520349816042c013))
* **build:** add build-packages script and update package.json ([ccce047](https://github.com/uphg/unfunt/commit/ccce047d136b66240c3a525d18cd69e67188a8e0))
* **build:** add support for building individual npm packages ([afe091a](https://github.com/uphg/unfunt/commit/afe091a6a17da7ac2faf49fce4e0641e9c9c77f6))
* **function:** add memoize utility and improve path handling ([65648d0](https://github.com/uphg/unfunt/commit/65648d015cc5e7f4c8276fd8888e4d84bd236d65))
* **function:** enhance memoize with MapQueue and add structure module ([e3cb37c](https://github.com/uphg/unfunt/commit/e3cb37c28c1b7fb0bbbc44fa6a14fa3a3338c40a))
* implement 16 new utility methods across all modules ([f583c71](https://github.com/uphg/unfunt/commit/f583c71d7638c02e07fac839e45170d791800b23))
* improve vitest config with better test display and organization ([c1e6cc7](https://github.com/uphg/unfunt/commit/c1e6cc7a47b4d7eed16a4a600154a9feae3793d0))
* logo ([5ec36f2](https://github.com/uphg/unfunt/commit/5ec36f24acf293de851dc91dac922b1bf9030480))
* **number:** add toNumber utility and improve number conversion ([f1ef641](https://github.com/uphg/unfunt/commit/f1ef641a5b622a692ba24d3321bc9a6c8ecffab6))
* **object:** add clone and cloneDeep utility functions ([fff62b0](https://github.com/uphg/unfunt/commit/fff62b0cfc0370f32e0566645102742d66a8d9cc))
* **object:** improve get function type definitions with overloads ([527907c](https://github.com/uphg/unfunt/commit/527907cd904266f42aaf8b3ec71dbb0171fc6e86))
* **release:** add npm-packages publishing support to release script ([65bb915](https://github.com/uphg/unfunt/commit/65bb91565b74787b0aac6e9661e9596503601253))
* **typed:** add makeMap utility function ([2153828](https://github.com/uphg/unfunt/commit/21538280ab7e61618f03d298ab8655ee94b6ae9b))


### BREAKING CHANGES

* remain() method has been renamed to unslice()
* Removed get() function from object exports



# [0.2.0-alpha.1](https://github.com/uphg/unfunt/compare/v0.1.0-alpha.1...v0.2.0-alpha.1) (2025-11-04)


### Bug Fixes

* disable no-sparse-arrays rule in ESLint config and simplify test expectation for creating intermediate arrays ([5396cb6](https://github.com/uphg/unfunt/commit/5396cb67427f57dfa3276ee66d32c72748af9f66))
* improve multiple utility functions and remove get method ([847722c](https://github.com/uphg/unfunt/commit/847722c56dfed3dd51f0e0f9a5f742209774e79a))
* **object:** improve get/set functions and path handling ([402735d](https://github.com/uphg/unfunt/commit/402735df76fe2eb8cd0e3601e8e27eca375f2e15))
* update import paths in test files ([1726857](https://github.com/uphg/unfunt/commit/1726857840e38d4fb94acac62b387b052e042683))


### Code Refactoring

* rename remain method to unslice for better semantic clarity ([6da366b](https://github.com/uphg/unfunt/commit/6da366b655eb6398b00e00a50352bc2ce239a1d5))


### Features

* add forOwn utility for iterating over own enumerable properties ([ff4e3e6](https://github.com/uphg/unfunt/commit/ff4e3e6bd146858cee536223eb119ba2f89e7044))
* add GitHub Actions CI/CD workflows ([78260d7](https://github.com/uphg/unfunt/commit/78260d75052182d4b5747edad7d47511c13425e5))
* add object get and set utilities with comprehensive path support ([fdfdfbf](https://github.com/uphg/unfunt/commit/fdfdfbf6431c44a4923c9c0577b43724b6ffa237))
* **array:** add remove utility function ([efc43f9](https://github.com/uphg/unfunt/commit/efc43f95ca761d9f9aa64713520349816042c013))
* **build:** add build-packages script and update package.json ([ccce047](https://github.com/uphg/unfunt/commit/ccce047d136b66240c3a525d18cd69e67188a8e0))
* **build:** add support for building individual npm packages ([afe091a](https://github.com/uphg/unfunt/commit/afe091a6a17da7ac2faf49fce4e0641e9c9c77f6))
* **function:** add memoize utility and improve path handling ([65648d0](https://github.com/uphg/unfunt/commit/65648d015cc5e7f4c8276fd8888e4d84bd236d65))
* **function:** enhance memoize with MapQueue and add structure module ([e3cb37c](https://github.com/uphg/unfunt/commit/e3cb37c28c1b7fb0bbbc44fa6a14fa3a3338c40a))
* implement 16 new utility methods across all modules ([f583c71](https://github.com/uphg/unfunt/commit/f583c71d7638c02e07fac839e45170d791800b23))
* improve vitest config with better test display and organization ([c1e6cc7](https://github.com/uphg/unfunt/commit/c1e6cc7a47b4d7eed16a4a600154a9feae3793d0))
* logo ([5ec36f2](https://github.com/uphg/unfunt/commit/5ec36f24acf293de851dc91dac922b1bf9030480))
* **number:** add toNumber utility and improve number conversion ([f1ef641](https://github.com/uphg/unfunt/commit/f1ef641a5b622a692ba24d3321bc9a6c8ecffab6))
* **object:** add clone and cloneDeep utility functions ([fff62b0](https://github.com/uphg/unfunt/commit/fff62b0cfc0370f32e0566645102742d66a8d9cc))
* **object:** improve get function type definitions with overloads ([527907c](https://github.com/uphg/unfunt/commit/527907cd904266f42aaf8b3ec71dbb0171fc6e86))
* **release:** add npm-packages publishing support to release script ([65bb915](https://github.com/uphg/unfunt/commit/65bb91565b74787b0aac6e9661e9596503601253))
* **typed:** add makeMap utility function ([2153828](https://github.com/uphg/unfunt/commit/21538280ab7e61618f03d298ab8655ee94b6ae9b))


### BREAKING CHANGES

* remain() method has been renamed to unslice()
* Removed get() function from object exports



# [0.2.0-alpha.1](https://github.com/uphg/unfunt/compare/v0.1.0-alpha.1...v0.2.0-alpha.1) (2025-11-04)


### Bug Fixes

* disable no-sparse-arrays rule in ESLint config and simplify test expectation for creating intermediate arrays ([5396cb6](https://github.com/uphg/unfunt/commit/5396cb67427f57dfa3276ee66d32c72748af9f66))
* improve multiple utility functions and remove get method ([847722c](https://github.com/uphg/unfunt/commit/847722c56dfed3dd51f0e0f9a5f742209774e79a))
* **object:** improve get/set functions and path handling ([402735d](https://github.com/uphg/unfunt/commit/402735df76fe2eb8cd0e3601e8e27eca375f2e15))
* update import paths in test files ([1726857](https://github.com/uphg/unfunt/commit/1726857840e38d4fb94acac62b387b052e042683))


### Code Refactoring

* rename remain method to unslice for better semantic clarity ([6da366b](https://github.com/uphg/unfunt/commit/6da366b655eb6398b00e00a50352bc2ce239a1d5))


### Features

* add forOwn utility for iterating over own enumerable properties ([ff4e3e6](https://github.com/uphg/unfunt/commit/ff4e3e6bd146858cee536223eb119ba2f89e7044))
* add GitHub Actions CI/CD workflows ([78260d7](https://github.com/uphg/unfunt/commit/78260d75052182d4b5747edad7d47511c13425e5))
* add object get and set utilities with comprehensive path support ([fdfdfbf](https://github.com/uphg/unfunt/commit/fdfdfbf6431c44a4923c9c0577b43724b6ffa237))
* **array:** add remove utility function ([efc43f9](https://github.com/uphg/unfunt/commit/efc43f95ca761d9f9aa64713520349816042c013))
* **build:** add build-packages script and update package.json ([ccce047](https://github.com/uphg/unfunt/commit/ccce047d136b66240c3a525d18cd69e67188a8e0))
* **build:** add support for building individual npm packages ([afe091a](https://github.com/uphg/unfunt/commit/afe091a6a17da7ac2faf49fce4e0641e9c9c77f6))
* **function:** add memoize utility and improve path handling ([65648d0](https://github.com/uphg/unfunt/commit/65648d015cc5e7f4c8276fd8888e4d84bd236d65))
* **function:** enhance memoize with MapQueue and add structure module ([e3cb37c](https://github.com/uphg/unfunt/commit/e3cb37c28c1b7fb0bbbc44fa6a14fa3a3338c40a))
* implement 16 new utility methods across all modules ([f583c71](https://github.com/uphg/unfunt/commit/f583c71d7638c02e07fac839e45170d791800b23))
* improve vitest config with better test display and organization ([c1e6cc7](https://github.com/uphg/unfunt/commit/c1e6cc7a47b4d7eed16a4a600154a9feae3793d0))
* logo ([5ec36f2](https://github.com/uphg/unfunt/commit/5ec36f24acf293de851dc91dac922b1bf9030480))
* **number:** add toNumber utility and improve number conversion ([f1ef641](https://github.com/uphg/unfunt/commit/f1ef641a5b622a692ba24d3321bc9a6c8ecffab6))
* **object:** add clone and cloneDeep utility functions ([fff62b0](https://github.com/uphg/unfunt/commit/fff62b0cfc0370f32e0566645102742d66a8d9cc))
* **object:** improve get function type definitions with overloads ([527907c](https://github.com/uphg/unfunt/commit/527907cd904266f42aaf8b3ec71dbb0171fc6e86))
* **release:** add npm-packages publishing support to release script ([65bb915](https://github.com/uphg/unfunt/commit/65bb91565b74787b0aac6e9661e9596503601253))
* **typed:** add makeMap utility function ([2153828](https://github.com/uphg/unfunt/commit/21538280ab7e61618f03d298ab8655ee94b6ae9b))


### BREAKING CHANGES

* remain() method has been renamed to unslice()
* Removed get() function from object exports



# [0.2.0-alpha.1](https://github.com/uphg/unfunt/compare/v0.1.0-alpha.1...v0.2.0-alpha.1) (2025-11-04)


### Bug Fixes

* disable no-sparse-arrays rule in ESLint config and simplify test expectation for creating intermediate arrays ([5396cb6](https://github.com/uphg/unfunt/commit/5396cb67427f57dfa3276ee66d32c72748af9f66))
* improve multiple utility functions and remove get method ([847722c](https://github.com/uphg/unfunt/commit/847722c56dfed3dd51f0e0f9a5f742209774e79a))
* **object:** improve get/set functions and path handling ([402735d](https://github.com/uphg/unfunt/commit/402735df76fe2eb8cd0e3601e8e27eca375f2e15))
* update import paths in test files ([1726857](https://github.com/uphg/unfunt/commit/1726857840e38d4fb94acac62b387b052e042683))


### Code Refactoring

* rename remain method to unslice for better semantic clarity ([6da366b](https://github.com/uphg/unfunt/commit/6da366b655eb6398b00e00a50352bc2ce239a1d5))


### Features

* add forOwn utility for iterating over own enumerable properties ([ff4e3e6](https://github.com/uphg/unfunt/commit/ff4e3e6bd146858cee536223eb119ba2f89e7044))
* add GitHub Actions CI/CD workflows ([78260d7](https://github.com/uphg/unfunt/commit/78260d75052182d4b5747edad7d47511c13425e5))
* add object get and set utilities with comprehensive path support ([fdfdfbf](https://github.com/uphg/unfunt/commit/fdfdfbf6431c44a4923c9c0577b43724b6ffa237))
* **array:** add remove utility function ([efc43f9](https://github.com/uphg/unfunt/commit/efc43f95ca761d9f9aa64713520349816042c013))
* **build:** add build-packages script and update package.json ([ccce047](https://github.com/uphg/unfunt/commit/ccce047d136b66240c3a525d18cd69e67188a8e0))
* **build:** add support for building individual npm packages ([afe091a](https://github.com/uphg/unfunt/commit/afe091a6a17da7ac2faf49fce4e0641e9c9c77f6))
* **function:** add memoize utility and improve path handling ([65648d0](https://github.com/uphg/unfunt/commit/65648d015cc5e7f4c8276fd8888e4d84bd236d65))
* **function:** enhance memoize with MapQueue and add structure module ([e3cb37c](https://github.com/uphg/unfunt/commit/e3cb37c28c1b7fb0bbbc44fa6a14fa3a3338c40a))
* implement 16 new utility methods across all modules ([f583c71](https://github.com/uphg/unfunt/commit/f583c71d7638c02e07fac839e45170d791800b23))
* improve vitest config with better test display and organization ([c1e6cc7](https://github.com/uphg/unfunt/commit/c1e6cc7a47b4d7eed16a4a600154a9feae3793d0))
* logo ([5ec36f2](https://github.com/uphg/unfunt/commit/5ec36f24acf293de851dc91dac922b1bf9030480))
* **number:** add toNumber utility and improve number conversion ([f1ef641](https://github.com/uphg/unfunt/commit/f1ef641a5b622a692ba24d3321bc9a6c8ecffab6))
* **object:** add clone and cloneDeep utility functions ([fff62b0](https://github.com/uphg/unfunt/commit/fff62b0cfc0370f32e0566645102742d66a8d9cc))
* **object:** improve get function type definitions with overloads ([527907c](https://github.com/uphg/unfunt/commit/527907cd904266f42aaf8b3ec71dbb0171fc6e86))
* **release:** add npm-packages publishing support to release script ([65bb915](https://github.com/uphg/unfunt/commit/65bb91565b74787b0aac6e9661e9596503601253))
* **typed:** add makeMap utility function ([2153828](https://github.com/uphg/unfunt/commit/21538280ab7e61618f03d298ab8655ee94b6ae9b))


### BREAKING CHANGES

* remain() method has been renamed to unslice()
* Removed get() function from object exports



# [0.2.0-alpha.1](https://github.com/uphg/unfunt/compare/v0.1.0-alpha.1...v0.2.0-alpha.1) (2025-11-04)


### Bug Fixes

* disable no-sparse-arrays rule in ESLint config and simplify test expectation for creating intermediate arrays ([5396cb6](https://github.com/uphg/unfunt/commit/5396cb67427f57dfa3276ee66d32c72748af9f66))
* improve multiple utility functions and remove get method ([847722c](https://github.com/uphg/unfunt/commit/847722c56dfed3dd51f0e0f9a5f742209774e79a))
* **object:** improve get/set functions and path handling ([402735d](https://github.com/uphg/unfunt/commit/402735df76fe2eb8cd0e3601e8e27eca375f2e15))
* update import paths in test files ([1726857](https://github.com/uphg/unfunt/commit/1726857840e38d4fb94acac62b387b052e042683))


### Code Refactoring

* rename remain method to unslice for better semantic clarity ([6da366b](https://github.com/uphg/unfunt/commit/6da366b655eb6398b00e00a50352bc2ce239a1d5))


### Features

* add forOwn utility for iterating over own enumerable properties ([ff4e3e6](https://github.com/uphg/unfunt/commit/ff4e3e6bd146858cee536223eb119ba2f89e7044))
* add GitHub Actions CI/CD workflows ([78260d7](https://github.com/uphg/unfunt/commit/78260d75052182d4b5747edad7d47511c13425e5))
* add object get and set utilities with comprehensive path support ([fdfdfbf](https://github.com/uphg/unfunt/commit/fdfdfbf6431c44a4923c9c0577b43724b6ffa237))
* **array:** add remove utility function ([efc43f9](https://github.com/uphg/unfunt/commit/efc43f95ca761d9f9aa64713520349816042c013))
* **build:** add build-packages script and update package.json ([ccce047](https://github.com/uphg/unfunt/commit/ccce047d136b66240c3a525d18cd69e67188a8e0))
* **build:** add support for building individual npm packages ([afe091a](https://github.com/uphg/unfunt/commit/afe091a6a17da7ac2faf49fce4e0641e9c9c77f6))
* **function:** add memoize utility and improve path handling ([65648d0](https://github.com/uphg/unfunt/commit/65648d015cc5e7f4c8276fd8888e4d84bd236d65))
* **function:** enhance memoize with MapQueue and add structure module ([e3cb37c](https://github.com/uphg/unfunt/commit/e3cb37c28c1b7fb0bbbc44fa6a14fa3a3338c40a))
* implement 16 new utility methods across all modules ([f583c71](https://github.com/uphg/unfunt/commit/f583c71d7638c02e07fac839e45170d791800b23))
* improve vitest config with better test display and organization ([c1e6cc7](https://github.com/uphg/unfunt/commit/c1e6cc7a47b4d7eed16a4a600154a9feae3793d0))
* logo ([5ec36f2](https://github.com/uphg/unfunt/commit/5ec36f24acf293de851dc91dac922b1bf9030480))
* **number:** add toNumber utility and improve number conversion ([f1ef641](https://github.com/uphg/unfunt/commit/f1ef641a5b622a692ba24d3321bc9a6c8ecffab6))
* **object:** add clone and cloneDeep utility functions ([fff62b0](https://github.com/uphg/unfunt/commit/fff62b0cfc0370f32e0566645102742d66a8d9cc))
* **object:** improve get function type definitions with overloads ([527907c](https://github.com/uphg/unfunt/commit/527907cd904266f42aaf8b3ec71dbb0171fc6e86))
* **release:** add npm-packages publishing support to release script ([65bb915](https://github.com/uphg/unfunt/commit/65bb91565b74787b0aac6e9661e9596503601253))
* **typed:** add makeMap utility function ([2153828](https://github.com/uphg/unfunt/commit/21538280ab7e61618f03d298ab8655ee94b6ae9b))


### BREAKING CHANGES

* remain() method has been renamed to unslice()
* Removed get() function from object exports



# 0.1.0-alpha.1 (2025-07-26)


### Bug Fixes

* fix Object.hasOwn type assertion issue ([a13105c](https://github.com/uphg/unfunt/commit/a13105cdd6869aaad9204d01aa2b6686da27baff))
* resolve type errors and eslint warnings in test files ([c4df7fb](https://github.com/uphg/unfunt/commit/c4df7fbaa365e409fb53182480e5a15188de0572))


### Features

* add changelog generation to release process ([7dc5101](https://github.com/uphg/unfunt/commit/7dc5101fb8c6e5c105dcb4ddf8c848bbae338ca5))
* add common type checking and conversion methods. ([3024e56](https://github.com/uphg/unfunt/commit/3024e5692151e03c1bc8eaaa7b1551255a788fa8))
* add release automation and update build scripts ([7b77e18](https://github.com/uphg/unfunt/commit/7b77e188b8c4fd87a2b6d6cc500ebb529f7ba944))
* debounce, throttle. ([27d4345](https://github.com/uphg/unfunt/commit/27d4345e6d4c93ca49bef222c6fb6622a0026d90))
* eslint config. ([6e30da8](https://github.com/uphg/unfunt/commit/6e30da85917f3e8edce0bcf7b5107425d92779d5))
* flatDeep, flatMapDeep. ([32125ff](https://github.com/uphg/unfunt/commit/32125ffb319d5e6bd1c35da6d9ce61d36c480519))
* hasIn, hasOwn, and remain functions. ([095661c](https://github.com/uphg/unfunt/commit/095661c71192d4dbbd25dd713957cee4c9574490))
* implement isIterable method and enhance type utilities ([e4b6d1c](https://github.com/uphg/unfunt/commit/e4b6d1c7ddd4c4326b550584f1a5ce030e835cad))
* omit, omitBy, pick, pickBy. ([9154206](https://github.com/uphg/unfunt/commit/9154206a9879e92a939fe4e742b0de756fa26fa1))
* prepare for npm publishing ([e27262d](https://github.com/uphg/unfunt/commit/e27262d2348b44a10df437ee3675cd3da24f95ff))
* refactor utility library, optimize type checking and object manipulation functions ([02cf406](https://github.com/uphg/unfunt/commit/02cf40675d5b6631717962069f8f228197aedfc0))
* type judgment. ([0a9d6f4](https://github.com/uphg/unfunt/commit/0a9d6f40018863cd9fe68550bc70343dfb3cfd0b))
* update isFinite, isInteger, and isLength implementations ([ac4179c](https://github.com/uphg/unfunt/commit/ac4179cbdcefbc8f31c473dbe36e19cdfe808f39))
