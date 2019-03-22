# Task3 -Task Tracker (SPA)
Each task can be assigned to exactly one user, and each user can have multiple tasks. 
An user have to register for an account and set a password before using this application. 
After an user has logged in, a token will be stored in broswer's session. When a request is sent
to the server, the token will be included in request's header, it will be used for API authentication. 
An user can see all of his tasks by clicking on "tasks" link at the top-left corner. 
On tasks page, the user can edit or delete an existing task, or create a new one. 
