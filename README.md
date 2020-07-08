# Authentication in Angular using JWT

This project was generated with [Angular CLI](https://github.com/angular/angular-cli){:target="_blank"} version 8.3.19.
### Prerequisites

You need to have following software installed in order to run this application

* Node.js - [Download](https://nodejs.org/en/download/){:target="_blank"}
* MongoDB Server - [Download](https://www.mongodb.com/download-center/community){:target="_blank"}

### Setup Environment (Important)
Set the following in environment variable:
* node.exe
* mongo.exe
* mongod.exe

Make sure all these mentioned above should run from anywhere
### Installation Steps
##### Step 1: Download
Download & extract the project folder in any directory
##### Step 2: Open Terminal
Open terminal and move inside your projects root folder (i.e angular-nodejs-authentication)
```
cd path\to\your\project\angular-nodejs-authentication
```
##### Step 3: Run Batch File
To configure database and start your application run following batch file on terminal(One time process):
```
installDependencies.bat
configAndRunApp.bat
```
Further to start your application run following batch file:
```
startApp.bat
```
##### Step 4: Run on browser
Open any browser(eg. chrome) and enter following url to run your application:
```
http://localhost:4200
```

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io){:target="_blank"}.

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/){:target="_blank"}.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md){:target="_blank"}.
