import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'selfhealthos',
  tagline: 'Track. Analyse. Improve. Your own health data, self-hosted.',
  favicon: 'img/favicon.ico',

  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  url: 'https://selfhealthos.github.io',
  baseUrl: '/',

  organizationName: 'selfhealthos',
  projectName: 'selfhealthos.github.io',

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
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
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/selfhealthos/selfhealthos.github.io/tree/main/',
        },
        blog: {
          blogTitle: 'Changelog',
          blogDescription: 'What changed in selfhealthos, release by release.',
          blogSidebarTitle: 'All releases',
          postsPerPage: 'ALL',
          showReadingTime: false,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/selfhealthos/selfhealthos.github.io/tree/main/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.png',
    colorMode: {
      // Dark is the brand's own default (see selfhealthos-style.png) -
      // matches the app itself, not just an OS-preference fallback.
      defaultMode: 'dark',
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'selfhealthos',
      logo: {
        alt: 'selfhealthos',
        src: 'img/logo-mark.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {to: '/docs/features/overview', label: 'Features', position: 'left'},
        {to: '/docs/roadmap', label: 'Roadmap', position: 'left'},
        {to: '/blog', label: 'Changelog', position: 'left'},
        {
          href: 'https://github.com/selfhealthos/selfhealthos',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {label: 'Getting started', to: '/docs/getting-started/installation'},
            {label: 'Feature list', to: '/docs/features/overview'},
            {label: 'Self-hosting', to: '/docs/self-hosting/docker-compose'},
          ],
        },
        {
          title: 'Project',
          items: [
            {label: 'Roadmap', to: '/docs/roadmap'},
            {label: 'Changelog', to: '/blog'},
            {label: 'App repository', href: 'https://github.com/selfhealthos/selfhealthos'},
            {
              label: 'Report an issue',
              href: 'https://github.com/selfhealthos/selfhealthos/issues',
            },
          ],
        },
        {
          title: 'License',
          items: [
            {
              label: 'App: AGPLv3',
              href: 'https://github.com/selfhealthos/selfhealthos/blob/main/LICENSE',
            },
            {label: 'Docs content: CC BY 4.0', href: 'https://creativecommons.org/licenses/by/4.0/'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} the selfhealthos project. Docs content licensed CC BY 4.0.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
