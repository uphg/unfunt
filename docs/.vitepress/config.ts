import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/unfunt/',
  title: 'Unfunt',
  description: 'A collection of utility functions for TypeScript/JavaScript',

  locales: {
    root: {
      label: 'English',
      lang: 'en'
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/'
    }
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/docs/' }
    ],

    sidebar: {
      '/docs/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Quick Start', link: '/docs/' },
            { text: 'GitHub Actions', link: '/docs/github-actions-guide' }
          ]
        },
        {
          text: 'API Reference',
          items: [
            { text: 'Overview', link: '/docs/overview' },
            { text: 'Array', link: '/docs/array' },
            { text: 'Function', link: '/docs/function' },
            { text: 'Number', link: '/docs/number' },
            { text: 'Object', link: '/docs/object' },
            { text: 'String', link: '/docs/string' },
            { text: 'Type Check', link: '/docs/typed' }
          ]
        }
      ],
      '/zh/docs/': [
        {
          text: '开始使用',
          items: [
            { text: '快速开始', link: '/zh/docs/' },
            { text: 'GitHub Actions', link: '/zh/docs/github-actions-guide' }
          ]
        },
        {
          text: 'API 参考',
          items: [
            { text: '概览', link: '/zh/docs/overview' },
            { text: '数组', link: '/zh/docs/array' },
            { text: '函数', link: '/zh/docs/function' },
            { text: '数字', link: '/zh/docs/number' },
            { text: '对象', link: '/zh/docs/object' },
            { text: '字符串', link: '/zh/docs/string' },
            { text: '类型检查', link: '/zh/docs/typed' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/uphg/unfunt' }
    ],
    search: {
      provider: 'local'
    },
    editLink: {
      pattern: 'https://github.com/uphg/unfunt/edit/master/docs/:path'
    }
  }
})
