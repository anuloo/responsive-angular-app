# responsive-angular-app
Another Angular driven simple responsive web app with pure css (yfs)
### Planning the project
1. first you pick your technologies and get all the dependecies packages
I picked angularjs and ui-google-map I also using gulp to automate my build process and run my local server
2. Start creating your folder structure for your app
3. Prepare your assets images icons 
4. Configure your gulp file for ease of use later on 
   1. Configure your file injection for all js css files
   2. setup browsersync for refreshing the page after any changes made
   3. set up watchers for sass
5. create index.html and mark up without any css pure html and  place holders
6. create the main.js and start building the angular module with the ui-router to create routes
7. create all your partial views and its controller skeletons
9. Start hooking up the routes with the controllers and the views.
10. Building the map controller
    1. I thought the best way to handle http request is to build a dataServices and resolve it in the routes or just simply use it in its controller. I have picked the second option.
    2. inject the dataService in my controller and get rid off the $scope as well using rather the controller aliases 'vm'
    3. We add a search function and call upon our dataservice to se if our promise return a result this will be invoked from the views search form
    4. No we just check there is result and call our map building function.
11. The last and not least is to style our website and load our images.


