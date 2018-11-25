### Note: egwene & linneak is the same user


### NOTE: 
### ABOUT OUR ISSUES WITH DEPLOYING
Our app is deployable, BUT our app is based on URL pathing, which doesn't seem to be supported in the platform. 
We think this would be rather easy to fix by using memory-router instead of router. We tried to be prepared for all sorts of problems that could show up when deploying, and we started thinking about this once this requirement was published. But we had never heard that the routing could turn out to be a problem. Because the server was down for most of saturday, we did not have enough time to fix this.

We have two versions of our code on GitHub:
* doctor-diary is the one you should use to run on localhost. To decide which user type to be logged in as: Go in the Api.js file. Comment out either line nr.1 or line nr.2. This sets the authKey to either doctor or dho.
* doctor-diary-deployable is the code that was prepared for the deploying. This will not run on localhost. The app will show up in the DHIS2 app store, but it will not function because of the routing issue.


# Functionality of the app
### DOCTOR
* View his/her reports
* Filter reports on all, accepted, pending, rejected
* Create a new report
* Send new report
### DHO
* View units he/she is responsible for
* View reports from selected unit
* Filter reports on all, accepted, pending, rejected
* Comment on a specific report
* Reject or Accept a report

# How the functionality is implemented
* Our app is divided into separate parts: DHO and Doctor. The two parts share some of the same components, and some views. 
* All of our API calls are collected in one file. 
* We have tried to reuse code to a reasonable extent. Even so, with more time we could have generalised the code further. For example: The two views ConfirmSendReport and ConfirmEditedReport should have been one file. Unfortunately, with the server down for day we did not have time to fix this. 
* We are routing between different views using buttons.
* Components are reused wherever it makes sense. 
* We are using callback functions to send data upstream.
* We have attempted to limit hard coding of values to a minimum.

# Missing functionality/implementations
### DOCTOR
* The navigationbar only has two active buttons ("home" and "add new", we did not get to implement the buttons "show list" or "notifications".
### DHO
* All core functionality is implemented.
### MainReportList
* If you switch between radio buttons before the report list is finished loading. There will be an error where some reports stack on top of each other.

# Licensing
### DHIS2 Documentation Team 2018 - API
Permission is granted to copy, distribute and/or modify this document under the terms of the GNU Free Documentation License, Version 1.3 or any later version published by the Free Software Foundation; with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts. A copy of the license is included in the source of this documentation, and is available here online:http://www.gnu.org/licenses/fdl.html

### Material UI
We have made these icons available for you to incorporate them into your products under the Apache License Version 2.0. Feel free to remix and re-share these icons and documentation in your products. We'd love attribution in your app's about screen, but it's not required. The only thing we ask is that you not re-sell the icons themselves.

### InJung Chung 2016 - react-radio-buttons 
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

### React Training 2016-2018 - react-router-dom
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
