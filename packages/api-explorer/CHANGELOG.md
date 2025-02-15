# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

### [0.9.3](https://www.github.com/looker-open-source/sdk-codegen/compare/api-explorer-v0.9.2...api-explorer-v0.9.3) (2021-04-21)


### Features

* adds 'SDK Examples' data table ([#602](https://www.github.com/looker-open-source/sdk-codegen/issues/602)) ([3678c96](https://www.github.com/looker-open-source/sdk-codegen/commit/3678c96cc7c2edadd00013b66711c917a62d1000))
* introduces prism-editor package; implements read-only usage ([#588](https://www.github.com/looker-open-source/sdk-codegen/issues/588)) ([863c88d](https://www.github.com/looker-open-source/sdk-codegen/commit/863c88dfb0569f7c829602acee2404e1c840097e))


### Bug Fixes

* updated TypeScript, C#, Go language names in codeGenerators.ts ([#610](https://www.github.com/looker-open-source/sdk-codegen/issues/610)) ([13fb42b](https://www.github.com/looker-open-source/sdk-codegen/commit/13fb42b6bfa651a137e75b04fc6ee00620705ede))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @looker/run-it bumped from ^0.9.2 to ^0.9.3
    * @looker/sdk-codegen bumped from ^21.0.12 to ^21.0.13
  * devDependencies
    * @looker/sdk-codegen-scripts bumped from ^21.0.12 to ^21.0.13
    * @looker/sdk-node bumped from ^21.4.1 to ^21.4.2

### [0.9.2](https://www.github.com/looker-open-source/sdk-codegen/compare/api-explorer-v0.9.1...api-explorer-v0.9.2) (2021-04-15)


### Features

* add source declaration links to API Explorer ([#578](https://www.github.com/looker-open-source/sdk-codegen/issues/578)) ([ce0e588](https://www.github.com/looker-open-source/sdk-codegen/commit/ce0e588787bdbc2e8ca4aadd44c31dc3ba1a0ef1))
* adds prism editor and implements for sdkdocs ([#581](https://www.github.com/looker-open-source/sdk-codegen/issues/581)) ([aea0424](https://www.github.com/looker-open-source/sdk-codegen/commit/aea042439d2358a61bbf705528d6006d694d5ea5))
* click diff item method to show method detail ([#592](https://www.github.com/looker-open-source/sdk-codegen/issues/592)) ([a5f082a](https://www.github.com/looker-open-source/sdk-codegen/commit/a5f082af262ab5451d6af09083a8a3c2eb31fcfa))
* document request bodies for methods with body parameters ([#593](https://www.github.com/looker-open-source/sdk-codegen/issues/593)) ([740ae5d](https://www.github.com/looker-open-source/sdk-codegen/commit/740ae5d89aa701b29bf225cf61f9a87de0907ef7))
* remember user's SDK language preference ([#567](https://www.github.com/looker-open-source/sdk-codegen/issues/567)) ([faa2511](https://www.github.com/looker-open-source/sdk-codegen/commit/faa25113d87072875ec5fb718da7eb10e0a518e4))


### Bug Fixes

* **ApiExplorer:** Added support for Golang syntax highlighting ([#563](https://www.github.com/looker-open-source/sdk-codegen/issues/563)) ([e2ae33e](https://www.github.com/looker-open-source/sdk-codegen/commit/e2ae33eb1d63b0f8d9987bf86bbed64641d4bea3))
* extends runit response height and fixes response models scrolling ([#558](https://www.github.com/looker-open-source/sdk-codegen/issues/558)) ([61627ce](https://www.github.com/looker-open-source/sdk-codegen/commit/61627ce282c1f7e4eaf082ccd66466060d2e7b98))
* remove search criteria selector and auto expand results ([#571](https://www.github.com/looker-open-source/sdk-codegen/issues/571)) ([e5a5ee7](https://www.github.com/looker-open-source/sdk-codegen/commit/e5a5ee7ddb2a9c6822dccc9493c994a9a826b419))
* RunIt request overflow  ([#565](https://www.github.com/looker-open-source/sdk-codegen/issues/565)) ([38665ac](https://www.github.com/looker-open-source/sdk-codegen/commit/38665ac40b6abc20557db66d0dc536c347c6a862))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @looker/run-it bumped from ^0.9.1 to ^0.9.2
    * @looker/sdk bumped from ^21.4.0 to ^21.4.1
    * @looker/sdk-codegen bumped from ^21.0.11 to ^21.0.12
    * @looker/sdk-rtl bumped from ^21.0.11 to ^21.0.12
  * devDependencies
    * @looker/sdk-codegen-scripts bumped from ^21.0.11 to ^21.0.12
    * @looker/sdk-node bumped from ^21.4.0 to ^21.4.1

### [0.9.1](https://www.github.com/looker-open-source/sdk-codegen/compare/api-explorer-v0.9.0...api-explorer-v0.9.1) (2021-04-02)


### Features

* Added --versions option to the code generator ([#514](https://www.github.com/looker-open-source/sdk-codegen/issues/514)) ([ee6f3e8](https://www.github.com/looker-open-source/sdk-codegen/commit/ee6f3e8f55e300df1a75c9be89b47f067bc08dee))
* adds scrolling to frame elements ([#526](https://www.github.com/looker-open-source/sdk-codegen/issues/526)) ([d7cd769](https://www.github.com/looker-open-source/sdk-codegen/commit/d7cd76917522c37e2902792405a75b8b9358e92f))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @looker/run-it bumped from ^0.9.0 to ^0.9.1
    * @looker/sdk bumped from ^21.0.10 to ^21.4.0
    * @looker/sdk-codegen bumped from ^21.0.10 to ^21.0.11
    * @looker/sdk-rtl bumped from ^21.0.10 to ^21.0.11
  * devDependencies
    * @looker/sdk-codegen-scripts bumped from ^21.0.9 to ^21.0.11
    * @looker/sdk-node bumped from ^21.0.10 to ^21.4.0

### [0.9.0]

### Added

- This change log file
- Response types now have nested types correctly documented
- The response type processing functions now have arguments for the number of levels to expand nested types
- API explorer's default expansion depth is one level deep
- Added [`ExploreType`](/packages/api-explorer/src/components/ExploreType/ExploreType.tsx) and [`ExploreProperty`](/packages/api-explorer/src/components/ExploreType/ExploreProperty.tsx) components used to display responses and explore the type on the type page