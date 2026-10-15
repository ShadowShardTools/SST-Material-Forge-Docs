import {readFileSync} from 'node:fs';
import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * The version of SST Material Forge these pages describe: the one the node
 * reference was exported from (`data/nodes.json`), so the label cannot say one
 * version while the pages describe another. Earlier versions, archived by
 * `npm run archive-version`, are listed beside it in `versions.json`.
 */
const APP_VERSION: string = JSON.parse(readFileSync(new URL('./data/nodes.json', import.meta.url), 'utf8')).version;

const config: Config = {
  title: 'SST Material Forge',
  tagline: 'Node-based procedural PBR materials, evaluated on your GPU',
  favicon: 'img/icon.svg',

  future: {
    v4: true,
    faster: {
      // SWC's HTML minifier loads a native binary from a cache it first checks
      // for safe permissions, and refuses on Windows machines whose user or data
      // folders grant other accounts write access. The rest of the faster
      // toolchain is unaffected, and CI (Linux) keeps the SWC minifier; locally
      // on Windows the HTML is minified by the slower JavaScript one instead.
      swcHtmlMinimizer: process.platform !== 'win32',
    },
  },

  // Served by GitHub Pages as a project site:
  // https://shadowshardtools.github.io/SST-Material-Forge-Docs/
  url: 'https://shadowshardtools.github.io',
  baseUrl: '/SST-Material-Forge-Docs/',
  organizationName: 'ShadowShardTools',
  projectName: 'SST-Material-Forge-Docs',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  markdown: {
    // The node reference anchors each node by its type (`## Warp {#warp}`), so a
    // link to a node survives its label being reworded.
    mdx1Compat: {
      headingIds: true,
    },
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          // The documentation is the site: it lives at the root, not under /docs.
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          // No "Edit this page": the guide is imported from the application's
          // own guide and the node reference is generated, so an edit made here
          // would be overwritten. See README.md.
          //
          // Versioned by the application's own versions: these pages are the
          // current one, at the root; an archived version lives under its number.
          lastVersion: 'current',
          versions: {
            current: {label: APP_VERSION, path: '', badge: true, banner: 'none'},
          },
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        indexBlog: false,
        docsRouteBasePath: '/',
        highlightSearchTermsOnTargetPage: true,
        searchResultLimits: 10,
      },
    ],
  ],

  themeConfig: {
    image: 'img/icon.svg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'SST Material Forge',
      logo: {
        alt: 'SST Material Forge',
        src: 'img/icon.svg',
      },
      items: [
        {type: 'docSidebar', sidebarId: 'guide', position: 'left', label: 'Guide'},
        {type: 'docSidebar', sidebarId: 'nodes', position: 'left', label: 'Node reference'},
        {type: 'docsVersionDropdown', position: 'right'},
        {
          href: 'https://github.com/ShadowShardTools/SST-Material-Forge-Docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Guide',
          items: [
            {label: 'Introduction', to: '/intro'},
            {label: 'Building a material', to: '/guide/building-a-material'},
            {label: 'Saving and exporting', to: '/guide/saving-and-exporting'},
          ],
        },
        {
          title: 'Reference',
          items: [
            {label: 'Node reference', to: '/nodes'},
            {label: 'Keyboard shortcuts', to: '/guide/keyboard-shortcuts'},
          ],
        },
        {
          title: 'More',
          items: [
            {label: 'Documentation source', href: 'https://github.com/ShadowShardTools/SST-Material-Forge-Docs'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ShadowShardTools.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
