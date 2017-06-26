##Fight APP

-------------


- More logging system (file creation + logging)
- Feedback 3rd parties


###Database

1 instance & 2 databases: 
- fightdb
- fightcalculation

###for calculation

- Player level
- Character level

###Sending data to calc

####Format for match or event:

```
scorePlayer1: 10001
scorePlayer2: 01110
player1Ids (array)
player2Ids (array)
char1Ids (array)
char2Ids (array)
matchId
type
eventId (optionnal)
```

####Format for Statistics: 

- Flexible API
	- Group ID (string) (required)
	- User ID (string) (required)
	- Character ID (array) (optional)
	- depth (null, or number) (optional)
	
- If depth == null
	- Key value pair of data
- If depth == number
	- position / player ID or character ID
- 1 call per group

###2 apis

- 1 for match based
- 1 for tournament (event) based

###Tournament

(event) 

- different group
- search player
- Title
- Description
- tournament importance (dropdown field)
	- 64 major
	- 32 CPT event
	- 16 national
	- 8 local
	- 2 base stuff or private session
	
###Next step

- API endpoint
- Event mechanism
- API call
- Services in sails
- statistics view
- Profile view 
- Request package