 @10up/frontity-webpack-config

> This package extends frontity default webpack and babel config

[![Support Level](https://img.shields.io/badge/support-active-green.svg)](#support-level)

## Requirements
- @frontity/core >= 1.14.0

## Installation

To install this package you will need an existing frontity project. Check out the [frontity docs](https://docs.frontity.org/getting-started/quick-start-guide) for instructions.

Install this package:

```
npm install @10upfrontity-build-config --save
```

Then in your `frontitiy.settings.[js|ts]` add the package in the `packages` section.

```js
packages: [
    '@10upfrontity-build-config',
]
```

## Settings

This package accepts a `publicPath` setting in case you're building frontity with a different public path for your assets.

```js
{
    name: '@10upfrontity-build-config',
    state: {
        TenUpBuildConfig: {
            publicPath: '/custom-public-path'
        }
    }
}
```

The the css is compiled to `/build/[publicPath]/css/index.css` and automatically included in the header.

## Features

### Global Sass and PostCSS

Just import the sass or postcss files anywhere and they will automatically be loaded on the page.


```js
import '../assets/index.scss';
import '../assets/index.css';
```

```css
/* assets/index.css */
a {
    color: blue !important;
}
/* assets/index.scss */
header {
    h1.heading-size-1 {
        color: pink;
    }
}
```

### CSS Modules

```js
import styles from './index.module.css';

const App = () => {
    return (
        <div className={styles.mainContent}></div>
    );
}
```

```css
/* index.module.css */
.mainContent {
    min-height: calc(100vh - 190px);
}
``` 

### HMR

Hot Module Reload works out of the box.