# alexa-bookvalue

alexa-bookvalue is an Amazon Alexa skill that retrieves and announces the Amazon Trade-In Value of a book by searching for a user-voiced 13-digit ISBN number against the Amazon Product Advertising API.

#### To interact with the skill locally:  
1. Install [NodeJS](https://nodejs.org/download/release/v4.3.2/) v4.3.2
2. Install [alexa-app-server](https://github.com/matt-kruse/alexa-app-server)
3. Clone this repository to your alexa-app-server installation folder's `./examples/apps` directory
4. In the examples directory, run `node server`
5. Visit http://localhost:8080/alexa/booktradein
