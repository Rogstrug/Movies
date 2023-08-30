document.addEventListener("DOMContentLoaded", (event) => {

const movieString = "1. Vertigo,8.3,1958,2. Rear Window,8.5,1954,3. Gone With The Wind,8.2,1939,4. Shutter Island,8.2,2010,5. Wolf of the Wall Street,8.2,2013,6. Some Like it Hot,8.2,1959,7. Taxi Driver,8.2,1976,8. American Psycho,7.6,2000,9. Once Upon a Time in Hollywood,7.6,2019,10. Once Upon a Time in Wild West,8.5,1968,11. Dial M for Murder,8.2,1954,12. Coraline,7.7,2009,13. The Searchers,7.9,1956,14. The Hills Have Eyes,6.4,2006,15. Le salaire de la peur,8.2,1953"
var arr = movieString.split(","); //Array sa svim podacima (splitan)

var pics = $("img");

var titleIndex = 0;
var imdbIndex = 1;
var yearIndex = 2;

var titles = $("h2");
var infos = $("h3") //godina i imdb ocijena


var count=0; //pomoćni brojač koji mijenja "i"
for(var i=0;i < pics.length; i++){
    var destination = "images/pic" + i + ".png";
    pics[i].setAttribute("src",destination);
    titles[i].innerText=arr[titleIndex];
    infos[count].innerText = "IMDB Rating: " + arr[imdbIndex];
    infos[count+1].innerText ="Year: " +  arr[yearIndex];
    titleIndex+=3;
    imdbIndex+=3;
    yearIndex+=3;
    count+=2;
}


var appearElement = $(".off_screen")[0];
$(appearElement).fadeOut(1);



window.counter = 0; //koliko je filmova odgledano
var numOfMovies = titles.length;
var h1Text = $("h1");
h1Text[1].innerText = "Movies Watched: " + counter + "/" + numOfMovies;
appearElement.innerHTML = "Movies Watched: " + counter + "/" + numOfMovies;

console.log(h1Text[1]);
$("button").on("click",function(event){
    if(event.target.id != "generatePDFButton"){
        if(event.target.style.backgroundColor != "gold"){
            event.target.style.backgroundColor = "gold";
            var span =  event.target.querySelector("span"); //u spanu se nalazi kvačica
            span.style.visibility = "visible";
            event.target.style.color = "black";
            counter++;
            h1Text[1].innerText="Movies Watched: " + counter + "/" + numOfMovies;
            appearElement.innerHTML = "Movies Watched: " + counter + "/" + numOfMovies;
        }
        else{
            event.target.style.color = "white";
            event.target.style.backgroundColor = "dodgerblue";
            var span =  event.target.querySelector("span"); //u spanu se nalazi kvačica
            span.style.visibility = "hidden";
            counter--;
            appearElement.innerHTML="Movies Watched: " + counter + "/" + numOfMovies;
            h1Text[1].innerText="Movies Watched: " + counter + "/" + numOfMovies;
        }
    }
});

var scrollAmount;

$(window).on("scroll", function() {
    scrollAmount = window.scrollY;
    if (scrollAmount > 200) {
      // appearElement.style.visibility="visible";
         $(appearElement).fadeIn();
    } else {
        $(appearElement).fadeOut();
    }
});


//$(appearElement).addClass("show");
  });
