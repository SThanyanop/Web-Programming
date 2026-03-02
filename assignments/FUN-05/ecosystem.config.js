module.exports = {
  apps: [
    {
      name: "population-server",
      script: "./server/server.js",
      env: {
        NODE_ENV: "development",
      }
    },
    {
      name: "population-client",
      script: "npm",
      args: "run dev",
      cwd: "./client",
      // --- ESSENTIAL WINDOWS FIXES ---
      shell: true, 
      watch: false,
      env: {
        NODE_ENV: "development"
      }
    }
  ]
};