# npm install -g grunt-cli; grunt build; node app.js

if [ -d "./dist" ]; then
  echo "Dist detected. Starting Node.js..."
  node app.js
else
  echo "No dist detected. Building app..."
  npm install -g grunt-cli && grunt build
  if [ "$?" = "0" ]; then
    echo "Starting Node.js..."
    node app.js
  else
  	exit 1
  fi
fi