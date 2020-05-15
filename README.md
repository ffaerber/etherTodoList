## Getting Started

1. globaly Install the cli for ganache, openzeppelin and truffle:

        $ npm install -g truffle
        $ npm install -g ganache-cli
        $ npm install -g @openzeppelin/cli

2. install dependencies for the openzeppelin app

        $ npm i

3. init openzeppelin app

        $ npx oz init EtherTodoList 0.0.1

4. link contracts to project

        $ npx oz link @openzeppelin/contracts-ethereum-package

5. open new tab and start the local blockchain

        $ ganache-cli -d

6. deploy contracts to the local blockchain

        $ npx oz create

7. run contract tests

        $ npm test

8. Change directory to `client` and install dependencies and start react app.

        $ cd client
        $ npm i
        $ npm start

9. Go to `http://localhost:3000` and you'll see the app

10. Follow the guidelines to start developing your application. You may find
   the following resources handy:
    * [starter-kits](https://docs.openzeppelin.com/starter-kits/)
    * [linking the contracts ethereum package](https://docs.openzeppelin.com/cli/2.7/dependencies#linking-the-contracts-ethereum-package)


11. Deploy

        $ cd client
        $ npm run build
        $ cd ..
        $ npx oz upgrade
        $ make deploy
