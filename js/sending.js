let imagecounter = 0;
let cachedImage = "";

function ChatBoxMessage(fromId, toId){
    //display message
    let message = document.getElementById('textarea' + fromId).value;
    if(message == ""){return};
    displayMessageOrigin(fromId ,message);
    document.getElementById('textarea' + fromId).value="";
    // encript message
    let hashedMessage = hashcode(message);


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

function displayImageReceiver(id, hash) {
    let messagefield = document.createElement("Div");
    messagefield.className += "container darker";
    let messageImage = document.createElement("img");
    messageImage.id = "image" + imagecounter;
    messageImage.src = cachedImage;
    let hashcheck = document.createElement("P");
    hashcheck.innerHTML = hash;
    messagefield.appendChild(hashcheck);
    messagefield.appendChild(messageImage);
    document.getElementById("chatbox" + id).appendChild(messagefield);
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

function chatboxReceiveImage(id ,filename , hashedMessage) {
    //decrypt message

    //✔ hash
    let hash = "another error occured"
    if(hashcode(filename) == hashedMessage){
        hash = "hash matches, message received correctly (" + hashedMessage + ")"; 
    }else{
        hash = "hash doesn't match, expected hashvalue not met (" + hashedMessage + ")"; 
    }

    //display decrypted message
    displayImageReceiver(id, hash);
}

function UploadMessage(fromId, toId){
    let filename = document.getElementById("fileUpload" + fromId).value;
    if(filename == ""){return};
    displayImageOrigin(fromId);


    let hashedMessage = hashcode(filename);
    chatboxReceiveImage(toId,filename, hashedMessage );
    document.getElementById("fileUpload" + fromId).value = "";
    imagecounter++;
    cachedImage = "";
}

var loadFile = function(event) {
    cachedImage = URL.createObjectURL(event.target.files[0]);
  };

function hashcode(s){
    return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
  }