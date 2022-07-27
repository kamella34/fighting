import { Allies } from "./class.js";
import {
  randomNumber,
  generateEnemy,
  changeMessageStatus,
  isItNullOrUndefined,
  addMonsterInDeadZone
} from "./generate.js";
import { enemiesList } from "./data.js";


//Gere le tour true = joueur, false = enemy
let actualTurn = true;
//Permet de gerer l'appuie sur le bouton attack
let canAttack = true;
//Gestion special
let howMuchAttack = 0;
let special = false;
//Les entités
let hero = null;
let actualEnemy;

/**
 * SELECTEUR DE BASES
 */
let newEnemy = document.querySelector(".enemies-generator");
let arrowSelector = document.querySelector(".turn-arrow > img");
let attackBtn = document.querySelector(".attack-js");
let specialBtn = document.querySelector(".special-js");

let btnJouer;
let btnScores;
let btnCredit;
let accueil;
let btnAccueil;
let btnRetourMenuCredit;
let btnRetourMenuScore;
let btnQuit;
let btnSend;

let arcade;
let articleBtnAccueil;
let allies;
let turnArrow;
let enemy;
let jouer;
let statusBar1;
let statusBar2;

let artCreditTable;
let artScoreTable;
let headerJouer;
let artPseudoEnter;
let containerMenu;
let ppEnterName;

let artHistory;
let imgHistory;
let nbrImageHistory;

nbrImageHistory = document.querySelectorAll(".nbrImg");
imgHistory = document.querySelector(".dead-enemy");
artHistory = document.querySelector(".history");


containerMenu = document.querySelector(".container-menu");
ppEnterName = document.querySelectorAll(".pp-enter-name");
artPseudoEnter = document.querySelector(".art-pseudo-enter");
btnSend = document.querySelector(".btn-envoyer");
btnQuit = document.querySelector(".btn-quitter");
btnAccueil = document.querySelectorAll(".btn-accueil");
arcade = document.querySelector(".arcade");
accueil = document.querySelector(".accueil");
statusBar1 = document.querySelector(".pp-status1");
artScoreTable = document.querySelector(".art-score-table");
artCreditTable = document.querySelector(".art-credit-table");
btnRetourMenuCredit = document.querySelector(".btn-retour-menu-credit");
btnRetourMenuScore = document.querySelector(".btn-retour-menu-score");

headerJouer = document.querySelector(".header-jouer");
statusBar2 = document.querySelector(".pp-status2");
jouer = document.querySelector(".jouer")
allies = document.querySelector(".allies");
turnArrow = document.querySelector(".turn-arrow");
enemy = document.querySelector(".enemy");

//Lancement du jeux
beginTheGame();

/**
 * ! SUITE
 * TODO: Crée un menu en HTML/CSS contenant Jouer - Scores - Crédit et faite les TODO
 */

articleBtnAccueil = document.createElement("article");
accueil.append(articleBtnAccueil);
articleBtnAccueil.classList.add("art-btn-accueil");

btnJouer = document.createElement("button");
articleBtnAccueil.append(btnJouer);
btnJouer.textContent = "Jouer";
btnJouer.classList.add("nes-btn");
btnJouer.classList.add("is-warning");
btnJouer.classList.add("btn-accueil");

btnScores = document.createElement("button");
articleBtnAccueil.append(btnScores);
btnScores.textContent = "Score";
btnScores.classList.add("nes-btn");
btnScores.classList.add("is-warning");
btnScores.classList.add("btn-accueil");

btnCredit = document.createElement("button");
articleBtnAccueil.append(btnCredit);
btnCredit.textContent = "Credit";
btnCredit.classList.add("nes-btn");
btnCredit.classList.add("is-warning");
btnCredit.classList.add("btn-accueil");

statusBar1.textContent = "Bienvenue dans Fighting Surface";
statusBar2.textContent = "Cliquez sur le bouton pour commencer la partie !";


/**
 * ! SUITE
 * TODO: Evenement pour gerer le bouton play du menu
 * * 1 - Fait disparaitre le menu et apparaitre le jeux
 */
function vanishBorne() {
  arcade.classList.add("scale-up-center");
  accueil.classList.add("game");
}


btnJouer.addEventListener("click", function () {
  vanishBorne()
  setTimeout(function () {
    headerJouer.classList.remove("game");
    jouer.classList.remove("game");
  }, 3000);
})




/**
 * ! SUITE
 * TODO: TOUTES LES FONCTIONS POUR GERER LES BOUTONS SCORE ET CREDIT
 * * 1 - Fait disparaitre le menu et apparaitre le tableau
 */
function menuDisplay() {
  btnJouer.classList.remove("game");
  btnScores.classList.remove("game");
  btnCredit.classList.remove("game");
};

function otherMenuDisplay() {
  btnJouer.classList.add("game");
  btnScores.classList.add("game");
  btnCredit.classList.add("game");
};
// -------------------------------quand le hero meurt-------------------------------------


btnQuit.addEventListener("click", function () {
  articleBtnAccueil.classList.remove("game");
  containerMenu.classList.remove("game");
  artPseudoEnter.classList.add("game");
  location.reload();
});

/**
 * ! SUITE
 * TODO: Evenement pour gerer le bouton highscore du menu
 * * 1 - Fait disparaitre le menu et apparaitre le tableau
 */

btnScores.addEventListener("click", function () {
  otherMenuDisplay();
  artScoreTable.classList.remove("game");
});

btnRetourMenuScore.addEventListener("click", function () {
  menuDisplay();
  artScoreTable.classList.add("game");
});

/**
 * ! SUITE
 * TODO: Evenement pour gerer le bouton crédit du menu
 * * 1 - Fait disparaitre le menu et apparaitre le crédit
 */


btnCredit.addEventListener("click", function () {
  otherMenuDisplay();
  artCreditTable.classList.remove("game");
});

btnRetourMenuCredit.addEventListener("click", function () {
  menuDisplay();
  artCreditTable.classList.add("game");
});


/**
 * TODO: Evenement qui lance un combat EVENT SI HERO MEURT
 * * 1 - Generer un adversaire - change le message barre status
 * * 2 - Changer le status en round lancer
 * * 3 - Tirer aléatoirement le tour (joueur ou adv)
 */



/**
 * 
 *  TODO: Ce code à un soucis - fait en sorte d'attaquer dans le if (verification null undefined)
 *  TODO: Evenement qui gère l'attaque
 */
attackBtn.addEventListener("click", function () {

  if (actualTurn === true && hero.isDead() === false && canAttack === true) {
    canAttack = false;
    statusBar2.textContent = "Vous allez affronter  "
    changeColorSpecial();

    if (actualEnemy === null || actualEnemy === undefined) {
    } else {
      hero.attack(actualEnemy);
      // Changin color of btn
      removeOrAddAttack();
      changeArrowDirection();
      howMuchAttack++;
      special = checkSpecial(howMuchAttack);
    }

    setTimeout(function () {
      actualEnemy.attack(hero);
      if (actualEnemy.isDead() === false && hero.isDead() === false) {
        changeArrowDirection("allies");
        changeColorSpecial();
      } else if (actualEnemy.isDead() === true) {
        hero.healByVictory();
        addMonsterInDeadZone(actualEnemy);
        actualEnemy = generateEnemy(enemiesList);
        newRound();
      }
      canAttack = true;

    }, 2000);

  } else {
    console.log("vous ne pouvez pas attaquer")
  }
});

/**
 * TODO: Evenement qui gère le spécial
 *
 */
specialBtn.addEventListener("click", function () {
  if (special === true) {
    if (actualTurn === true && hero.isDead() === false && canAttack === true) {
      // canAttack = false;
      hero.specialAttack(actualEnemy);
      howMuchAttack = 0;
      changeArrowDirection();
      special = false;
    }

    setTimeout(function () {

      if (actualEnemy.isDead() === false && hero.isDead() === false) {
        actualEnemy.attack(hero);
        changeArrowDirection("allies");

      } else if (actualEnemy.isDead() === true) {
        hero.healByVictory();
        addMonsterInDeadZone(actualEnemy);
        actualEnemy = generateEnemy(enemiesList);
        newRound();
      } else {

      }
      canAttack = true;
    }, 2000);

  } else {
    changeMessageStatus("Le spécial n'est pas encore prêt !")
  }

});
/**
 * TODO: Evènement qui ajoute un enemy et lance une manche 
 */
newEnemy.addEventListener("click", function () {
  try {
    //1
    actualEnemy = generateEnemy(enemiesList);

    //
    newRound();
  } catch (error) {
    console.error(`Une erreur est survenue ${error}`);
    console.log(error);
  }
});

/**
 * TODO : Instanciation du héros, ICI démarre le JEUX 
 */
function beginTheGame() {
  //*Le bug ce trouve ici, il manquais un argument, le chemin vers l'image
  //*Le code pourrait être améliorer, il y a des soucis dans l'organisation selon moi
  if (!isItNullOrUndefined(hero)) {
    hero = new Allies("Jeanjean",0, 60, 3, "");
    hero.statusInit();
  }
}
/**
 * TODO: Permet de mettre ou retirer la possibilité d'attaquer
 * @param {String} action
 */
function removeOrAddAttack(action = "", special = false) {
  if (action === "add") {
    console.log("add attack");
    attackBtn.classList.add("is-error");
    attackBtn.classList.remove("is-disabled");
  } else {
    console.log("remove attack");
    attackBtn.classList.remove("is-error");
    attackBtn.classList.add("is-disabled");
  }
  if (special === true) {
    console.log("add special");
    specialBtn.classList.add("is-primary");
    specialBtn.classList.remove("is-disabled");
  } else {
    console.log("remove special");
    specialBtn.classList.remove("is-primary");
    specialBtn.classList.add("is-disabled");
  }
}

/**
 * TODO: fonction qui change la fleche de direction
 * *   Prend une direction en argument
 * *   La fleche tourne lentement vers l'ennemis
 * @param { STRING }
 * @return { VOID }
 */

function changeArrowDirection(direction = "") {
  if (direction === "allies") {
    console.log("Dans change Arrow Direction: Tour du héro");
    if (arrowSelector.classList.contains("quick-allies-turn")) {
      arrowSelector.classList.add("allies-turn");
      arrowSelector.classList.remove("quick-allies-turn");

    } else {
      arrowSelector.classList.add("allies-turn");

      arrowSelector.classList.remove("quick-allies-turn");
    }
    arrowSelector.classList.remove("quick-enemy-turn");
    arrowSelector.classList.remove("enemy-turn");

  } else {
    console.log("Dans change Arrow Direction: Tour de l'ennemie");
    arrowSelector.classList.add("enemy-turn");
    arrowSelector.classList.remove("quick-allies-turn");
    arrowSelector.classList.remove("allies-turn");

    arrowSelector.classList.remove("quick-enemy-turn");
  }
}
/**
 * TODO: fonction qui change la fleche de direction démarrage du jeux ou d'un round
 * *    Selon un nombre aléatoire définis qui commence
 * *
 */
function newRound() {

  let rand = randomNumber();
  rand = 49;
  if (rand <= 50) {
    changeMessageStatus("c'est vous qui commencer");
    changeArrowDirection("allies");
    //Changin color of btn
    changeColorSpecial();

  } else {
    changeMessageStatus("c'est l'ennemis qui commence");
    changeArrowDirection();
    setTimeout(function () {
      actualEnemy.attack(hero);
      changeArrowDirection("allies");
      changeColorSpecial();
    }, 3000);

  }
}

/**
 * TODO: Fonction/méthode qui vérifie si le joueur à un special graçe au compteur d'attaque
 * @param { Number } 
 * @return { Boolean }
 */
function checkSpecial(attackCount) {
  if (attackCount >= 3) {
    return true;
  } else {
    return false;
  }
}

/**
 * TODO: Fonction qui active ou non le btn special
 * @return { VOID }
 */
function changeColorSpecial() {
  if (checkSpecial(howMuchAttack)) {
    removeOrAddAttack("add", true);
  } else {
    removeOrAddAttack("add");

  }
}

/**
 * Mettre en place un pierre feuille sciseaux, 
 */



 
  console.log("nbr d images " + `${imgHistory}`.length);


