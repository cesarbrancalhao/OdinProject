let stop = 0;

function validate(e){
    e.preventDefault();
 
    let input = document.getElementById("searchField").value;
 
    const seriously = /[^A-Za-z0-9\s]/;
    if(seriously.test(input)){
        alert(stop === 0 ? "No special characters" : "Stop.");
        stop++;
        return;
    }
 
    window.open("https://www.google.com/search?q=" + encodeURIComponent(input), "_blank");
 }
 
 document.getElementById("searchForm").addEventListener("submit", validate);