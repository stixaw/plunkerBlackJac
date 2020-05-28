// developer Angel Williams
// app Black Jack
// Copyright 2018

//DOM Variables
let textField1 = document.getElementById('textArea1');
let textField2 = document.getElementById('textArea2');
let textField3 = document.getElementById('textArea3');
let hitMeB = document.getElementById('hitMeButton');
let stayB = document.getElementById('stayButton');
let newGameB = document.getElementById('newGameButton');
hitMeB.style.display = 'none';
stayB.style.display = 'none';

// prep cards and variables
let hiddenCard;
let dealtCard;
let usedCards;
let deck = [];
let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
let names = ['Ace', 'Queen', 'King', 'Jack', 'Ten', 'Nine', 'Eight', 'Seven', 'Six', 'Five', 'Four', 'Three', 'Two'];

//Setting up the Arrays for cards that each player will hold at one time
let playerCards = [];
let dealerCards = [];
let winner = "";

// Hand totals
let publicDealerTotal = 0;
let currentPlayerTotal = 0;
let hiddenDealerTotal = 0;

// Functions =====================================================================================================================================================
function createDeck() {

  for (let s = 0; s < suits.length; s++) {
    for (let n = 0; n < names.length; n++) {
      let card = {
        suit: suits[s],
        name: names[n]
      };
      deck.push(card);
    }
  }
  return deck;
}

function readDeck(array) {
  array.forEach(function(card) {
    console.log(card);
    console.log(array.length);
  });
}

//function to shuffle cards and add them to appropriate arrays (don't forget usedCards)
function shuffle(array) {
  var i = 0,
    j = 0,
    temp = null;

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}

//function deal cards from the top of the deck
function dealNextCard() {
  let card = deck.shift();
  return card;
}

//function to deal cards
function dealPlayerACard(array) {
  dealtCard = dealNextCard();
  array.push(dealtCard);
}

//hit dealer
function dealDealerACard(array) {
  dealtCard = dealNextCard();
  array.push(dealtCard);
}

function dealHiddenCard(array) {
  hiddenCard = dealNextCard();
  array.push(hiddenCard);
}

function getCardName(card) {
  let cardName = card.name + " of " + card.suit;
  return cardName;
}

function readHand(array) {
  let hand = "";
  let message = "";
  array.forEach(function(card) {
    let cardName = getCardName(card);
    hand = (hand + cardName + ", ");
    message = (hand + "for a total of " + getCardTotal(array));
  });
  return message;
}

function getAceValue(total) {
  if ((total + 1) <= 21) {
    cardValue = 1;
  }
  if ((total + 11) <= 21) {
    cardValue = 11;
  }
  return cardValue
}

function getCardValue(cardName) {
  let cardValue = 0;

  switch (cardName) {
    case 'Nine':
      cardValue = 9;
      break;
    case 'Eight':
      cardValue = 8;
      break;
    case 'Seven':
      cardValue = 7;
      break;
    case 'Six':
      cardValue = 6;
      break;
    case 'Five':
      cardValue = 5;
      break;
    case 'Four':
      cardValue = 4;
      break;
    case 'Three':
      cardValue = 3;
      break;
    case 'Two':
      cardValue = 2;
      break;
    case 'Ace':
      cardValue = 1;
      break;
    default:
      cardValue = 10;
      break;
  }
  return cardValue;
}

//function get Dealer first total with hiddencard value;
function dealerFirstTotal(card) {
  let cardTotal = 0;
  let cardValue = getCardValue(card.name);
  cardTotal += cardValue;
  return cardTotal;

}

//function to get the currentPlayerTotal of cards in players hand;
function getCardTotal(array) {
  let cardTotal = 0;
  let hasAce = false;

  for (let i = 0; i < array.length; i++) {
    let card = array[i];
    let cardValue = getCardValue(card.name);
    cardTotal += cardValue;

    if (card.name === "Ace") {
      hasAce = true;
    }
  }
  if (hasAce === true && cardTotal + 10 <= 21) {
    return cardTotal + 10;
  }
  return cardTotal;
}

if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined' ? args[number] : match;
    });
  };
}

function startNewGame() {
  playerCards = [];
  dealerCards = [];
  publicDealerTotal = 0; // minus the hidden card
  currentDealerTotal = 0; // with hidden card
  currentPlayerTotal = 0;
  textField3.innerText = "";

  createDeck();
  shuffle(deck);

  dealPlayerACard(playerCards);
  dealDealerACard(dealerCards);
  dealPlayerACard(playerCards);
  dealHiddenCard(dealerCards);

  publicDealerTotal = getCardTotal(dealerCards);
  hiddenDealerTotal = dealerFirstTotal(dealerCards[0]);
  currentPlayerTotal = getCardTotal(playerCards);


  updateTextFieldWithDeal(playerCards, dealerCards);
  newGameB.style.display = 'none';
  hitMeB.style.display = 'inline';
  stayB.style.display = 'inline';

}

function updateTextFieldWithDeal(playerHand, dealerHand) {

  let message1 = "You have been dealt a {0} and a {1} for a total of {2}"
    .format(getCardName(playerHand[0]), getCardName(playerHand[1]), currentPlayerTotal);
  let message2 = "The dealer has {0} showing for a total of {1}".format(getCardName(dealerHand[0]), hiddenDealerTotal);

  textField1.innerText = message1;
  textField2.innerText = message2;
}

function getWinner() {
  hitMeB.style.display = 'none';
  stayB.style.display = 'none';
  publicDealerTotal = getCardTotal(dealerCards);
  currentPlayerTotal = getCardTotal(playerCards);

  if (publicDealerTotal == 21) {
    winner = "The Dealer";
  }
  if (currentPlayerTotal == 21) {
    winner = "The Player";
  }
  if (publicDealerTotal > 21 && currentPlayerTotal <= 21) {
    winner = "The Player";
  }
  if (currentPlayerTotal > 21 && publicDealerTotal <= 21) {
    winner = "The Dealer";
  }
  if (publicDealerTotal < 21 && publicDealerTotal > currentPlayerTotal) {
    winner = "The Dealer";
  }
  if (currentPlayerTotal < 21 && currentPlayerTotal > publicDealerTotal) {
    winner = "The Player";
  }
  if (publicDealerTotal == currentPlayerTotal) {
    winner = "The Dealer";
  }

  textField3.innerText = "Player Total: " + currentPlayerTotal + '\n' + readHand(playerCards) + '\n' + "Dealer Total: " + publicDealerTotal + '\n' + readHand(dealerCards);
  textField1.innerText = winner + " is the winner!";
  textField2.innerText = "Would you like to play again?";

  newGameB.style.display = 'inline';

  return winner;
}

function dealersFinalHand() {
  publicDealerTotal = getCardTotal(dealerCards);

  if (publicDealerTotal != 21 && currentPlayerTotal != 21) {

    while ((publicDealerTotal <= 17) && ( publicDealerTotal <= currentPlayerTotal && currentPlayerTotal < 22)) {
        dealDealerACard(dealerCards);
        textField2.innerText = "Dealer Hand:" + '\n' + readHand(dealerCards);

        publicDealerTotal = getCardTotal(dealerCards);
      }
  }
  textField2.innerText = "Dealer Hand:" + '\n' + readHand(dealerCards);
}


//Program ======================================================================================


newGameB.addEventListener("click", startNewGame);

hitMeB.addEventListener("click", function() {
  textField1.innerText = "Player Hand:" + '\n' + readHand(playerCards);
  if (playerCards.length < 6) {
    dealPlayerACard(playerCards);
    textField1.innerText = "Player Hand:" + '\n' + readHand(playerCards);
  }
  currentPlayerTotal = getCardTotal(playerCards);
  if (currentPlayerTotal > 21 || currentPlayerTotal == 21) {
    textField1.innerText = getWinner() + " is the winner!";
    textField2.innerText = "Would you like to play again?";
    newGameB.style.display = 'inline';
  }
});

stayB.addEventListener("click", function() {
  dealersFinalHand();

  getWinner();

});





// OOP Style=====================================================================
// Dealer Hand card values minus the hidden card value
// Player Hand total of the array of card objects based on values
// shuffle deals with the deck Object

// Card object name, suite and value
/*function card(value, name, suit){
  this.value = value;
  this.name = name;
  this.suit = suit;
}

// Deck Object is an array of Card Objects
function deck(){
  var cards = [];
  
  this.names= ['Ace', 'Queen', 'King', 'Jack','Ten', 'Nine', 'Eight', 'Seven', 'Six', 'Five', 'Four', 'Three', 'Two'];
  this.suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
  
  for (var s= 0; s < this.suits.length; s++){
    for(var n = 0; n < this.names.length; n++){
      cards.push(new card(n+1, this.names[n], this.suits[s]));
    }
  }
  return cards;
  
}

function shuffleDeck(deck){
  
}*/