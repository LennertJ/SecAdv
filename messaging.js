//var upload = document.getElementById('premade');
//upload.addEventListener('drop', DropFile, false);
//upload.addEventListener('dragover', DragFile, false);

//var upload = document.getElementById('premade2');
//upload.addEventListener('drop', DropFile2, false);
//upload.addEventListener('dragover', DragFile, false);

let imagecounter = 0;
let cachedImage = "";

var loadFile = function(event) {
    //var output = document.getElementById('output');
    //output.src = URL.createObjectURL(event.target.files[0]);
    cachedImage = URL.createObjectURL(event.target.files[0]);
  };

function ChatBoxMessage(fromId, toId){
    //display message
    let message = document.getElementById('textarea' + fromId).value;
    displayMessageOrigin(fromId ,message);
    document.getElementById('textarea' + fromId).value="";
    let hashedMessage = hashcode( message);

    // encript message


    //send encypted message
    chatboxReceiveMessage(toId, message, hashedMessage );
}

function displayMessageOrigin(id, message) {
    let messagefield = document.createElement("Div");
    messagefield.className += "container";
    let messageParagraph = document.createElement("P");
    messageParagraph.innerHTML = message;
    messagefield.appendChild(messageParagraph);
    document.getElementById("chatbox" + id).appendChild(messagefield);
}

function displayImageOrigin(id) {
    let messagefield = document.createElement("Div");
    messagefield.className += "container";
    let messageImage = document.createElement("img");
    messageImage.id = "image" + imagecounter;
    messageImage.src = cachedImage;
    messagefield.appendChild(messageImage);
    document.getElementById("chatbox" + id).appendChild(messagefield);
}

function displayMessageReceiver(idOfReceiver, message, hash) {
    let messagefield = document.createElement("Div");
    messagefield.className += "container darker";
    let messageParagraph = document.createElement("P");
    messageParagraph.innerHTML = message;
    let hashcheck = document.createElement("P");
    hashcheck.innerHTML = hash;
    messagefield.appendChild(hashcheck);
    messagefield.appendChild(messageParagraph);
    document.getElementById("chatbox" + idOfReceiver).appendChild(messagefield);
}

function chatboxReceiveMessage(id ,message, hashedMessage) {
    //decrypt message

    //✔ hash
    let hash = "another error occured"
    if(hashcode(message) == hashedMessage){
        hash = "hash matches, message received correctly (" + hashedMessage + ")"; 
    }else{
        hash = "hash doesn't match, expected hashvalue not met (" + hashedMessage + ")"; 
    }

    //display decrypted message
    displayMessageReceiver(id, message, hash);
}

function hashcode(s){
    return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
  }

function DragFile(evt){
	evt.preventDefault();
}

function DropFile(evt){
	//js magic (stops opening of file)
    evt.preventDefault();
	
	var files = evt.dataTransfer.files; // get all files (not sure how to block multiple files)
	var file = files[0];// take first file from list
	document.getElementById("fileInfo").innerHTML = file.name + ", " + file.size + " bytes"; // show unnesecairy info just because
}

function DropFile2(evt){
	//js magic (stops opening of file)
    evt.preventDefault();
	
	var files = evt.dataTransfer.files; // get all files (not sure how to block multiple files)
	var file = files[0];// take first file from list
	document.getElementById("fileInfo2").innerHTML = file.name + ", " + file.size + " bytes"; // show unnesecairy info just because
}

function UploadMessage(fromId, toId){
    let message = document.getElementById('textarea' + fromId).value;
    displayImageOrigin(fromId);
    imagecounter++;
    let hashedMessage = hashcode( message);

}