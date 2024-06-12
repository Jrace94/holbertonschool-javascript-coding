#!/usr/bin/node
/*
    Write a script that prints all
    characters of a Star Wars movie
*/
const request = require('request');
const movieId = process.argv[2];
const url = `https://swapi.dev/api/films/${movieId}/`;

request(url, (error, response, body) => {
  if (error) {
    console.error('Error fetching data:', error);
    return;
  }

  if (response.statusCode !== 200) {
    console.error('Failed to fetch data. Status code:', response.statusCode);
    return;
  }

  const movie = JSON.parse(body);
  const charactersUrls = movie.characters;

  // Fetch details for each character in the order provided by the API
  charactersUrls.forEach((characterUrl, index) => {
    request(characterUrl, (charError, charResponse, charBody) => {
      if (charError) {
        console.error('Error fetching character data:', charError);
        return;
      }

      if (charResponse.statusCode !== 200) {
        console.error('Failed to fetch character data. Status code:', charResponse.statusCode);
        return;
      }

      const character = JSON.parse(charBody);
      console.log(character.name);

      // If this is the last character, print an empty line
      if (index === charactersUrls.length - 1) {
        console.log('');
      }
    });
  });
});
