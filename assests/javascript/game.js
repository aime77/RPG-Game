$(document).ready(function () {

    var charSound = new Audio("assests/sound/corona.mp3");
    var enemySound = new Audio("assests/sound/strike.mp3");
    var attackSound = new Audio("assests/sound/flash-1.mp3");
    var bgSound = new Audio("assests/sound/hero.wav");

    //object with all characters
    var heroes = {
        spiderman: {
            name: "Spiderman",
            healthpoints: 260,
            attackpoints: 5,
        },
        batman: {
            name: "Batman",
            healthpoints: 55,
            attackpoints: 15,
        },
        wonderwoman: {
            name: "Wonderwoman",
            healthpoints: 70,
            attackpoints: 25,
        },
        superman: {
            name: "Superman",
            healthpoints: 350,
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
    $(".popup-overlay").hide();
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
    var resetButton = $('<button class="btn btn-light mx-2">Reset</button>');
    resetButton.addClass("btn btn-light");
    resetButton.appendTo('#container_4');
    resetButton.hide();

    var results = $('<p1 class="display-4"></p1>');
    results.appendTo('#container_3');

    var chooseEnemy = false;
    var chooseChar = true;

    var calEHP;
    var calCAP;
    var calEAP;
    var calCHP;

    var chosenChar;
    //click event to choose character
    $(".card").on("click", function () {
        console.log("choose char click before -enemy, char, attack" + chooseEnemy, chooseChar, attack);
        if (chooseEnemy === false && chooseChar === true) {
            $("body, html").css("background-image", "url(assests/images/new_hero.jpg)")
            heroesTitle.css("color", "white");
            enemyToAttack.css("color", "white");
            charSound.play();
            heroesTitle1.hide();
            heroesTitle.show();
            enemyToAttack.show();
            chosenChar = $(this);
            calCAP = heroes[chosenChar.find('[name]').attr('name')].attackpoints;
            calCHP = heroes[chosenChar.find('[name]').attr('name')].healthpoints;
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
            chooseEnemy = true;
            chooseChar = false;
        }
        console.log("choose char click after -enemy, char, attack" + chooseEnemy, chooseChar, attack);
    });

    var attack = false;
    var chosenEnemy;
    //$click event to choose enemy
    $("body").on("click", ".enemy", function () {
        //choose enemy=true
        console.log("choose enemy click before -enemy, char, attack" + chooseEnemy, chooseChar, attack);
        if (chooseEnemy === true && chooseChar === false) {
            $("body, html").css("background-image", "url(assests/images/bg3.png)")
            enemySound.play();
            battleGround.show();
            attackButton.show();
            defender.show();
            defender.css("color", "white");
            $("h1").addClass("text-white");
            results.hide();
            $(".card").removeClass("enemy");
            chosenEnemy = $(this);
            calEHP = heroes[chosenEnemy.find('[name]').attr('name')].healthpoints;
            calEAP = heroes[chosenEnemy.find('[name]').attr('name')].attackpoints;
            console.log(chosenEnemy.children("card-body"));
            //add class .defender to this (dark blue background, blue border)
            chosenEnemy.removeClass("bg-danger card mx-7");
            chosenEnemy.css("background-color", "yellow");
            chosenEnemy.attr("id", "defender");
            //this defender appended to container-3
            chosenEnemy.appendTo("#container_3");
            chooseEnemy = false;
            //attack button becomes active
        }
        attack = true;
        console.log("choose enemy click after -enemy, char, attack " + chooseEnemy, chooseChar, attack);
    });

    var counter = 0;
    //click event attack button            
    $("#attack").on("click", function () {
        //chooseEnemy=false;
        attackSound.play();
        results.show();
        $("body, html").css("background-image", "url(assests/images/bg1.jpg)");
        if ((attack === true) && (chooseEnemy === false)) {
            // enemyHP – characterPP
            calEHP = calEHP - calCAP;

            $("#defender").children(".cb").text(calEHP);

            console.log(calEHP);
            // characeterHP – enemyPP
            calCHP = calCHP - calEAP;
            calCAP = calCAP * 2;
            console.log("update " + calCAP);

            $("#selectedchar").children(".cb").text(calCHP);
            console.log(calCHP, calEHP);
            //for loop to increase chosenChar attack power

            var attackText = "You attacked " + heroes[chosenEnemy.find('[name]').attr('name')].name + " for " + calCAP + " damage. " + heroes[chosenEnemy.find('[name]').attr('name')].name + " attacked you back for " + calEAP + " damage.";
            console.log(attackText);
            results.text(attackText);
            results.appendTo("#container_3");
            results.css("color", "white");

            if (calEHP <= 0) {
                counter++;
                console.log(counter);
                attack = false;
                //remove defender form screen
                var nextChar = "Good job! Choose a different enemy!";
                attackButton.hide();
                battleGround.hide();
                results.text(nextChar);
                defender.hide();
                results.appendTo("#container_3");
            
                $("div").remove('#defender');

                //chosenEnemy=true;
                chooseEnemy = true;
                $(".card").addClass("enemy");
                console.log("choose enemy click before -enemy, char, attack" + chooseEnemy, chooseChar, attack);
            }
            if (counter === 3) {
                attackButton.hide();
                win();
            }
            //(if characterHP<=0){
            if (calCHP <= 0) {
                attack = false;
                $("div").remove('#defender');
                //loose();
                loose();
            }
        }
    });
    //win function
    function win() {
        //no more enemies
        //reset.show()
        battleGround.hide();
        enemyToAttack.hide();
        defender.hide();
        $("body, html").css("background-image", "url(assests/images/bg4.jpg)");
        results.text("YOU WON! WAY TO SHOW YOUR HEROIC SKILLS!!");
        results.css("color", "white");
        results.appendTo("#container_3");
        resetButton.show();
    }
    //loose function
    function loose() {
        //reset.show();
        $("body, html").css("background-image", "url(assests/images/hero_night.jpg)");
        results.text("TRY AGAIN!!");
        results.appendTo("#container_3");
        resetButton.show();
    }

    resetButton.on("click", function () {
        bgSound.play();
        window.location.reload(true);
    });
    $(".open").on("click", function () {
        $(".popup, .popup-content").addClass("active");
        $(".popup-overlay").show();
    });

    $(".close, .popup").on("click", function () {
        $(".popup, .popup-content").removeClass("active");
        $(".popup-overlay").hide();
    });
});





