module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  host: env('HOST'),
  port: env.int('PORT'),
  serveAdminPanel: env.bool('SERVE_ADMIN', true),
  url: env('ADMIN_URL'),
});
