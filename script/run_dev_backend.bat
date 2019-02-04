cd ../

node ./app_injection 

cmd /k "supervisor -i ./webapp app.js"

