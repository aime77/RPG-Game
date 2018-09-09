$(document).ready(function () {

    var charSound = new Audio("assests/sound/corona.mp3");
    var enemySound = new Audio("assests/sound/strike.mp3");
    var attackSound = new Audio("assests/sound/confetti.mp3");

    //object with all characters
    var heroes = {
        spiderman: {
            name: "Spiderman",
            healthpoints: 120,
            attackpoints: 20,
        },
        batman: {
            name: "Batman",
            healthpoints: 140,
            attackpoints: 15,
        },
        wonderwoman: {
            name: "Wonder Women",
            healthpoints: 160,
            attackpoints: 25,
        },
        superman: {
            name: "Superman",
            healthpoints: 170,
            attackpoints: 10,
        }
    };

    $("#name1").append(heroes.spiderman.name);
    $("#name1").attr('name', heroes.spiderman.name.toLowerCase());
    $("#hp1").append(heroes.spiderman.healthpoints);
    $('#img1').append($('<img>', { src: 'assests/images/spiderman.jpg', class: "card-img-top" }));
    $("#hp1").attr('healthpoints', heroes.spiderman.healthpoints);

    $("#name2").append(heroes.batman.name);
    $("#name2").attr('name', heroes.batman.name.toLowerCase());
    $('#img2').append($('<img>', { src: 'assests/images/batman.jpg', class: "card-img-top" }));
    $("#hp2").append(heroes.batman.healthpoints);
    $("#hp2").attr('healthpoints', heroes.batman.healthpoints);

    $("#name3").append(heroes.superman.name);
    $("#name3").attr('name', heroes.superman.name.toLowerCase());
    $('#img3').append($('<img>', { src: 'assests/images/superman.jpg', class: "card-img-top" }));
    $("#hp3").append(heroes.superman.healthpoints);
    $("#hp3").attr('healthpoints', heroes.superman.healthpoints);

    $("#name4").append(heroes.wonderwoman.name);
    $("#name4").attr('name', heroes.wonderwoman.name.toLowerCase());
    $('#img4').append($('<img>', { src: 'assests/images/wonderwoman1.jpg', class: "card-img-top" }));
    $("#hp4").append(heroes.wonderwoman.healthpoints);
    $("#hp4").attr('healthpoints', heroes.wonderwoman.healthpoints);

    //create 6 elements:
    var heroesTitle1 = $('<h2 class="p-0">Which is your favorite superhero?</h2>');
    heroesTitle1.appendTo('#container_1');

    var heroesTitle = $('<h2>Hero:</h2>');
    heroesTitle.appendTo('#container_2');
    heroesTitle.hide();

    var enemyToAttack = $('<h2>Enemies To Attack:</h2>');
    enemyToAttack.appendTo('#container_3');
    enemyToAttack.hide();

    var battleGround = $('<h3 id="bgTitle">Battle Ground</h2>');
    battleGround.appendTo('#container_3');
    battleGround.hide();

    //<button> “attack”, </button>(append to container_3)
    var attackButton = $('<button id="attack">Attack</button>');
    attackButton.addClass("btn btn-primary");
    attackButton.appendTo('#container_3');
    attackButton.hide();

    //<h2> “Defender”</h2>(append to container_3)
    var defender = $('<h2>Defender</h2>');
    defender.appendTo('#container_3');
    defender.hide();

    //<button> “reset” </button>(append to container_3)
    var resetButton = $('<button>Reset</button>');
    resetButton.addClass("btn btn-light");
    resetButton.appendTo('#container_3');
    resetButton.hide();

    var results = $('<p1></p1>');
    results.appendTo('#container_3');

    var chooseEnemy = false;
    var chooseChar = true;
    var reset = true;
    var attack = false;
    

    var chosenChar;
    //click event to choose character
    $(".card").on("click", function () {
        console.log("choose char click before -enemy, char, attack"+chooseEnemy, chooseChar, attack);
        if (chooseEnemy === false && chooseChar === true) {
            charSound.play();
            heroesTitle1.hide();
            heroesTitle.show();
            enemyToAttack.show();
            chosenChar = $(this);
            //CharacterTEXT appends to container 1 top
            chosenChar.attr("id", "selectedchar");
            heroesTitle.appendTo("#container_1");
            chosenChar.addClass("bg-light");
            chosenChar.removeClass("card");
            //character appears at the left of the screen
            chosenChar.appendTo("#container_1");
            //”enemies available to attack”.TEXT appends to container_2-top
            enemyToAttack.appendTo("#container_2");
            //other characters appended to container_2 and add class .opponentsON

            $(".card").appendTo("#container_2");
            $(".card").addClass("bg-danger enemy");
            $(".card").css("float", "left");

        }
        chooseEnemy = true;
        chooseChar = false;
        console.log("choose char click after -enemy, char, attack"+chooseEnemy, chooseChar, attack);
        


    });
    var chosenEnemy;
    //$click event to choose enemy
    $("body").on("click", ".enemy", function () {
        //choose enemy=true
        console.log("choose enemy click before -enemy, char, attack"+chooseEnemy, chooseChar, attack);
        if (chooseEnemy === true && chooseChar === false) {
            $("body").css("background-image", "url(assests/images/bg3.png)")
            enemySound.play();
            battleGround.show();
            attackButton.show();
            defender.show();
            $(".card").removeClass("enemy");
            chosenEnemy = $(this);
            //add class .defender to this (dark blue background, blue border)
            chosenEnemy.removeClass("bg-danger card");
            chosenEnemy.css("background-color", "yellow");
            chosenEnemy.attr("id", "defender");
            //this defender appended to container-3
            chosenEnemy.appendTo("#container_3");
            //attack button becomes active
            attack = true;
            console.log(attack);

        }
        chooseEnemy = false;
        console.log("choose enemy click after -enemy, char, attack" + chooseEnemy, chooseChar, attack);
    });

    //click event attack button            
    $("#attack").on("click", function () {
        //chooseEnemy=false;
        attackSound.play();
        $("body").css("background-image", "url(assests/images/bg1.jpg)");
        $("h1").addClass("text-white");
        console.log(heroes[chosenEnemy.find('[name]').attr('name')].healthpoints);

        console.log(attack, chooseEnemy);

        var calEHP = heroes[chosenEnemy.find('[name]').attr('name')].healthpoints;
        var calCAP = heroes[chosenChar.find('[name]').attr('name')].attackpoints;
        var calEAP = heroes[chosenEnemy.find('[name]').attr('name')].attackpoints;
        var calCHP = heroes[chosenChar.find('[name]').attr('name')].healthpoints;

        if ((attack === true) && (chooseEnemy === false)) {

            //If enemyHP<=0{
            if ((calCHP === 200)) {
                attackButton.hide();
                win();
            }
            else if (calEHP <= 0) {
                attack = false;
                //remove defender form screen
                chosenEnemy.remove();
                //chosenEnemy=true;
                chooseEnemy = true;
            }
            //(if characterHP<=0){
            if (calCHP <= 0) {
                attack = false;
                //loose();
                loose();
            }

            
            // enemyHP – characterPP
            calEHP = calEHP - calCAP;
            
            $("#defender").append(calEHP);

            console.log(calEHP);
            // characeterHP – enemyPP
            calCHP = calCHP - calEAP;
            $("#selectedchar").append(calCHP);

            console.log(calCHP, calEHP);
            //for loop to increase chosenChar attack power

        }
    });
    //win function
    function win() {
        //no more enemies
        //reset.show()
        $("body").css("background-image", "url(assests/images/bg4.jpg)");
        resetButton.show();
        results.text("YOU WON! WAY TO SHOW YOUR HEROIC TALENTS!!");
        results.css("color", "white");
        results.appendTo("#container_4");
    }
    //loose function
    function loose() {
        //reset.show();
        results.text("YOU WON! WAY TO SHOW YOUR HEROIC TALENTS!!")
        resetButton.show();
    }

    resetButton.on("click", function () {
        window.location.reload(true);
    });
});





