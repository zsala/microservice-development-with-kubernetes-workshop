# Node.js boilerplate for building singlepage web apps

This is a node.js [boilerplate](http://en.wikipedia.org/wiki/Boilerplate_code) for building singlepage web applications. It is not a library or a reusable module. It is a repo you can [fork](https://help.github.com/articles/fork-a-repo) and use as a starting point for a new project. It is intended that you will tweak and adjust files and directories in this repo so it fits your needs.

This is a boilerplate used as the fundamental structure to develop and serve singlepage applications at [A-Media AS](http://amedia.no/?page_id=16).


## Why?

By our definition singlepage web applications is build by html, css, javascript and graphics. In a singlepage web application all rendering and logic happens in the browser. The singlepage web application get all its data as JSON from REST APIs or through socket or long polling connections.

No rendering of markup is done on the server. The servers role is to serve the singlepage web application as static files and provide data access in form of a REST API or a socket or long polling connection.

Given this definition the developer(s) coding the singlepage web application will be working only with code executed in the browser. During development it is desirable to keep a certain structure of our code. We want to separate and slice up the css, graphics and javascripts so its easy to maintain our code.

Though; when serving the singlepage web application to our users we want to concatinate, minify and make sure its optimized for fast deliverance to our users.

In other words; in development we want our code to look like this:

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="css/core.css">
  <link rel="stylesheet" href="css/module1.css">
  <link rel="stylesheet" href="css/module2.css">
  <title>Awesome App</title>
</head>
<body>
  <h1 id="head">Nice app</h1>
  <div id="main"> </div>
  <footer id="foot"> </footer>

  <!-- JavaScripts here -->
  <script src="js/core.js"></script>
  <script src="js/module1.js"></script>
  <script src="js/module2.js"></script>
</body>
</html>
```

When serving it to our users, we want it to look like this:

```html
<!doctype html><html manifest="manifest.appcache"><head><meta charset="utf-8"><title>Awesome App</title><link href="css/app.min.css" rel="stylesheet"></head><body><h1 id="head">Nice app</h1><div id="main"></div><footer id="foot"></footer><script src="js/app.min.js"></script></body></html>
```

There is [plenty of](http://developer.yahoo.com/performance/rules.html) [reasons why](https://developers.google.com/speed/docs/best-practices/rules_intro) [we want to serve our application like this](http://calendar.perfplanet.com/).


## What?

This boilerplate consist of two parts: a build script and a server which will act as a http server and possibly a REST API / socket / long polling provider.

### The server

The server, [node.js](http://nodejs.org/), will act as a http server serving all static files from a source directory in development.

By putting the server in a production environment, the same server will serve the pre built singlepage web application.

Any REST API, sockets or long polling connections you implement in the server will then have the same relative URLs in both development and production. This laverage the difference between development and production and makes it possible to work on separate files in development and having a highly optimized web application served in production.

It is very easy to switch to serving the pre build web application in development so one can test that everything is as it should after the build process.

### The build script

The build script will take the index.html file in the source directory and analyze its content. Based on what it finds, the script it will:

 - Create a build located in the dist directory. The source directory will be left untouched.
 - Take all references to local .js files in the index.html and concatinate the files into one .js file. In the index.html file, the DOM elements refering to the previous .js files will be removed and replaced with a new DOM element refering to the concatinated .js file.
 - Minify the concatinated .js file with the latest version of [UglifyJS](https://github.com/mishoo/UglifyJS2).
 - Take all references to local .css files in the index.html and concatinate the files into one .css file. In the index.html file, the DOM elements refering to the previous .css files will be removed and replaced with a new DOM element refering to the concatinated .css file.
 - Minify the concatinated .css file with the latest version of [clean-css](https://github.com/GoalSmashers/clean-css).
 - Base64 encode all graphics under 4k in size refered to in the .css files replaced the reference with a [data URI](http://en.wikipedia.org/wiki/Data_URI_scheme) holding the base64 encoded version.
 - Remove all whitespace between tags in index.html. Child elements of pre and textinput tags will be left untouched.
 - Fix semantic errors in the index.html.
 - Minify all inline javascript and css with the same minifying tools used for minifying the .js and .css files.
 - Create an application.cache manifest file which holds a reference to the files put in the dist directory and append a reference to it in the index.html file.

### Why a build process?

This could be done on run time by the server in production. A build process removes the need for running such a process run time and leaves the server to just serve static files and provide data access. Iow: less to do for the server.

A very good reason why one would like to build a package of files is that the build can be gziped and uploaded to services such as [PhoneGap Build](https://build.phonegap.com/) to produce instalable iOS, Android, Win etc applications.

The same gzipped package can also go into web application stores such as [Google Web Store](https://chrome.google.com/webstore/) and [Mozilla Marketplace](http://www.mozilla.org/en-US/apps/) etc.


## Getting up and running

Its fairly easy getting up and running. The first thing you need is to [fork this repo](https://help.github.com/articles/fork-a-repo) into your desired destination. Where you select to fork into is from now on in this document refered to as _project root_.

You also need node.js. [Download and install node.js]([fork](https://help.github.com/articles/fork-a-repo) according to their documentation.

In your _project root_, type the following command to install the different libraries needed by the build script and http server to work:

```bash
npm install
```

You should now be able to start the local http server by running:

```bash
npm start
```

You should then get served the files found in the *src* directory under _project root_ at [http://localhost:8080/](http://localhost:8080/).

### Creating a build

The build script is written in [Jake](https://github.com/mde/jake). To create a build you need to run the Jake build command. This is done by running the following command in your _project root_:

```bash
jake build
```

The build should now be found in the *dist* directory under your _project root_.

### Serving the build locally

After creating a build you can serve the build locally to see if it acts as it should. We do so by telling our http server that it should run in production mode. You do so by running the folloing command followed by restaring / staring the app again:

```bash
npm config set <nameOfYourApp>:prod true
```

Then the files found in the *dist* directory under your _project root_ should be served at [http://localhost:8080/](http://localhost:8080/).

You can switch back to serving the source files in *src* directory under your _project root_ again by the following command:

```bash
npm config set <nameOfYourApp>:prod false
```

In the above commands you need to replace the <nameOfYourApp> with the name of the app which is defined under the "name" attribute in the package.json file in your _project root_. In other words, the commands will look something like this (default builerplate name):

```bash
# Switching to prod mode
npm config set singlepage:prod true

# Switching to dev mode
npm config set singlepage:prod false
```


### Detailed overview

This is a boilerplate. Your supposed to modify this to suite your needs. Hopefully what you will be modifying the most is the server and html, css, javascript and graphics in the source. Here is an overview of the roles of each file / directory.

## Directories and files

 - ```/src/``` - This is the source directory where source files should go. The build script will read from this directory.
 - ```/dist/``` - This is the build or distribution directory. This is the place where the build script will place the finished build. This is the files which is supposed to be put in production.
 - ```/bin/``` - This directory keeps the http / application server in form of a ```server.js```. This is where you should build your REST API or what ever the server should serve dynamicly.
 - ```/assets/``` - This directory holds files which should not go into the build process. When starting the http / application server, this directory will be _mounted_ at root of the http server and any files under this directory will be staticly served.
 - ```/package.json``` - In fact this boilerplate is a node.js module. This file is the [module configuration](https://npmjs.org/doc/json.html) and holds name of the module, dependencies etc.
 - ```/Jakefile.js``` - This is the build script which does all the work defined under [the build script](#the-build-script) above.