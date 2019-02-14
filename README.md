# 安装依赖

        npm i 
        cd ./webapp/v2
        npm i

    后台全局依赖
        npm i supervisor -g
    
    前台全局依赖
        npm i @vue/cli -g 

# 启动服务

## 开发环境

    nodeJS版本：v10.5.0，版本号大于等于这个应该都能跑。
    
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

    


