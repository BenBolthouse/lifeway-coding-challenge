# lifeway-coding-challenge

[Link to spec](https://github.com/LifewayIT/corinth-code-challenge)

The repository contains three projects:
1. **/api** is an Express web server with RESTful API endpoints.
1. **/ui** is the directory for a React application created by `create-react-app --template typescript`.
1. **/shared** is a shared library of types, interfaces, classes, etc.

## Dev Setup
1. Clone the repository.
1. Run `npm install` in all three projects.
1. Run `npm start` in the /api project.
1. Run `npm start` in the /ui project.

## Using The App
Open a web browser and visit http://localhost:3000. You will see a blank page with a search bar and a "Star Wars Connect" logo.

The home page is blank because the home page is out of scope for this exercise.

Now navigate to /profiles/me in the URL bar. After the profile data loads, you'll see details about Darth Vader. The /profiles/me route has a hardcoded person ID to mimic client user context, i.e. you are Darth Vader.

Try typing a search term into the search bar. A second after the last keystroke, the fetch begins to search for people based on your search term. Typing more before the fetch resolves will retrigger a fetch with a new search term.

Finally, selecting any result from a search will navigate you to /profiles/{personId} and fetch that person's data to display their details according to the spec.
