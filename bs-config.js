module.exports = {
  proxy: 'http://localhost:3000', // Your local React app URL
  files: ['src/**/*.{js,css,html}'], // Files to watch
  port: 5501, // Port for BrowserSync
  open: false, // Prevents BrowserSync from automatically opening a browser
  notify: false, // Disable notifications
  reloadDelay: 500, // Delay before reloading
  host: '172.25.176.1',
};
