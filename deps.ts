import type { PagicLayout, PageProps } from 'https://deno.land/x/pagic@v1.2.0/mod.ts';
import type { PagePropsSidebar } from 'https://deno.land/x/pagic@v1.2.0/src/plugins/sidebar.tsx';
// @deno-types="https://cdn.pagic.org/@types/react@16.9.50/index.d.ts"
import * as React from 'https://cdn.pagic.org/react@16.13.1/esnext/react.development.js';
// @deno-types="https://cdn.pagic.org/@types/react-dom@16.9.8/index.d.ts"
import * as ReactDOM from 'https://cdn.pagic.org/react-dom@16.13.1/esnext/react-dom.development.js';
// @deno-types="https://cdn.pagic.org/@types/react-dom@16.9.8/server/index.d.ts"
import * as ReactDOMServer from 'https://cdn.pagic.org/react-dom@16.13.1/esnext/server.development.js';

(window as any).React = React;
(window as any).ReactDOM = ReactDOM;

export type { PagicLayout, PageProps, PagePropsSidebar };
export { React, ReactDOM, ReactDOMServer };
