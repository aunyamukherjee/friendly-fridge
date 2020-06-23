import React from 'react';
import './HomePageBody.css';


const HomePageBody = (props) => {
    return (
        <div className = "HomePageBody">
          <p className = "staticText">
            Click on one of the food groups to see what you have available!!
          </p>
          <a
            className="App-link"
            href="https://www.delish.com/cooking/recipe-ideas/a26977162/chocolate-ice-cream-recipe/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dairy
          </a>
          <a
            className="App-link"
            href="https://therecipecritic.com/vegetable-stir-fry/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Veggies
          </a>
          <a
            className="App-link"
            href="https://www.google.com/imgres?imgurl=https%3A%2F%2Fhips.hearstapps.com%2Fhmg-prod.s3.amazonaws.com%2Fimages%2Fassortment-of-colorful-ripe-tropical-fruits-top-royalty-free-image-995518546-1564092355.jpg&imgrefurl=https%3A%2F%2Fwww.goodhousekeeping.com%2Fhealth%2Fdiet-nutrition%2Fg28511617%2Fhealthiest-fruits%2F&tbnid=Tx4xm7Li7U8gKM&vet=12ahUKEwjludeFn4TqAhW6A50JHf9_BqgQMygAegUIARDVAQ..i&docid=M75OSqqe88sloM&w=2119&h=1414&q=fruits&ved=2ahUKEwjludeFn4TqAhW6A50JHf9_BqgQMygAegUIARDVAQ"
            target="_blank"
            rel="noopener noreferrer"
          >
            Fruit
          </a>
      </div>
    )
}

export default HomePageBody;