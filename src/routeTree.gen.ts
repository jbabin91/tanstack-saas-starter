/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root';
import { Route as PublicRouteImport } from './routes/_public/route';
import { Route as AuthRouteImport } from './routes/_auth/route';
import { Route as AppRouteImport } from './routes/_app/route';
import { Route as PublicIndexImport } from './routes/_public/index';
import { Route as AppDemosStartServerFuncsImport } from './routes/_app/demos/start/server-funcs';
import { Route as AppDemosStartApiRequestImport } from './routes/_app/demos/start/api-request';
import { Route as AppDemosFormsSimpleImport } from './routes/_app/demos/forms/simple';
import { Route as AppDemosFormsDateRangePickerImport } from './routes/_app/demos/forms/date-range-picker';
import { Route as AppDemosFormsDatePickerImport } from './routes/_app/demos/forms/date-picker';
import { Route as AppDemosFormsCalendarImport } from './routes/_app/demos/forms/calendar';
import { Route as AppDemosFormsAddressImport } from './routes/_app/demos/forms/address';
import { Route as AppDemosDataTableImport } from './routes/_app/demos/data/table';
import { Route as AppDemosDataQueryImport } from './routes/_app/demos/data/query';

// Create/Update Routes

const PublicRouteRoute = PublicRouteImport.update({
  id: '/_public',
  getParentRoute: () => rootRoute,
} as any);

const AuthRouteRoute = AuthRouteImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any);

const AppRouteRoute = AppRouteImport.update({
  id: '/_app',
  getParentRoute: () => rootRoute,
} as any);

const PublicIndexRoute = PublicIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => PublicRouteRoute,
} as any);

const AppDemosStartServerFuncsRoute = AppDemosStartServerFuncsImport.update({
  id: '/demos/start/server-funcs',
  path: '/demos/start/server-funcs',
  getParentRoute: () => AppRouteRoute,
} as any);

const AppDemosStartApiRequestRoute = AppDemosStartApiRequestImport.update({
  id: '/demos/start/api-request',
  path: '/demos/start/api-request',
  getParentRoute: () => AppRouteRoute,
} as any);

const AppDemosFormsSimpleRoute = AppDemosFormsSimpleImport.update({
  id: '/demos/forms/simple',
  path: '/demos/forms/simple',
  getParentRoute: () => AppRouteRoute,
} as any);

const AppDemosFormsDateRangePickerRoute =
  AppDemosFormsDateRangePickerImport.update({
    id: '/demos/forms/date-range-picker',
    path: '/demos/forms/date-range-picker',
    getParentRoute: () => AppRouteRoute,
  } as any);

const AppDemosFormsDatePickerRoute = AppDemosFormsDatePickerImport.update({
  id: '/demos/forms/date-picker',
  path: '/demos/forms/date-picker',
  getParentRoute: () => AppRouteRoute,
} as any);

const AppDemosFormsCalendarRoute = AppDemosFormsCalendarImport.update({
  id: '/demos/forms/calendar',
  path: '/demos/forms/calendar',
  getParentRoute: () => AppRouteRoute,
} as any);

const AppDemosFormsAddressRoute = AppDemosFormsAddressImport.update({
  id: '/demos/forms/address',
  path: '/demos/forms/address',
  getParentRoute: () => AppRouteRoute,
} as any);

const AppDemosDataTableRoute = AppDemosDataTableImport.update({
  id: '/demos/data/table',
  path: '/demos/data/table',
  getParentRoute: () => AppRouteRoute,
} as any);

const AppDemosDataQueryRoute = AppDemosDataQueryImport.update({
  id: '/demos/data/query',
  path: '/demos/data/query',
  getParentRoute: () => AppRouteRoute,
} as any);

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_app': {
      id: '/_app';
      path: '';
      fullPath: '';
      preLoaderRoute: typeof AppRouteImport;
      parentRoute: typeof rootRoute;
    };
    '/_auth': {
      id: '/_auth';
      path: '';
      fullPath: '';
      preLoaderRoute: typeof AuthRouteImport;
      parentRoute: typeof rootRoute;
    };
    '/_public': {
      id: '/_public';
      path: '';
      fullPath: '';
      preLoaderRoute: typeof PublicRouteImport;
      parentRoute: typeof rootRoute;
    };
    '/_public/': {
      id: '/_public/';
      path: '/';
      fullPath: '/';
      preLoaderRoute: typeof PublicIndexImport;
      parentRoute: typeof PublicRouteImport;
    };
    '/_app/demos/data/query': {
      id: '/_app/demos/data/query';
      path: '/demos/data/query';
      fullPath: '/demos/data/query';
      preLoaderRoute: typeof AppDemosDataQueryImport;
      parentRoute: typeof AppRouteImport;
    };
    '/_app/demos/data/table': {
      id: '/_app/demos/data/table';
      path: '/demos/data/table';
      fullPath: '/demos/data/table';
      preLoaderRoute: typeof AppDemosDataTableImport;
      parentRoute: typeof AppRouteImport;
    };
    '/_app/demos/forms/address': {
      id: '/_app/demos/forms/address';
      path: '/demos/forms/address';
      fullPath: '/demos/forms/address';
      preLoaderRoute: typeof AppDemosFormsAddressImport;
      parentRoute: typeof AppRouteImport;
    };
    '/_app/demos/forms/calendar': {
      id: '/_app/demos/forms/calendar';
      path: '/demos/forms/calendar';
      fullPath: '/demos/forms/calendar';
      preLoaderRoute: typeof AppDemosFormsCalendarImport;
      parentRoute: typeof AppRouteImport;
    };
    '/_app/demos/forms/date-picker': {
      id: '/_app/demos/forms/date-picker';
      path: '/demos/forms/date-picker';
      fullPath: '/demos/forms/date-picker';
      preLoaderRoute: typeof AppDemosFormsDatePickerImport;
      parentRoute: typeof AppRouteImport;
    };
    '/_app/demos/forms/date-range-picker': {
      id: '/_app/demos/forms/date-range-picker';
      path: '/demos/forms/date-range-picker';
      fullPath: '/demos/forms/date-range-picker';
      preLoaderRoute: typeof AppDemosFormsDateRangePickerImport;
      parentRoute: typeof AppRouteImport;
    };
    '/_app/demos/forms/simple': {
      id: '/_app/demos/forms/simple';
      path: '/demos/forms/simple';
      fullPath: '/demos/forms/simple';
      preLoaderRoute: typeof AppDemosFormsSimpleImport;
      parentRoute: typeof AppRouteImport;
    };
    '/_app/demos/start/api-request': {
      id: '/_app/demos/start/api-request';
      path: '/demos/start/api-request';
      fullPath: '/demos/start/api-request';
      preLoaderRoute: typeof AppDemosStartApiRequestImport;
      parentRoute: typeof AppRouteImport;
    };
    '/_app/demos/start/server-funcs': {
      id: '/_app/demos/start/server-funcs';
      path: '/demos/start/server-funcs';
      fullPath: '/demos/start/server-funcs';
      preLoaderRoute: typeof AppDemosStartServerFuncsImport;
      parentRoute: typeof AppRouteImport;
    };
  }
}

// Create and export the route tree

interface AppRouteRouteChildren {
  AppDemosDataQueryRoute: typeof AppDemosDataQueryRoute;
  AppDemosDataTableRoute: typeof AppDemosDataTableRoute;
  AppDemosFormsAddressRoute: typeof AppDemosFormsAddressRoute;
  AppDemosFormsCalendarRoute: typeof AppDemosFormsCalendarRoute;
  AppDemosFormsDatePickerRoute: typeof AppDemosFormsDatePickerRoute;
  AppDemosFormsDateRangePickerRoute: typeof AppDemosFormsDateRangePickerRoute;
  AppDemosFormsSimpleRoute: typeof AppDemosFormsSimpleRoute;
  AppDemosStartApiRequestRoute: typeof AppDemosStartApiRequestRoute;
  AppDemosStartServerFuncsRoute: typeof AppDemosStartServerFuncsRoute;
}

const AppRouteRouteChildren: AppRouteRouteChildren = {
  AppDemosDataQueryRoute: AppDemosDataQueryRoute,
  AppDemosDataTableRoute: AppDemosDataTableRoute,
  AppDemosFormsAddressRoute: AppDemosFormsAddressRoute,
  AppDemosFormsCalendarRoute: AppDemosFormsCalendarRoute,
  AppDemosFormsDatePickerRoute: AppDemosFormsDatePickerRoute,
  AppDemosFormsDateRangePickerRoute: AppDemosFormsDateRangePickerRoute,
  AppDemosFormsSimpleRoute: AppDemosFormsSimpleRoute,
  AppDemosStartApiRequestRoute: AppDemosStartApiRequestRoute,
  AppDemosStartServerFuncsRoute: AppDemosStartServerFuncsRoute,
};

const AppRouteRouteWithChildren = AppRouteRoute._addFileChildren(
  AppRouteRouteChildren,
);

interface PublicRouteRouteChildren {
  PublicIndexRoute: typeof PublicIndexRoute;
}

const PublicRouteRouteChildren: PublicRouteRouteChildren = {
  PublicIndexRoute: PublicIndexRoute,
};

const PublicRouteRouteWithChildren = PublicRouteRoute._addFileChildren(
  PublicRouteRouteChildren,
);

export interface FileRoutesByFullPath {
  '': typeof PublicRouteRouteWithChildren;
  '/': typeof PublicIndexRoute;
  '/demos/data/query': typeof AppDemosDataQueryRoute;
  '/demos/data/table': typeof AppDemosDataTableRoute;
  '/demos/forms/address': typeof AppDemosFormsAddressRoute;
  '/demos/forms/calendar': typeof AppDemosFormsCalendarRoute;
  '/demos/forms/date-picker': typeof AppDemosFormsDatePickerRoute;
  '/demos/forms/date-range-picker': typeof AppDemosFormsDateRangePickerRoute;
  '/demos/forms/simple': typeof AppDemosFormsSimpleRoute;
  '/demos/start/api-request': typeof AppDemosStartApiRequestRoute;
  '/demos/start/server-funcs': typeof AppDemosStartServerFuncsRoute;
}

export interface FileRoutesByTo {
  '': typeof AuthRouteRoute;
  '/': typeof PublicIndexRoute;
  '/demos/data/query': typeof AppDemosDataQueryRoute;
  '/demos/data/table': typeof AppDemosDataTableRoute;
  '/demos/forms/address': typeof AppDemosFormsAddressRoute;
  '/demos/forms/calendar': typeof AppDemosFormsCalendarRoute;
  '/demos/forms/date-picker': typeof AppDemosFormsDatePickerRoute;
  '/demos/forms/date-range-picker': typeof AppDemosFormsDateRangePickerRoute;
  '/demos/forms/simple': typeof AppDemosFormsSimpleRoute;
  '/demos/start/api-request': typeof AppDemosStartApiRequestRoute;
  '/demos/start/server-funcs': typeof AppDemosStartServerFuncsRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  '/_app': typeof AppRouteRouteWithChildren;
  '/_auth': typeof AuthRouteRoute;
  '/_public': typeof PublicRouteRouteWithChildren;
  '/_public/': typeof PublicIndexRoute;
  '/_app/demos/data/query': typeof AppDemosDataQueryRoute;
  '/_app/demos/data/table': typeof AppDemosDataTableRoute;
  '/_app/demos/forms/address': typeof AppDemosFormsAddressRoute;
  '/_app/demos/forms/calendar': typeof AppDemosFormsCalendarRoute;
  '/_app/demos/forms/date-picker': typeof AppDemosFormsDatePickerRoute;
  '/_app/demos/forms/date-range-picker': typeof AppDemosFormsDateRangePickerRoute;
  '/_app/demos/forms/simple': typeof AppDemosFormsSimpleRoute;
  '/_app/demos/start/api-request': typeof AppDemosStartApiRequestRoute;
  '/_app/demos/start/server-funcs': typeof AppDemosStartServerFuncsRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths:
    | ''
    | '/'
    | '/demos/data/query'
    | '/demos/data/table'
    | '/demos/forms/address'
    | '/demos/forms/calendar'
    | '/demos/forms/date-picker'
    | '/demos/forms/date-range-picker'
    | '/demos/forms/simple'
    | '/demos/start/api-request'
    | '/demos/start/server-funcs';
  fileRoutesByTo: FileRoutesByTo;
  to:
    | ''
    | '/'
    | '/demos/data/query'
    | '/demos/data/table'
    | '/demos/forms/address'
    | '/demos/forms/calendar'
    | '/demos/forms/date-picker'
    | '/demos/forms/date-range-picker'
    | '/demos/forms/simple'
    | '/demos/start/api-request'
    | '/demos/start/server-funcs';
  id:
    | '__root__'
    | '/_app'
    | '/_auth'
    | '/_public'
    | '/_public/'
    | '/_app/demos/data/query'
    | '/_app/demos/data/table'
    | '/_app/demos/forms/address'
    | '/_app/demos/forms/calendar'
    | '/_app/demos/forms/date-picker'
    | '/_app/demos/forms/date-range-picker'
    | '/_app/demos/forms/simple'
    | '/_app/demos/start/api-request'
    | '/_app/demos/start/server-funcs';
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  AppRouteRoute: typeof AppRouteRouteWithChildren;
  AuthRouteRoute: typeof AuthRouteRoute;
  PublicRouteRoute: typeof PublicRouteRouteWithChildren;
}

const rootRouteChildren: RootRouteChildren = {
  AppRouteRoute: AppRouteRouteWithChildren,
  AuthRouteRoute: AuthRouteRoute,
  PublicRouteRoute: PublicRouteRouteWithChildren,
};

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>();

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_app",
        "/_auth",
        "/_public"
      ]
    },
    "/_app": {
      "filePath": "_app/route.tsx",
      "children": [
        "/_app/demos/data/query",
        "/_app/demos/data/table",
        "/_app/demos/forms/address",
        "/_app/demos/forms/calendar",
        "/_app/demos/forms/date-picker",
        "/_app/demos/forms/date-range-picker",
        "/_app/demos/forms/simple",
        "/_app/demos/start/api-request",
        "/_app/demos/start/server-funcs"
      ]
    },
    "/_auth": {
      "filePath": "_auth/route.tsx"
    },
    "/_public": {
      "filePath": "_public/route.tsx",
      "children": [
        "/_public/"
      ]
    },
    "/_public/": {
      "filePath": "_public/index.tsx",
      "parent": "/_public"
    },
    "/_app/demos/data/query": {
      "filePath": "_app/demos/data/query.tsx",
      "parent": "/_app"
    },
    "/_app/demos/data/table": {
      "filePath": "_app/demos/data/table.tsx",
      "parent": "/_app"
    },
    "/_app/demos/forms/address": {
      "filePath": "_app/demos/forms/address.tsx",
      "parent": "/_app"
    },
    "/_app/demos/forms/calendar": {
      "filePath": "_app/demos/forms/calendar.tsx",
      "parent": "/_app"
    },
    "/_app/demos/forms/date-picker": {
      "filePath": "_app/demos/forms/date-picker.tsx",
      "parent": "/_app"
    },
    "/_app/demos/forms/date-range-picker": {
      "filePath": "_app/demos/forms/date-range-picker.tsx",
      "parent": "/_app"
    },
    "/_app/demos/forms/simple": {
      "filePath": "_app/demos/forms/simple.tsx",
      "parent": "/_app"
    },
    "/_app/demos/start/api-request": {
      "filePath": "_app/demos/start/api-request.tsx",
      "parent": "/_app"
    },
    "/_app/demos/start/server-funcs": {
      "filePath": "_app/demos/start/server-funcs.tsx",
      "parent": "/_app"
    }
  }
}
ROUTE_MANIFEST_END */
