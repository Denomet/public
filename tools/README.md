# datagrok-tools

Utility to upload and publish [packages](https://datagrok.ai/help/develop/develop#packages) to Datagrok.

## Installation

```
npm install datagrok-tools -g
```

## Usage

1. Configure your environment with the following command:  
    ```
    grok config
    ```
    Enter developer keys and set the default server. The developer key can be retrieved from your user profile (for example, see https://public.datagrok.ai/u).
2. Create a new package by running this command:
    ```
    grok create <package-name>
    ```
    A new folder `<package-name>` will be created automatically as well as its contents.
3. Run `npm install` in your package directory to get the required dependencies.
4. Start working on the functionality of your package. Use `  grok add` to create function templates.
5. Once you have completed the work on your package, upload it by running:
    ```
    grok publish
    ```

Run `grok` for instructions and `grok <command> --help` to get help on a particular command.

Read more about package development in [Datagrok's documentation](https://datagrok.ai/help/develop/develop).

## Commands

- `config` creates or updates a configuration file.
  The command shows the location of the config file with the developer keys and offers to interactively change them.
  It is also possible to reset the current configuration.
- `create` adds a package template to the current working directory when used without the `name` argument.
  The directory must be empty:
  ```
  grok create
  ```
  When called with an argument, the command creates a package in a folder with the specified name:
  ```
  grok create <package-name>
  ```
  Package name may only include letters, numbers, underscores, or hyphens.
  Read more about naming conventions [here](https://datagrok.ai/help/develop/develop#naming-conventions).
  Options:
    - `--ide` adds an IDE-specific configuration for debugging (vscode)
    - `--ts` creates a TypeScript package template
- `add` puts an object template to your package:
  ```
  cd <package-name>
  grok add app <name>
  grok add connection <name>
  grok add detector <semantic-type-name>
  grok add function [tag] <name>
  grok add query <name>
  grok add script [tag] <language> <name>
  grok add view <name>
  grok add viewer <name>
  ```
  In general, entity names follow naming rules for functions. Views and viewers should have class names,
  we recommend that you postfix them with 'View' and 'Viewer' respectively.
  Supported languages for scripts are `javascript`, `julia`, `node`, `octave`, `python`, `r`.
  Available function tags: `panel`, `init`.
- `publish` uploads a package to the specified server (pass either a URL or a server alias from the `config.yaml` file).
  ```
  cd <package-name>
  grok publish [host]
  ```
  Options:
    - `--build` or `--rebuild`: boolean flags that indicate whether a local webpack bundle should be used
    or it should be generated on the server side
    - `--debug` or `--release`: boolean flags that determine whether to publish a debug version of the package
    visible only to the developer or a release version accessible by all eligible users and user groups
    - `--key`: a string containing a developer key that is not listed in the config file, e.g., the key for a new server
    - `--suffix`: a string containing package version hash
  
  Running `grok publish` is the same as running `grok publish defaultHost --build --debug`.
