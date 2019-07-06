# SDK Codegen

This Looker Open Source repository is released under the MIT license. By using this repository, you agree to the terms of that license, and acknowledge that you are doing so at your own risk.

While Looker has developed and tested these scripts internally, we cannot guarantee that the open-source tools used by the scripts in this repository have not been modified with malicious code.

Our goal is to help people who want use Looker as a platform, get up and running quickly, largely by providing pre-built client SDKs in the most popular languages, and curating consistency across all languages and platforms.

The Looker API is defined with the [OpenAPI specification](https://github.com/OAI/OpenAPI-Specification), formerly known as "swagger." This specification is used to produce both Looker's interactive API Explorer, and the Looker API language bindings via a JSON file that describes the Looker REST API.

## The parts of the Looker SDK

The Looker SDK has several parts:

* **Looker API** OpenAPI specification (e.g., found at
  `https://<your-looker-endpoint>:19999/api/3.1/swagger.json`)

* The **Looker API Explorer**, generated in the Looker web app directly from our version-specific OpenAPI specification, provided with each Looker server instance.

* **API bindings**, generated for each language from the versioned OpenAPI specification via [OpenAPI Generator](https://github.com/OpenAPITools/openapi-generator). This process converts the API specification to language-specific code. Most of these template-based generators are written by different language enthusiasts, so the pattern and quality of the generated code varies widely, even though most generated code tends to work acceptably.

* **Language SDKs**, "smarter" client language classes and methods to improve usability of the API binding. (These are under development.)

## Generating an API language binding

By using the yarn/node app included in this project, you now have three steps to generate language bindings:

* configure a `looker.ini` file so the specification can be retrieved from your server

* specify the client language(s) you want to generate in either [`targetLanguages.ts`](targetLanguages.ts) (for Node) or [`target_languages.txt`](target_languages.txt) for bash.

* run the generator

* **Note**: [Generating Client SDKs for the Looker API](https://discourse.looker.com/t/generating-client-sdks-for-the-looker-api/3185) describes the manual steps for generating an API language binding. This project replaces these manual steps with automated tools.

## Configuring `looker.ini`

The API configuration values should be stored in a file called `looker.ini`. By default, the configuration file needs to be in the same folder as generation script.

To create `looker.ini`, copy [`looker-sample.ini`](looker-sample.ini) to `looker.ini` and fill in the required values. You can find `client_id` and `client_secret` by following the instructions in [Generating Client SDKs for the Looker API](https://discourse.looker.com/t/generating-client-sdks-for-the-looker-api/3185).

For your own source code repositories, be sure to configure your version control system to ignore your configuration `.ini` file so it doesn't accidentally get checked in somewhere unauthorized people can see it.

To simplify configuration tasks (and to help ensure you *never* commit your credentials into a source code repository) the SDKs provided by Looker use a configuration file to save/retrieve their API configuration settings, so no credentials should end up being stored in the source code.

### Using the yarn/node-based generator

If you don't have `yarn` installed already, you'll need to [install](https://yarnpkg.com/en/docs/install) it.

After yarn is installed, just run `yarn` from your terminal window/command line, and it will download or update all the packages required to run the code generator. If you are curious, you can look at [package.json](package.json) to see what resources are required to run the code generator.

Run the generator with the command:

```bash
yarn generate
```

The generator will:

* read the Looker API configuration(s) from the `looker.ini` file.

  * **Note**: There should be at most 2 entries in `looker.ini`: one for API version 3.1. and one for 3.0. Because 3.1 is a superset of 3.0, you really only need 3.1

* download (if the file is not already present) the Looker API specification file(s) from the configured Looker server(s)

* convert (if the converted file is not already present) the downloaded Swagger 2 specification file(s) to OpenAPI 3.x

* validate the OpenAPI 3.x file(s)

* by default, call the code generator for each active language configured in [`targetLanguages.ts`](targetLanguages.ts)

  * Comment out any language you don't want to generate, or uncomment or add the languages you do want to generate.

When the generator completes successfully, the output will be similar to:

```plain-text
python
  looker
    rtl
      (run-time library hand-written files here)
    sdk
      methods.py (automatically generated)
      models.py (automatically generated)
```

**Note:** If you're unable to download the API specification file because you're using an instance of Looker that is not secured and errors are being thrown, you can explicitly turn off TLS verification with a command like:

```bash
NODE_TLS_REJECT_UNAUTHORIZED="0" yarn generate
```

#### View the specification interactively

When `yarn generate` completes successfully, the OpenAPI 3.x specification file is available locally, so you can search and explore the api using a command similar to the following:

```bash
yarn view Looker.3.1.oas.json
```

This command will start a web server on `http://localhost:5000` that allows you to browse and search the local specification file for API 3.1.

**Tip**: search for `query` or `dashboard` in the UI and see what you get!

#### Additional scripts

Use

```bash
yarn run
```

to see the list of all scripts that can be run by the code generator.

## API Troubleshooting

See the official documentation for [API Troubleshooting](https://docs.looker.com/reference/api-and-integration/api-troubleshooting) suggestions.

## Notes

In addition to swagger being deprecated, this [visual guide](https://blog.readme.io/an-example-filled-guide-to-swagger-3-2/) shows why OpenAPI 3.x is preferred to Swagger 2.x.
