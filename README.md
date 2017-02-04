# Nestor

Nestor is a simple French bot for Discord written in **Typescript**.  
The bot is currently **under development**.

## Features

 - [x] Play music from Youtube
 - [x] Queue for music and skip

## Settings 

 - Change the network interface used, and ready for IPv6
 - Select default text channel and vocal channel
 - Change sentences send by the bot
 
## Installation

Software requirements : **fmpeg**, **Typescript**, **Node.js** > v6  
Other : **Administration of Discord server**, **Google API Key for Youtube**

 - Rename the ```local.example.env.js``` into ```local.env.js``` and complete it
 - ```npm install```
 - ```npm run deploy```
 
If your configuration is good, the bot will connect to your Discord server.
To get available commands : ```!help```.