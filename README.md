# Keybasechat

This is a simple encrypted messaging service between parties who know each other at keybase. Every message is encrypted and then decrypted locally - only the encrypted messages are stored on the server for retrieval.

## Installation

Just clone this repo somewhere in your filesystem, and start using it with NodeJS supporting ES6 syntax

```
git clone https://github.com/NikkiLoveGod/keybasechat.git
```

## Usage

Getting your messages sent to you:
```
node client.js get <keybase-username>
```

Sending messages to someone:
```
node client.js msg <keybase-username> <message>
```

## TODO
* Error handling for ...everything
* Some notification type of thing "You have (N) new messages"
* Maybe change away from Retrieve once and delete -model to something more sophisticated
* Some authentication to stop people from getting messages meant for others, even if they are encrypted
* Realtime chat
* Some globally installable NPM package that remembers your keybase username and makes the usability better
