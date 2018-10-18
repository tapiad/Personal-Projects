# **Daniel's Personal Projects**
---

# BlueBox 

<p align="center">
  <img src="https://github.com/tapiad/Personal-Projects/blob/master/BlueBox/BlueBox/Content/Images/BlueCube.png?raw=true" />
</p>

BlueBox is a web application of capable of providing information about Movies. It will give you information about upcoming movies, movies that are now playing. Provide popular movies and along with top rated movies. You will be able to watch movie trailers and more!

### How to Make it Work:

* **Download** and **Install** [Visual Studio Community 2017](https://www.visualstudio.com/vs/community/ "Visual Studio Community 2017")
* Go to https://github.com/tapiad/Personal-Projects and **Clone** or **Fork** this Repository
     - Then click on the green button - "*Clone or Download*".
     - Copy the web URL - `https://github.com/tapiad/Personal-Projects.git`
     - Use Git or checkout with SVN using the web URL. 
* Once you have the **URL copied**, clone the repository to your local machine using this command:
     - `git clone https://github.com/tapiad/Personal-Projects.git`
     - The Project is now avaiable to modifly and edit
* Make sure you are on the "**master**" branch. To be updated to the latest features, use this command:
    - `git pull origin master`
    
* Get your **API Key** from [The Movie DB](https://www.themoviedb.org/documentation/api "The Movie DB - API Overview") - A TMDb user account is required to request an API key. 
* The API Key is stored outside the repo for saftly reasons: Open the **Web.config** file of the project
     - The *Web.config* obtains the API Key through the **appSettings** from a file outside the repo
![API Key Path Image](https://github.com/tapiad/Personal-Projects/blob/master/Images/API_Key_Path.PNG?raw=true "API Key Path")
     - This example shows that the API Key is stored in a outside file named *API_Keys.config* which is stored in the *APIKeys* folder. Path to file: `..\..\..\APIKeys\API_Keys.config`
* The *API_Keys.config* (outside the repo file) should be a **.config** file with the following syntax: 
```html
<appSettings>
  <add key="APIKey_NAME" value="APIKey_VALUE"/>
</appSettings>
```
* Now you will have the API Key to run the appliction features
* Run Visual Studio 2017 and open the project solution (**BlueBox.sln**)
* **NuGet Packages**: 
    - bootstrap 4.1.3
    - jQuery 3.3.1
    - Microsoft.AspNet.MVC 5.2.6
* Run The Application!