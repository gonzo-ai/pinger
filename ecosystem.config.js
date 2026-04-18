module.exports = {
  apps: [
    {
      name: "supabase-pinger-web",
      script: "npm",
      args: "start",
      env: {
        PORT: 3000,
        NODE_ENV: "production",
      }
    },
    {
      name: "supabase-pinger-cron",
      script: "cron.js",
      env: {
        NODE_ENV: "production",
      }
    }
  ]
};
