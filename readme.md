1.npm install -g express-generator
2.express --version
2.2(如果express --version 有問題 系統管理員身分開啟Power shell) ==> Set-ExecutionPolicy RemoteSigned ==> 輸入A 
3.express -f 專案名稱
4.start方式:npm start  or  node ./bin/www 



nodemon:
5.npm i -g nodemon
6.nodemon /bin/www

pm2:
7.npm i pm2 -g
8.執行:pm2 start -i 4 --name server ./bin/www
9.暫停:pm2 delete server

mysql:
10.npm install body-parser mysql

預防xss:
11.npm install xss