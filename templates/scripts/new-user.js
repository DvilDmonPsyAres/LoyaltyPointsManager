const fs = require('fs');

// Get the file contents of the profile-page.html as a string
const htmlTemplate = fs.readFileSync('./profile-page.html', 'utf-8');

const htmlPage = htmlTemplate
  // replace all instances of #{username} in the HTML file with 'DemoUser'
  .replace(/#{username}/g, 'DemoUser')
  // replace all instances of #{biography} in the HTML file with 'Hello World!'
  .replace(/#{biography}/g, 'Hello World!');
