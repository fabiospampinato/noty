
/* HOT */

interface NodeModule {
  hot: {
    accept: ( module?: string | Function, callback?: Function ) => void
  }
}

/* WEBPACK */

declare module 'webpack-dev-middleware';
declare module 'webpack-hot-middleware';

declare module "*.svg" {
  const content: any;
  export default content;
}

declare module "*.json" {
  const content: any;
  export default content;
}

/* ENVIRONMENT */

declare const ENVIRONMENT: string;
declare const DEVELOPMENT: boolean;
declare const PRODUCTION: boolean;
