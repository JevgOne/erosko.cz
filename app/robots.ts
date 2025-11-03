import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin_panel',
          '/inzerent_dashboard',
          '/prihlaseni',
          '/registrace',
        ],
      },
    ],
    sitemap: 'https://erosko.cz/sitemap.xml',
  };
}
