# npm install -g grunt-cli; grunt build; node app.js

if [ -d "./dist" ]; then
  echo "Dist detected. Starting Node.js..."
  node app.js
else
  echo "No dist detected. Building app..."
  npm install -g grunt-cli
  grunt build
  echo "Starting Node.js..."
  node app.js
fi