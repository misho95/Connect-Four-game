( () => {

   let player = `player-one`;

   let playerOneCount = 0;
   let playerTwoCount = 0;

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
            } else {
                
                if($(this).find(`.active`).first().prev().hasClass(`hover-line`) !== true){
                    $(this).find(`.active`).first().prev().addClass(`active`).addClass(player);
                    switchPlayer();
                    playerWins($(this).find(`.active`).first(), $(this));
                }
            }

            display();


                if(timerFirst === true){
                    timer(`start`);
                
                    timerFirst = false;
        
                }
            }

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
                        restart();
                        score();
                    } else if(next.next().children(`:nth-child(${index})`).hasClass(player) === true){
                        if(player === `player-one`){
                            playerOneCount++;
                        } else if(player === `player-two`){
                            playerTwoCount++;
                        }
                        restart();
                        score();
                    }
                } 
                // three prev check
                else if(prev.children(`:nth-child(${index})`).hasClass(player) === true){
                    if(prev.prev().children(`:nth-child(${index})`).hasClass(player) === true){
                        if(prev.prev().prev().children(`:nth-child(${index})`).hasClass(player) === true){
                            if(player === `player-one`){
                                playerOneCount++;
                            } else if(player === `player-two`){
                                playerTwoCount++;
                            }
                            restart();
                            score();
                        }
                    }
                } 
                // three next check
                else if(next.children(`:nth-child(${index})`).hasClass(player) === true){
                    if(next.next().children(`:nth-child(${index})`).hasClass(player) === true){
                        if(next.next().next().children(`:nth-child(${index})`).hasClass(player) === true){
                            if(player === `player-one`){
                                playerOneCount++;
                            } else if(player === `player-two`){
                                playerTwoCount++;
                            }
                            restart();
                            score();
                        }
                    }
                } 
                //check diagonal top left
                else if(prev.children(`:nth-child(${index - 1})`).hasClass(player) === true){
                    if(prev.prev().children(`:nth-child(${index - 2})`).hasClass(player) === true){
                        if(prev.prev().prev().children(`:nth-child(${index - 3})`).hasClass(player) === true){
                            if(player === `player-one`){
                                playerOneCount++;
                            } else if(player === `player-two`){
                                playerTwoCount++;
                            }
                            restart();
                            score();
                        }
                    }
                }
                //check diagonal bottom left
                else if(prev.children(`:nth-child(${index + 1})`).hasClass(player) === true){
                    if(prev.prev().children(`:nth-child(${index + 2})`).hasClass(player) === true){
                        if(prev.prev().prev().children(`:nth-child(${index + 3})`).hasClass(player) === true){
                            if(player === `player-one`){
                                playerOneCount++;
                            } else if(player === `player-two`){
                                playerTwoCount++;
                            }
                            restart();
                            score();
                        }
                    }
                } 
                //check diagonal top right
                else if(next.children(`:nth-child(${index - 1})`).hasClass(player) === true){
                    if(next.next().children(`:nth-child(${index - 2})`).hasClass(player) === true){
                        if(next.next().next().children(`:nth-child(${index - 3})`).hasClass(player) === true){
                            if(player === `player-one`){
                                playerOneCount++;
                            } else if(player === `player-two`){
                                playerTwoCount++;
                            }
                            restart();
                            score();
                        }
                    }
                }
                //check diagonal bottom right
                else if(next.children(`:nth-child(${index + 1})`).hasClass(player) === true){
                    if(next.next().children(`:nth-child(${index + 2})`).hasClass(player) === true){
                        if(next.next().next().children(`:nth-child(${index + 3})`).hasClass(player) === true){
                            if(player === `player-one`){
                                playerOneCount++;
                            } else if(player === `player-two`){
                                playerTwoCount++;
                            }
                            restart();
                            score();
                        }
                    }
                } 
                //horizontal top to bottom
                else if(parent.children(`:nth-child(${index + 1})`).hasClass(player) === true){
                    if(parent.children(`:nth-child(${index + 2})`).hasClass(player) === true){
                        if(parent.children(`:nth-child(${index + 3})`).hasClass(player) === true){
                            if(player === `player-one`){
                                playerOneCount++;
                            } else if(player === `player-two`){
                                playerTwoCount++;
                            }
                            restart();
                            score();
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
    $(`.menu-drop-down`).hide();
};

$(`.restart-btn`).click(restart);

//top menu

$(`.menu-btn`).click( () => {
    $(`.menu-drop-down`).toggle();
});




const score = () => {
    $(`.scoreOne h1`).html(playerOneCount);
    $(`.scoreTwo h1`).html(playerTwoCount);
};

score();



})();
