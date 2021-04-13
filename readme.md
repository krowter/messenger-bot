# Messenger

Emulate simple chatbot using Node JS and Socket IO.

![normal user flow](./assets/normal-user-flow.gif)

## User flow:

1. Bot greets user and asks for user's name,
2. Bot asks user to input their birthday in YYYY-MM-DD format.
3. Bot gives options to either: calculate remaining days until user's next birthday, or end the conversation.

### Notes:

- Sent messages are validated in the server and will return appropriate responses: "**Can you please write it in form of YYYY-MM-DD?**" or "**Please answer using yes or no**"
- User messages are stored in local database using [node-json-db](https://www.npmjs.com/package/node-json-db) and will persist after restarting the server.

## Getting Started

Make sure you have git [(download here)](https://git-scm.com/downloads) and node [(download here)](https://nodejs.org/en/) installed in your system:

1. Clone this repo

2. Move into the directory `cd web`

3. Install the packages

```bash
npm install
# or if you use yarn
yarn
```

4 . Run the application

(in development)

```bash
npm run dev
# or if you use yarn
yarn dev
```

(in production)

```bash
npm run build && npm run start
# or if you use yarn
yarn build && yarn start
```

## Routes

Endpoint: `/`

- Description: Serve the main messenger application
- Method: `GET`
- URL params: none
- Data params: none
- Sucess response: Code 200
- Error response: none

Endpoint: `/messages`

- Description: List all user messages grouped by user ID
- Method: `GET`
- URL params: none
- Data params: none
- Sucess response: Code 200
- Error response: none

Endpoint: `/messages/:userId/:messageId`

- Description: View a single message (returns null if it was deleted)
- Method: `GET`
- URL params:
  - userId=[string]
  - messageId=[integer]
- Data params: none
- Sucess response: Code 200
- Error response: Code 404 if the message doesn't exist

Endpoint: `/messages/:userId/:messageId/delete`

- Description: Delete a single message (returns null if it was deleted)
- Method: `DELETE`
- URL params:
  - userId=[string]
  - messageId=[integer]
- Data params: none
- Sucess response: Code 200
- Error response: Code 404 if message doesn't exist
