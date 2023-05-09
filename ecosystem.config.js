module.exports = {
  apps: [
    {
      name: 'nuxt-template-webportal',
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      script: './node_modules/nuxt/bin/nuxt.js',
      cron_restart: '* 0 * * *', // Restart every day at midnight
      args: 'start'
    }
  ]
}
