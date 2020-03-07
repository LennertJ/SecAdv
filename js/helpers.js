let imagecounter = 0;
let cachedImage = "";

{//helpers
  var loadFile = function(event) {
    cachedImage = URL.createObjectURL(event.target.files[0]);
    };

function hashcode(s){
    return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
    }

}