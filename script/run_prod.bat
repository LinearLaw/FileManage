cd ../

node ./app_injection

cd ./webapp/v2

npm run build

cd ../../

cmd /k "node app.js"