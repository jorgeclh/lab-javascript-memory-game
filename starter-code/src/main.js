var cards = [
  { name: 'aquaman',         img: 'aquaman.jpg' },
  { name: 'batman',          img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four',  img: 'fantastic-four.jpg' },
  { name: 'flash',           img: 'flash.jpg' },
  { name: 'green arrow',     img: 'green-arrow.jpg' },
  { name: 'green lantern',   img: 'green-lantern.jpg' },
  { name: 'ironman',         img: 'ironman.jpg' },
  { name: 'spiderman',       img: 'spiderman.jpg' },
  { name: 'superman',        img: 'superman.jpg' },
  { name: 'the avengers',    img: 'the-avengers.jpg' },
  { name: 'thor',            img: 'thor.jpg' },
  { name: 'aquaman',         img: 'aquaman.jpg' },
  { name: 'batman',          img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four',  img: 'fantastic-four.jpg' },
  { name: 'flash',           img: 'flash.jpg' },
  { name: 'green arrow',     img: 'green-arrow.jpg' },
  { name: 'green lantern',   img: 'green-lantern.jpg' },
  { name: 'ironman',         img: 'ironman.jpg' },
  { name: 'spiderman',       img: 'spiderman.jpg' },
  { name: 'superman',        img: 'superman.jpg' },
  { name: 'the avengers',    img: 'the-avengers.jpg' },
  { name: 'thor',            img: 'thor.jpg' }
];

$(document).ready(function(){
  var memoryGame = new MemoryGame(cards);
  memoryGame.cards = memoryGame.shuffleCard(memoryGame.cards)
  var html = '';
  memoryGame.cards.forEach(function (pic, index) {
    html += '<div class= "card" id="card_' + pic.name + '">';
    html += '<div class="back"';
    html += '    name="'       + pic.img +  '">';
    html += '</div>';
    html += '<div class="front" ';
    html += 'style="background: url(img/' + pic.img + ') no-repeat">';
    html += '</div>';
    html += '</div>';
  });

  // Add all the div's to the HTML
  document.getElementById('memory_board').innerHTML = html;
  // Bind the click event of each element to a function
  $('.back').on('click', function () {
    //If we have less than two cards flipped
    if (memoryGame.pickedCards.length < 2) {
      //If isnt blocked
      if (!$(this).hasClass('blocked')) {
        //Flip the cards
        $(this).removeClass('back').addClass('front clicked')
        $(this).next().removeClass('front').addClass('back clicked')
        //Save the cards on pickedCards
        console.log($(this).parent().attr('id'))
        memoryGame.pickedCards.push($(this).parent().attr('id'))

        //If we have picked two cards
        if (memoryGame.pickedCards.length > 1) {
          //Check if the cards are equal
          if (memoryGame.checkIfPair(memoryGame.pickedCards[0], memoryGame.pickedCards[1])) {
            //Block cards and void the pickedCards property
            $('.clicked').addClass('blocked').removeClass('clicked')
            memoryGame.pickedCards = []
          } else {
            //Wait before flipping the cards and voiding the pickedCards property
            setTimeout(function() {
              $('.clicked.front').addClass('back').removeClass('front clicked')
              $('.clicked.back').addClass('front').removeClass('back clicked')
              memoryGame.pickedCards = []
            }, 1200)
          }
          $('#pairs_clicked').text(memoryGame.pairsClicked)
          $('#pairs_guessed').text(memoryGame.pairsGuessed)
        }
      }
    }
  });
});
