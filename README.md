# hyperapp-typescript-starter
Template for hyperapp projects.

## DEVELOPMENT
* Environment variable `webpack_devtool`  
  Choose a style of source mapping to enhance the debugging process  
  Available values: https://webpack.js.org/configuration/devtool/#devtool  
  Default: `cheap-source-map`
* Environment variable `env_name`  
  Allow to override providers depending on environment
  Default: none (`src/environment.ts` will be used)
* To enable sourcemaps for css, you must set `webpack_devtool = source-map`

## TODO
* add tslint tslint-react (when eslint-plugin-tslint will be fixed)
* https://developers.google.com/web/fundamentals/app-install-banners/
* Move to prod? offline plugin
* deploy app to device
* database (gundb)
* how to detect offline (dirty checking)

## RESOURCES
* https://github.com/lukejacksonn/hyperapp-pwa
* https://github.com/pocka/hyperapp-typescript-demo
* https://github.com/marcusasplund/hyperapp-todo-simple
