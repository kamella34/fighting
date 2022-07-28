/**
 * TODO: Tableau avec cinq ennemis
 * * 1 - Il devra contenir le nécéssaire pour instancier
 * * 2 - Un ennemis et une image
 * * 3 - Déplacer le tableau dans un fichier data.js
 */
//  let enemiesList = [
//     ["le baveu", 140, 15, 6, 30, "img/barzork_brave.png"],
//     ["le chetif", 70, 25, 3, 70, "img/barzork_chetif.png"],
//     ["le bourrin", 140, 14, 0, 40, "img/barzork_bourrin.png"],
//     ["l'invisible", 40, 35, 0, 25, "img/barzork_invisible.png"],
//     ["l'admin", 180, 45, 50, 65, "img/barzork_admin.png"],
//     // [],
//   ];

// let apiMonster = 'http://localhost/fighting_surface_api/monsters' ;


  async function getAllMonsters(){
  const response = await fetch('http://localhost/fighting_surface_api/monsters');
  const monsters = await response.json();
  return monsters;
}

 let enemiesList = await getAllMonsters();

  export {enemiesList};