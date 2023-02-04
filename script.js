const li = document.querySelectorAll('li');
const count = document.querySelector('.count');
const  indicat = document.querySelector('.indicat');
const conuter = count.children[0];
const level = count.children[1];

//Get level from localStorage
let local = localStorage.getItem('level');
let fristClicked, secendClicked;
let fristValue, secendValue;
let gameLevel = 0;
let cardConter = 0;
let gameOver = 0;

/*if localStorage is null then set level to 1 */
if(local == null){
  gameLevel = 1;
}else {
  gameLevel = local;
};

li.forEach((item) => {
  item.addEventListener('click',() => {
    game(item);
  });
});
//set conuter when page laod 
conuter.innerText = `Card Counter : ${cardConter}`;
//
level.innerText = `Level : ${gameLevel}`;

function game(element){
  const back = element.querySelector('.back');
  //add flip class to clicked element
  element.classList.add('flip');
  if(!fristClicked){
    fristClicked = element;
    fristValue = back.innerText;
    return;
  };
  
   secendClicked = element;
   secendValue = back.innerText;
   /*add disable class to all cards when two card are fliped*/
   for(let i=0;i<li.length;i++){
     li[i].classList.add('dis');
   }
   //logic
   if(fristValue == secendValue){
     //if two cards match
     gameOver++;
      if(gameOver == 6){
        setTimeout(()=>{
          refresh()
        //update game level
          gameLevel++;
        //set level in localStorage
          localStorage.setItem('level',gameLevel);
          //set level
          level.innerText = `Level : ${gameLevel}`;
        },1000);
      }
      //remove disable class after matching
      for(let i=0;i<li.length;i++){
        li[i].classList.remove('dis')
        fristClicked = '';
        secendClicked = '';
      };
      //update conuter
     conuter.innerText = `CardCounter : ${cardConter+=2}`;
   }else {
     //if cards not match 
     //update conuter
     conuter.innerText = `CardCounter : ${cardConter +=2}`;
     setTimeout(()=> {
       //remove flip class 
       if(fristClicked !== '' && secendClicked !== ''){
        fristClicked.classList.remove('flip')
        secendClicked.classList.remove('flip')
        //remove disable class after matching
        for(let i=0;i< li.length;i++){
          li[i].classList.remove('dis')
          fristClicked = '';
          secendClicked = '';
        };
       }
     },800)
     
   }
}


function refresh(){
  //remove flip class s to all
  for(let i=0;i< li.length; i++){
    li[i].classList.remove('flip');
    li[i].classList.remove('dis');
  };
   //2D Array
   setTimeout(()=> {
     const char = [
       [1,2,3,4,5,6,1,2,3,4,5,6],
       ['A','B','C','D','E','F','A','B','C','D','E','F'],
       ['♡','☆','♢','♤','♧','♕','♡','☆','♢','♤','♧','♕'],
       ['⚀','⚁','⚂','⚃','⚄','⚅','⚀','⚁','⚂','⚃','⚄','⚅']
     ];
     //randomize array elements
     const random = char.sort(() => 0.5 - Math.random());
     const randmize = random[0].sort(() => 0.5 - Math.random());
     
     //set array elements in back cards
     for(let i=0; i<li.length;i++){
       const back = li[i].querySelector('.back');
       back.innerText= randmize[i];
     };
     
     if(randmize.includes('A')){
       indicat.innerText = 'ABC';
     }else if(randmize.includes('⚀')){
       indicat.innerText = '⚅';
     }else if(randmize.includes('♡')){
       indicat.innerText = '♥';
     }else{
       indicat.innerText = '123';
     }
   },100);
  //update cardConter
  cardConter = 0;
  conuter.innerText = `CardCounter : ${cardConter}`;
  
  //set empty to these when game refresh
  fristClicked = '';
  secendClicked = '';
  gameOver = '';
}
refresh();

//Kshapi