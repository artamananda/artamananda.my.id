module.exports = {
  apps: [
    {
      name: "arta-web",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      watch: true,
      exp_backoff_restart_delay: 100,
    },
  ],
};
