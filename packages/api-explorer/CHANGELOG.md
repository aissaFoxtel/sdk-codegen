# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [21.1.0](https://www.github.com/looker-open-source/sdk-codegen/compare/v21.0.7...v21.1.0) (2021-03-05)


### Features

* updating a bunch of docs ([#494](https://www.github.com/looker-open-source/sdk-codegen/issues/494)) ([8722051](https://www.github.com/looker-open-source/sdk-codegen/commit/872205152048f80dd7a1c2b9c4ecc1c8a9775b1c))

## [Current]

### Added

- This change log file
- Response types now have nested types correctly documented
- The response type processing functions now have arguments for the number of levels to expand nested types
- API explorer's default expansion depth is one level deep
- Added [`ExploreType`](/packages/api-explorer/src/components/ExploreType/ExploreType.tsx) and [`ExploreProperty`](/packages/api-explorer/src/components/ExploreType/ExploreProperty.tsx) components used to display responses and explore the type on the type page
