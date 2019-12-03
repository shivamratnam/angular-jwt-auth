set projPath=%cd%
cd /

REM Create DBPath
mkdir MongoDB1\Server\data
mkdir MongoDB1\Server\log

REM Get Database Path
cd MongoDB1\Server
set dbPath=%cd%
cd /

REM Start DB Server
start cmd /k mongod --dbpath %dbPath%\data\ --logpath %dbPath%\log\db.log
mongoimport --db angularAuth --collection users --file %projPath%\server\db_files\user.json --jsonArray

REM Start Node & Angular Server
cd %projPath%
start cmd /k npm start
cd server
start cmd /k node app
cd ../

