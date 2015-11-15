# (╯°□°）╯︵ ┻━┻

At our third year at the [DevFest Berlin 2015](https://2015.devfest-berlin.de/) we created a pretty awesome web game called "AsciiTableFlip".
The Hackathon was all about the "ASCII Table".
After a short research about this topic, we got the recommendation to search for "ASCII Table flip".
So we decided to dive deeper into this term and we found this nice guy: (╯°□°）╯︵ ┻━┻

At this point we only had to find a story around him.
So we created a cool game as well as some awesome music!

## The story

Once upon a time Mr. Flip Em Flip was parting hard.
He was an enthusiastic developer like we are and nothing could stop him on his way.
As long as nothing unpredictable happens.
But than the error strikes back.
That was to much for Mr. Flip Em Flip.
He was totally f**ked up and started to get into the raging mode, or as we better known, his "table flip mode".

## The game
At this point the game begins.
You can control Mr. Flip Em Flip.
Connect four devices via a web browser.
For an optimal game experience you should use four smartphones.
Place them in front of you.
Everytime a table drops into the gamer space on the bottom of the game area, you have to press on the smartphone which shows the number of the cell.
Mr. Flip Em Flip will flip the table and your game score will increase.
After 30 tables you will see the outro screen and your final game score.

## Screenshots

![Intro - Dance](https://github.com/kollektivpp/AsciiTableFlip/screenshots/game-dance.png "Intro - Dance")

![Intro - Error](https://github.com/kollektivpp/AsciiTableFlip/screenshots/game-error.png "Intro - Error")

![Main Game](https://github.com/kollektivpp/AsciiTableFlip/screenshots/game.png "Main Game")


## Install
`$ npm install`

## Start the master
`$ npm run start-server`
default port is 8080

Switching the port:
`$ npm run start-server --port=4343`

## Start the clients
You have to connect each client manually.
Therefore start your web browser (we only tested it with chrome on iPhone and Android) and enter the IP address of your master on port 8080 and the path `client`.
For example:
`http://10.100.20.20:8080/client`

If the registration was successfully you will see the cell number you are connected to in your browsers.
After every game or every master page refresh you have to connect the clients again.

## License
You can do what ever you want with our code.
Even with the music which was created by [Thomas Fett](https://github.com/ThomasFett).
It would be a pleasure for us if you notice us in your app, if you using our stuff.
You know, sharing is caring.
Thanks for that.
