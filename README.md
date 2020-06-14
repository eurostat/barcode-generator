eurostat-barcode-generator is a re-usable, easy interface JavaScript barcode graph generation library, based on D3 v4+.

## Questions?
If you have any questions, checkout the previous posts or create a new one at:
- [Issue with 'question' label](https://github.com/eurostat/barcode-generator/issues?utf8=%E2%9C%93&q=label%3Aquestion)

## Download and Installation

### Installation with npm

```bash
$ npm install eurostat-barcode-generator
```

### Using CDN

If you want to use 'eurostat-barcode-generator' without installation, load files directly from one of the CDN providers.

- unpkg: https://unpkg.com/eurostat-barcode-generator/dist/

## Supported Browsers

> Basically will work on all SVG supported browsers.

|Internet Explorer|Chrome|Firefox|Safari|iOS|Android|
|---|---|---|---|---|---|
|9+|Latest|Latest|Latest|8+|4+|


## Dependency

|[D3](https://d3js.org/) (required)|
| --- |
| 4+ |

eurostat-barcode-generator already bundles the necessary d3 modules. We have chosen it this way, as we can easier control the tree-shaking etc.

```html
<!-- 1) simply reference the eurostat-barcode-generator script -->
    <script src="$YOUR_PATH/eurostat-barcode-generator.js"></script>
```

or use importing ESM.

```js
// 1) import eurostat-barcode-generator.js
// as named import
import * as barcode from "eurostat-barcode-generator";

// or by directly importing the methods
import { generateBarcode, triggerHover } from "eurostat-barcode-generator";
```

## Basic usage example

#### 1) Create chart holder element
```html
<div id="barcode"></div>
```

#### 2) Generate a chart with options
```js
// generate the chart
var chart = barcode.generateBarcode({
    bindto: "#barcode",
    data: {
      json: [
            {id: 'DE1', value: 250, name: 'test}
        ]
    }
});

// call some API
barcode.triggerHover( 'DE1' );
```

## How to start developing eurostat-barcode-generator?

For anyone interested in developing the eurostat-barcode-generator, follow the instructions below.
> Required Node.js version: `10.10.0+`

### Development Environment

#### 1. Clone the repository

Clone the eurostat-barcode-generator repository and install the dependency modules.

```bash

# Clone the repository.
$ git clone https://github.com/eurostat/barcode-generator.js.git
```

#### 2. Install dependencies
`npm` and `Yarn` are supported.

```
# Install the dependency modules.
$ npm install

# or
$ yarn
```

#### 3. Build

Use npm script to build eurostat-barcode-generator

```bash
# Run webpack-dev-server for development
$ npm start

# Build
$ npm run build

# Generate jsdoc
$ npm run jsdoc
```

Two folders will be created after the build is completed.

- **dist** folder: Includes the **barcode-generator.js** and **barcode-generator.min.js** files.
- **doc** folder: Includes API documentation. The home page for the documentation is **doc/index.html**.

## Bug Report

If you find a bug, please report to us by posting [issues](https://github.com/eurostat/barcode-generator/issues) on GitHub.


<!-- links -->
[link-download]: https://npm-stat.com/charts.html?package=eurostat-barcode-generator&from=2020-06-08
[link-version]: https://www.npmjs.com/package/eurostat-barcode-generator.js
