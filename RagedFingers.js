const textBox = document.querySelector(".text"),
   inputField = document.querySelector(".input-field");
var MaxTime = 60;
var timeleft = MaxTime;
var mistakes = 0;
var isTyping = false;
var timer

const RANDOM_QUOTE_API_URL = "http://api.quotable.io/random";
const RANDOM_JOKES_API_URL = "https://api.chucknorris.io/jokes/random";
const RANDOM_WORD_API_URL = "https://random-word-api.herokuapp.com/word";
const RANDOM_PARAGRAPH_API_URL = "http://metaphorpsum.com/paragraphs/1/13";

var MAIN_URL=localStorage.getItem("RAGED_FINGERS_TEMP_URL")===null?document.querySelector('#TextType').value:localStorage.getItem("RAGED_FINGERS_TEMP_URL")

document.querySelector('#TextType').value=MAIN_URL

document.querySelector('#TextType').addEventListener("change",()=>{
  MAIN_URL=document.querySelector('#TextType').value
  localStorage.setItem("RAGED_FINGERS_TEMP_URL",MAIN_URL)
  resetStats();
})
//Completely random words
function getRandomParagraph(length) {
  var result = "";
  for (var i = 0; i < length; i++) {
    result += generateRandomWord(
      (Math.floor(Math.random() * 100) % 12) + 2,
      false,
      false
    );
    result += " ";
  }
  return result;
}
function generateRandomWord(length) {
  var result = "";
  var capitols = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var characters = "abcdefghijklmnopqrstuvwxyz";

  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  result =
    capitols.charAt(Math.floor(Math.random() * capitols.length)) + result;
  return result;
}
//Some meaningful paragraph

async function getParagraphFromDictionary() {
  const response = await fetch(MAIN_URL);
  const res = await response.json();
  var result=""
  for(i=0;i<250;i++){
    let randNum=Math.floor(Math.random() * res.words.length)
    result+=res.words[randNum]+" "
  }
  console.log(result);
  return result;
}
// getParagraphFromDictionary();

async function getParagraph() {
  const response = await fetch(RANDOM_PARAGRAPH_API_URL);
  const res = await response.text();
  console.log(res);
  return res;
}
// getParagraph();
async function renderParagraph() {
  const temp = await getParagraphFromDictionary();
  // var temp=textBox.innerHTML;
  textBox.innerHTML = "";
  var temp2=""
  temp.split("").forEach((char) => {
    let span = `<span>${char}</span>`;
    temp2 += span;
  });
  textBox.innerHTML=temp2;
  textBox.querySelectorAll("span")[0].classList.add("active");
  document.addEventListener("keydown", () => inputField.focus());
  textBox.addEventListener("click", () => inputField.focus());
}
renderParagraph();

inputField.addEventListener("input", () => {
  var charIndex = inputField.value.length - 1;

  const characters = textBox.querySelectorAll("span");

  let typedChar = inputField.value.split("")[charIndex];

  if (charIndex < characters.length - 1 && timeleft > 0) {
    if (!isTyping) {
      timer = setInterval(initTimer, 1000);
      isTyping = true;
    }
    characters.forEach((span) => span.classList.remove("active"));

    characters[charIndex + 1].classList.add("active");

    characters[charIndex + 1].scrollIntoView();

    var i = 0;

    if (characters[charIndex].innerText === typedChar) {
      characters[charIndex].classList.remove("incorrect", "correct");
      characters[charIndex].classList.add("correct");
      console.log("correct");
    } else {
      characters[charIndex].classList.remove("incorrect", "correct");
      characters[charIndex].classList.add("incorrect");
      console.log("incorrect");
    }
    mistakes = 0;
    characters.forEach((span, i) => {
      if (i > charIndex) {
        span.classList.remove("correct", "incorrect");
      } else if (span.classList.contains("incorrect")) {
        mistakes++;
      }
      i++;
    });
    document.querySelector(".Mistakes").innerHTML = mistakes;
    document.querySelector(".WPM").innerHTML =
      MaxTime == timeleft
        ? 0
        : Math.round(((charIndex - mistakes) / 5 / (MaxTime - timeleft)) * 60);
    document.querySelector(".CPM").innerHTML = charIndex - mistakes;
    console.log(typedChar);
  } else {
    clearInterval(timer);
    inputField.value = "";
  }
});

function initTimer() {
  if(timeleft > 0) {
      timeleft--;
      document.querySelector('.time-left').innerText = timeleft;
      mistakes=document.querySelector(".Mistakes").innerHTML;
      document.querySelector(".WPM").innerHTML =
      MaxTime == timeleft
        ? 0
        : Math.round(((charIndex - mistakes) / 5 / (MaxTime - timeleft)) * 60);
  } else {
      clearInterval(timer);
    }
  }
  
function resetStats(){
  // timeleft=MaxTime;
  // document.querySelector('.time-left').innerHTML=timeleft;
  // document.querySelector('.WPM').innerHTML="0"
  // document.querySelector('.CPM').innerHTML="0"
  // document.querySelector('.Mistakes').innerHTML="0"
  // document.querySelector('.text').innerHTML=""
  // inputField.value="";
  // renderParagraph();
  location.reload();
  // clearInterval(timer);
  // alert("Stats Reset")
}

function showPage(){
  document.querySelector('.LoadingAnimation').style.opacity="0";
}
