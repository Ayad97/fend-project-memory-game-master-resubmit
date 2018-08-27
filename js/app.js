/*define classes in HTML file into JS file*/

    var increase_moves= document.querySelector(".moves"),
        increase_timer= document.querySelector(".timer"),
        restart= document.getElementsByClassName("restart_game"),
        stars_r = document.querySelector(".stars"),
        stars_li = document.querySelectorAll(".stars li"),
        matched_card = document.getElementsByClassName("match"), // if all matched display a msg.
        show_msg = document.getElementById("message"),
        open_cards = [],// array to put value of cards on it
        card= document.getElementsByClassName("card");

   const stars_fa = document.querySelectorAll(".fa-star" ),
             decks=  document.getElementById("deck");

    let cards = [...card],
        hide_msg = document.querySelector(".fa-times-circle"),
        moves , timer //for increase moves & timer in function
        
// ----------------------------------------------------------------------------------------------

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndeinterval = array.length, temporaryValue, randomIndeinterval;

    while (currentIndeinterval !== 0) {
        randomIndeinterval = Math.floor(Math.random() * currentIndeinterval);
        currentIndeinterval -= 1;
        temporaryValue = array[currentIndeinterval];
        array[currentIndeinterval] = array[randomIndeinterval];
        array[randomIndeinterval] = temporaryValue;
    }

    return array;
}
//----------------------------------------------------------
// function reset game while onclick fa-repeat
document.body.onload = game(); 

function game(){
   
    cards = shuffle(cards);
    
    for (var i = 0; i < 16; i++) 
    {
        decks.innerHTML ="";
        [].forEach.call(cards, function(item) 
        {
            decks.appendChild(item);
        });
        
        cards[i].classList.remove("show", "open", "match", "disabled");
    }

    sec = 0 , min=0 , H=0;
    increase_timer.innerHTML = "0 minute(s) 0 second(s)";
    sec++;
    

    moves = 0;
    increase_moves.innerHTML = moves;

    for (var i= 0; i < 3; i++) //stars_fa.lenght 
    {
        stars_fa[i].style.color = "gold";
        stars_fa[i].style.visibility = "visible";
    }

    clearInterval(x) ;
}
//----------------------------------------------------------

function increase_count(){
    moves++;
    increase_moves.innerHTML = moves ;
 
    if(moves == 1)
    {
        second = 0; minute = 0 ;  hour = 0;
        begin_timer();
    }

    if ( moves > 8 && moves < 12 )
    { 
        for( i= 0; i < 3; i++)
        {
            if(i > 1)
            {
                stars_fa[i].style.color = "#000";
            }
        }
    }
    else if (moves > 13 && moves < 21)
    {
        for( i= 0; i < 3; i++)
        {
            if(i > 0)
            {
                stars_fa[i].style.color = "#000";
            }
        }
        
    }
    else if (moves >= 21  && moves < 32)
    {
        for( i= 0; i < 3; i++)
        {
            if(i == 0)
            {
                stars_fa[i].style.color = "#000";
            }
        }
        
    }
    else if (moves >= 32)
    {
        for( i= 0; i < 3; i++)
        {
            if(i == 0)
            {
                stars_fa[i].style.color = "red";
            }
        }
        
    }
    
}

//--------------------------------------------------------------------------------------------
var sec = 0 , min = 0 ; H = 0 ;
var x;

function begin_timer() {

    x = setInterval(function()
    {
        increase_timer.innerHTML = min+" minute(s)  "+ sec+" second(s)";
        sec++;
        if(sec == 60) // convert seconds to minutes
        {
            min++;
            sec=0;
        }
        if(min == 60) // convert minutes to hours
        {
            H++;
            min = 0;
        }
    },1000); 
}
//--------------------------------------------------------------------------------------------------

//openCaed 
function open_card() {
    open_cards.push(this);
    
    this.classList.toggle("disabled") ;
    this.classList.toggle("open") ;
    this.classList.toggle("show") ;

    var check_card = open_cards.length;

    if(check_card === 2){
        
        increase_count();
        if(open_cards[0].type === open_cards[1].type)
        {
            // then matched cards
            open_cards[0].classList.add("match", "disabled");
            open_cards[1].classList.add("match", "disabled");
            open_cards[0].classList.remove("show", "open");
            open_cards[1].classList.remove("show", "open");

            open_cards = [];
            
        } 
        else {
            // else cards un matched
            open_cards[0].classList.add("unmatched_card");
            open_cards[1].classList.add("unmatched_card");

                disable_choice();

                setTimeout(function(){
                    //remove classes 
                open_cards[0].classList.remove("unmatched_card" , "show", "open");
                open_cards[1].classList.remove("unmatched_card" , "show", "open");

                enable_choice();

                open_cards = [];
                },1000);;
        }
    }
};

//----------------------------------------------------------
function disable_choice(){
    Array.prototype.filter.call(cards, function(check){

         check.classList.add('disabled') ;
    });
}

//--------------------------------------------------------------------------------------------

// when enable cards
function enable_choice(){
    Array.prototype.filter.call(cards, function(check){

        check.classList.remove('disabled') ;

        for(var i = 0; i< matched_card.length; i++){
            matched_card[i].classList.add("disabled");
        }
    });
}
//----------------------------------------------------------------------------------

function display_msg(){
    if (matched_card.length == 16)
    {
        clearInterval(x);
        end_timer = increase_timer.innerHTML;
        show_msg.classList.add("show");
        stars_r = document.querySelector(".stars").innerHTML;
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = stars_r;
        document.getElementById("totalTime").innerHTML = end_timer;

    };
}
//---------------------------------------------------------------------------------------------------
function close_message(){
        show_msg.classList.remove("show");
        game();
    }

//--------------------------------------------------------------------------------------------
function play_again(){
    show_msg.classList.remove("show");
        game();
}

//--------------------------------------------------------------------------------------------

for (var i = 0; i < cards.length; i++)
{
    card = cards[i];
    
    card.addEventListener("click", open_card);
    card.addEventListener("click",display_msg);
};

//--------------------------------------------------------------------------------------------
