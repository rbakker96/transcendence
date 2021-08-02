<p align="center">
  <img src="https://github.com/rbakker96/images/blob/master/codam_logo.png">
</p>

# ft_transcendence
***Final project to show that with your current knowledge you can make the transition to programming languages and frameworks that you have not used before***

---

### Project summary
> 6th ring Codam project

In this project, you will need to build a website for the mighty pong contest. Your website will help users play pong against each other. There will be an admin view, chat with moderators, real-time multiplayer online games

---

### Technical considerations
> The project needs to comply with the following rules/functionalities.

GENERAL
- you must use the last stable version of every framework or library.
- Your website backend should be written in NestJS.
- You must use a PostgreSQL database and no other databases.
- The front end must be written with any typescript framework.
- Your website should be a single page app, but the user should be able to use the back button on the browser https://en.wikipedia.org/wiki/Singlepage_application
- Your website must be usable on the latest version to date on Google Chrome, Firefox, Safari.
- There must be no unhandled errors or warnings when browsing through the website.
- You can use any library.
- Everything should run with a single call to docker-compose up –build

SECURITY
- Any password stored in your database must be encrypted
- Your website must be protected against SQL injections
- You must implement some kind of server-side validation for forms and any user input

USER ACCOUNT
- A user must log in using the OAuth system of 42 intranet
- A user must be able to choose a unique name that will be displayed on the website
- A user has several victories and losses and other stats (ladder level, achievements etc...)
- A user must have an avatar generated or uploaded by the user
- A user must be able to activate a 2-factor authentication (like google authenticator or an SMS etc...)
- A user can add other users as friends, and see their current status (online, offline, in a game...)
- Each user has a match history (including duel, ladder) that can be consulted by anyone logged-in

CHAT
- Users must be able to create channels public/private or protected by a password
- Users must be able to send direct messages to other users
- Users must be able to block other user and therefore they will not see their messages anymore
- A user that creates a new channel is automatically its owner until he leaves the channel
  - owner of a channel can add/change/remove a password to access the channel
  - owner can select a user to be an administrator and is also an administrator of the channel
  - administrator can ban or mute users for a certain amount of time
- Through the chat interface users should be able to ask other players to do a Pong match
- Through the chat interface users must be able to see other players profiles

GAME
- Users should be able to play pong directly on the website and live againstanother player.
- There must be a match-making system, user can join a game queue and are automatically matched with another player.
- It can be on a canvas or it can be with 3d effects, it can be ugly but it must be a pong like the one from 1972.
- pong like the one from 1972.
- You need to have some game customization options (power-ups, different maps etc) but the user must be able to play a default pong game without any added stuff.
- The game must be responsive!
- Other users can watch the game live without interfering in it.

---

### File structure
    transcendence/
    │
    ├── Nestjs/
    │   ├── src
    │   │   ├── chat
    |   |   |   └── chat related files
    │   │   ├── game
    |   |   |   └── game related files
    │   │   ├── user
    |   |   |   └── user related files
    │   │   ├── app.controller.ts
    │   │   ├── app.module.ts
    │   │   ├── app.service.ts
    │   │   └── main.ts
    │   ├── ...
    │   ├── ...
    │   └── ...
    │
    ├── React/
    │   ├── src
    │   │   ├── API
    |   |   |   └── Api connection files
    │   │   ├── components
    |   │   │   ├── chat
    |   |   |   |   └── chat related files
    |   │   │   ├── game
    |   |   |   |   └── game related files
    |   │   │   ├── user
    |   |   |   |   └── user related files
    │   │   ├── models
    |   |   |   └── data models
    │   │   ├── App.css
    │   │   ├── App.tsx
    │   │   └── ...
    │   ├── ...
    │   ├── ...
    │   └── ...
    │
    ├── .gitignore
    ├── NestJS-dockerfile
    ├── React-dockerfile
    ├── cleanup.sh
    ├── docker-compose
    ├── package-lock.json
    └── setup.sh

---

### Usage
> Type the following URL in the browser

```shell
http://localhost:8080
```

---

### Preview
> Screenshot of main pages of the webapplication

| **Login screen** | **Profile page** | **Game page** | **Chat page** |
| :---: |:---:| :---:| :---:|
| [![FVCproductions](https://github.com/rbakker96/images/blob/master/loginpage.jpg?w=220&s=220)](http://fvcproductions.com) | [![FVCproductions](https://github.com/rbakker96/images/blob/master/profilepage.png?w=220&s=22)](http://fvcproductions.com) | [![FVCproductions](https://github.com/rbakker96/images/blob/master/gamepage.png?w=220&s=22)](http://fvcproductions.com)  | [![FVCproductions](https://github.com/rbakker96/images/blob/master/chatpage.png?w=220&s=22)](http://fvcproductions.com)  |

---

### Used resources
> Most noteworthy resources used during this project

- <a href="https://docs.nestjs.com/first-steps" target="_blank">NestJs documentation</a>
- <a href="https://reactjs.org/" target="_blank">React documentation</a>
- <a href="https://api.intra.42.fr/apidoc" target="_blank">42 Api documentation</a>
- <a href="https://docs.nestjs.com/security/cors" target="_blank">Cross-origin resource sharing (CORS)</a>
- <a href="https://wanago.io/2021/03/08/api-nestjs-two-factor-authentication/" target="_blank">Two-factor authentication</a>
- <a href="https://www.akashmittal.com/cant-perform-react-state-update-unmounted-component/" target="_blank">React state updates</a>
