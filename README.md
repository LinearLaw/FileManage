# 安装依赖

    npm i 
    npm i supervisor -g

# 启动服务

## 开发环境
    
    启动后台服务
        supervisor -i ./webapp app.js
        
    启动前台服务
        node ./app_injection.js
        
        cd ./webapp/v2

        npm run serve


## 生产环境

    node ./app_injection.js

    cd ./webapp/v2

    npm run build

    cd ../../

    cmd /k "node app.js"

    


