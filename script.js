( () => {

   let player = `player-one`;

   let playerOneCount = 0;
   let playerTwoCount = 0;

   let play;


//menu
 

$(`.playVsPlayer`).hide();
//vsPlayer
$(`.btns-wrap`).children(`:nth-child(2)`).click( () => { 
    $(`.menu`).hide();
    $(`.playVsPlayer`).show(); 
    play = `vsplayer`;
});
//Vs Ai
$(`.btns-wrap`).children(`:first-child`).click( () => {
    $(`.menu`).hide();
    $(`.playVsPlayer`).show(); 
    play = `vsAi`;
});
$(`.menu-btn`).click( () => {
    $(`.menu`).show();
    $(`.playVsPlayer`).hide(); 
});

    // hover on row show arrow on top

    $(`.row`).hover(hoverOn, hoverOff);

    function hoverOn() {
       $(this).find(`.hover-line`).show();
    }

    
    function hoverOff() {
        $(this).find(`.hover-line`).hide();
    }

    /// player Turns

    const switchPlayer = () => {
        if(player === `player-one`){
            player = `player-two`;
        } else if (player === `player-two`){
            player = `player-one`;
        }
    };


    //row click fill board


    let timerFirst = true;

    $(`.row`).click(playDraw);

    
    function playDraw() {

            if($(this).children(`:last-child`).hasClass(`active`) === false){
                $(this).children(`:last-child`).addClass(`active`).addClass(player);
                
                    switchPlayer();
                playerWins($(this).find(`.active`).first(), $(this));

                if(play === `vsAi`) {
                    aiMove();
                }
            } else {
                
                if($(this).find(`.active`).first().prev().hasClass(`hover-line`) !== true){
                    $(this).find(`.active`).first().prev().addClass(`active`).addClass(player);
                        switchPlayer();
                    playerWins($(this).find(`.active`).first(), $(this));
                    if(player === `vsAi`){
                        aiMove();
                    }
                }
            }

            display();


                if(timerFirst === true){
                    timer(`start`);
                
                    timerFirst = false;
        
                }
            };



/// AIII


const aiMove = () => {
    const randomNum = Math.floor(Math.random() * 7) + 1;
        
        if($(`.row.${randomNum}`).children(`:last-child`).hasClass(`active`) === false){
            $(`.row.${randomNum}`).children(`:last-child`).addClass(`active`).addClass(player);
            switchPlayer();
        } else {    
            if($(`.row.${randomNum}`).find(`.active`).first().prev().hasClass(`hover-line`) !== true){
                $(`.row.${randomNum}`).find(`.active`).first().prev().addClass(`active`).addClass(player);
                switchPlayer();
            }
        }
}; 



    // player win logic

    const playerWins = (target,parent) => {
        let index = target.attr(`class`).slice(5, 6);
        index = +index + 1;
        const player = target.attr(`class`).slice(14, 24);
            const game = (prev, next) => {
                //count two next two prev
                if(prev.children(`:nth-child(${index})`).hasClass(player) === true && next.children(`:nth-child(${index})`).hasClass(player) === true){
                    if(prev.prev().children(`:nth-child(${index})`).hasClass(player) === true){
                        if(player === `player-one`){
                            playerOneCount++;
                        } else if(player === `player-two`){
                            playerTwoCount++;
                        }
                        wrap();
                    } 
                    
                    if(next.next().children(`:nth-child(${index})`).hasClass(player) === true){
                        if(player === `player-one`){
                            playerOneCount++;
                        } else if(player === `player-two`){
                            playerTwoCount++;
                        }
                        wrap(player);
                    }
                } 
                // three prev check
                 if(prev.children(`:nth-child(${index})`).hasClass(player) === true){
                    if(prev.prev().children(`:nth-child(${index})`).hasClass(player) === true){
                        if(prev.prev().prev().children(`:nth-child(${index})`).hasClass(player) === true){
                            if(player === `player-one`){
                                playerOneCount++;
                            } else if(player === `player-two`){
                                playerTwoCount++;
                            }
                            wrap(player);
                        }
                    }
                } 
                // three next check
                 if(next.children(`:nth-child(${index})`).hasClass(player) === true){
                    if(next.next().children(`:nth-child(${index})`).hasClass(player) === true){
                        if(next.next().next().children(`:nth-child(${index})`).hasClass(player) === true){
                            if(player === `player-one`){
                                playerOneCount++;
                            } else if(player === `player-two`){
                                playerTwoCount++;
                            }
                            wrap(player);
                        }
                    }
                } 
                //check diagonal top left
                 if(prev.children(`:nth-child(${index - 1})`).hasClass(player) === true){
                    if(prev.prev().children(`:nth-child(${index - 2})`).hasClass(player) === true){
                        if(prev.prev().prev().children(`:nth-child(${index - 3})`).hasClass(player) === true){
                            if(player === `player-one`){
                                playerOneCount++;
                            } else if(player === `player-two`){
                                playerTwoCount++;
                            }
                            wrap(player);
                        }
                    }
                }
                //check diagonal bottom left
                 if(prev.children(`:nth-child(${index + 1})`).hasClass(player) === true){
                    if(prev.prev().children(`:nth-child(${index + 2})`).hasClass(player) === true){
                        if(prev.prev().prev().children(`:nth-child(${index + 3})`).hasClass(player) === true){
                            if(player === `player-one`){
                                playerOneCount++;
                            } else if(player === `player-two`){
                                playerTwoCount++;
                            }
                            wrap(player);
                        }
                    }
                } 
                //check diagonal top right
                 if(next.children(`:nth-child(${index - 1})`).hasClass(player) === true){
                    if(next.next().children(`:nth-child(${index - 2})`).hasClass(player) === true){
                        if(next.next().next().children(`:nth-child(${index - 3})`).hasClass(player) === true){
                            if(player === `player-one`){
                                playerOneCount++;
                            } else if(player === `player-two`){
                                playerTwoCount++;
                            }
                            wrap(player);
                        }
                    }
                }
                //check diagonal bottom right
                 if(next.children(`:nth-child(${index + 1})`).hasClass(player) === true){
                    if(next.next().children(`:nth-child(${index + 2})`).hasClass(player) === true){
                        if(next.next().next().children(`:nth-child(${index + 3})`).hasClass(player) === true){
                            if(player === `player-one`){
                                playerOneCount++;
                            } else if(player === `player-two`){
                                playerTwoCount++;
                            }
                            wrap(player);
                        }
                    }
                } 
                //horizontal top to bottom
                 if(parent.children(`:nth-child(${index + 1})`).hasClass(player) === true){
                    if(parent.children(`:nth-child(${index + 2})`).hasClass(player) === true){
                        if(parent.children(`:nth-child(${index + 3})`).hasClass(player) === true){
                            if(player === `player-one`){
                                playerOneCount++;
                            } else if(player === `player-two`){
                                playerTwoCount++;
                            }
                            wrap(player);
                        }
                    }
                }

            };
        game(parent.prev(), parent.next());
    };

    //display screen

    const display = () => {
        $(`.player-board p`).html(player);
        if(player === `player-one`){
            $(`.player-board`).addClass(player);
            $(`.player-board`).removeClass(`player-two`);
        } else if(player === `player-two`){
            $(`.player-board`).addClass(player);
            $(`.player-board`).removeClass(`player-one`);
        }
    };

    display();

//timer

const timer = (event) => {
    let time = 1;
    if(event === `start`){
        setTime = setInterval(() => {
        $(`.player-board h1`).html(`${time} S`);
            time++;
        }, 1000);        
    } else if (event === `restart`){
        
        $(`.player-board h1`).html(`0 S`);
        try {
            clearInterval(setTime);
        } catch {
            
        }
            time = 0;
        
    }

};

//restart function

const restart = () => {
    $(`.hole`).removeClass(`player-one`).removeClass(`player-two`).removeClass(`active`);
    timer(`restart`);
    timerFirst = true;
};


const restartFull = () => {
    playerOneCount = 0;
    playerTwoCount = 0;
    score();
    restart();
};

$(`.restart-btn`).click( restartFull);


const score = () => {
    $(`.scoreOne h1`).html(playerOneCount);
    $(`.scoreTwo h1`).html(playerTwoCount);
};


score();


const popUp = () => {

    if(player === `player-two`){
    $(`.pop-up`).html(`Player One Wins!`).removeClass(`player-two`).show().addClass(`player-one`);
    } else if(player === `player-one`){
        $(`.pop-up`).html(`Player Two Wins!`).removeClass(`player-one`).show().addClass(`player-two`);
    }
    
    setTimeout( () => {
        $(`.pop-up`).hide();
    }, 1200);
}



const wrap = (player) => {
    restart();
    score();
    popUp(player);
}





})();
