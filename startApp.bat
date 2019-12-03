REM Start DB Server
start cmd /k mongod --dbpath %dbPath%\data\ --logpath %dbPath%\log\db.log

REM Start Node & Angular Server
start cmd /k npm start
cd server
start cmd /k node app
cd ../
