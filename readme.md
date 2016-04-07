#Fighter DB - Find. Play. Keep scores. (update 07/04)

---------------------------

##Installation

Go in the folder and type:

```
npm install
```

##Depedencies

You'll need mongodb to work with the project. Withour mongodb, update the `config/model.js` file.
You'll also need to create a `config/local.js` file with the proper connection information in it:

```
module.exports={
  connections: {
    mongo: {
      module: 'sails-mongo',
      host: 'localhost',
      port: 27017,
      user: '',
      password: '',
      database: 'fightdb'
    }
  }
};
```
##What is it

Fighter DB is an app that offers fighters a way to keep tracks of their match results and give them statistics : Want to know who is the best Ryu in your area ? who is better at Guilty Gear: you or your friend ? What's your win rate against a particular player or character ?

This app also offers a way to join a group of fighter sharing the same will of keeping scores. Find an existing community, or create one to start sharing scores!

Add new (or existing) friends, create a community, create session and meet new fighters around you!

###Find

- Use the fighter locator to find fighters in your area (or add them directly using their nickname)
- Add them as friends
- Create a community
- Create a session (public, private, fees, BYO, ...)
- Create tournament

###Play

- Select among 10 popular fighting game (USF4, UMvC3, GG, ...)
- Select your character and your opponent among your friends
- Select the game type (MoneyMatch, Casual, Tournament, FTX)

###Keep scores

- Calculation based on a complex ranking algorythm
- Win / loose rate per character / per player
- Community / area / world ranking

----------------------------

##Registration

Register using the needed information:

- Name
- Gender
- Date of birth
- Location
- Nickname
- GamerTag
- Add up to 3 games (Premium gets unlimited)

----------------------------

##User profile

Users can set up multiple additionnal information in their profile:

- Social network settings:
  - Twitter
  - Facebook
  - Twitch
- Game settings:
  - Favorite game
  - Favorite characters
- Friends list
  - Manage your friends and your community
  - Use the "Flash this QR code to add me as a friend" feature to easily add new friend
  - Create community (Premium)

----------------------------

##Player locator

Find players that are in your area, and add them to your friends list, or to your community:

- Filter by game / level
- Set your status: visible or hidden (Premium)
- Find players, session or tournament

---------------------------

##Match Mode

Enters your score and keep track of it:

- Choose your game
- Choose your game type
- Choose your character
- Choose your opponent
- Online / offline

---------------------------

##Technical stuff

Web application at first, then move to Android / iOS native app.

- MongoDB => easily scale to fit the number of user
- Sails.js => manage all API / models
- Angular => frontend framework
- Bootstrap => frontend CSS framework + grid system
- socket.io => webSockets protocol for notification and real-time

- Notifications
- QR code
- Gmaps API
- localization
