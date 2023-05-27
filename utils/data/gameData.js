import { clientCredentials } from '../client';

const getGames = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/games`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleGame = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/games/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createGame = (game) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/games`, {
    method: 'POST',
    body: JSON.stringify(game),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch(reject);
});

const getGameTypes = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/gametypes`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const updateGame = (gameObj) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/games/${gameObj.id}`, {
    method: 'PUT',
    body: JSON.stringify(gameObj),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then(resolve)
    .catch(reject);
});

export {
  getGames, createGame, getGameTypes, updateGame, getSingleGame,
};
