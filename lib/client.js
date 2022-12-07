import { createClient } from 'microcms-js-sdk'


export const client_blog = createClient ({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN_BLOG,
  apiKey: process.env.MICROCMS_API_KEY_BLOG,
})

export const client_page = createClient ({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN_PAGE,
  apiKey: process.env.MICROCMS_API_KEY_PAGE,
})

export const client_news = createClient ({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN_NEWS,
  apiKey: process.env.MICROCMS_API_KEY_NEWS,
})

export const client_opt = createClient ({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN_OPT,
  apiKey: process.env.MICROCMS_API_KEY_OPT,
})

export const client_nav = createClient ({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN_NAV,
  apiKey: process.env.MICROCMS_API_KEY_NAV,
})