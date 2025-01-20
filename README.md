# Google APIs OpenAPI

This project contains OpenAPI specifications for various Google APIs. OpenAPI, formerly known as Swagger, is a specification for defining APIs, allowing both humans and computers to understand the capabilities of a service without accessing its source code.

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The goal of this project is to provide OpenAPI specifications for Google APIs, making it easier for developers to integrate with Google services. These specifications can be used to generate client libraries, API documentation, and other tools. The project automatically converts discovered APIs into OpenAPI documents daily, so users can simply download the generated OpenAPI files and start using them.

## Getting Started

To get started with using the OpenAPI specifications in this repository, follow these steps:

1. Clone the repository:

    ```sh
    git clone https://github.com/zuisong/googleapis-openapi.git
    ```

2. Navigate to the project directory:

    ```sh
    cd googleapis-openapi
    ```

3. Generate OpenAPI specifications:

    ```sh
    deno run main.ts
    ```

## Usage

You can use the OpenAPI specifications in this repository with various tools and libraries. For example, you can generate client libraries using [Swagger Codegen](https://swagger.io/tools/swagger-codegen/) or [OpenAPI Generator](https://openapi-generator.tech/).

## Contributing

We welcome contributions to this project! If you have OpenAPI specifications for Google APIs that are not included in this repository, please consider submitting a pull request.

1. Fork the repository.
2. Create a new branch:

    ```sh
    git checkout -b feature-branch
    ```

3. Make your changes and commit them:

    ```sh
    git commit -am 'Add new OpenAPI specification'
    ```

4. Push to the branch:

    ```sh
    git push origin feature-branch
    ```

5. Create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.
