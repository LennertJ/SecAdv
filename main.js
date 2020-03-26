let imagecounter = 0;
let cachedImage = "";

//Use these keys to generate key for aes;
//keys are small to make it manageable
//no volotile keys tho, because that's hard to do manual
const privateKeyBob  = 3; //sender1

const privateKeyAlice= 5; //sender2

const decidedKey= 2 ;


{//send
function ChatBoxMessage(fromId, toId){//main
    //display message
    let message = document.getElementById('textarea' + fromId).value;
    if(message == ""){return};
    displayMessageOrigin(fromId ,message);
    document.getElementById('textarea' + fromId).value="";
    // encript message
    let hashedMessage = hashcode(message);

    let senderKey = null;

    if (fromId == 1){ 
        senderKey = privateKeyBob; //A
        receiverkey = askPrivateKey(fromId); //BG
    }
    else if(fromId == 2) {
        senderKey = privateKeyAlice; //B
        receiverkey = askPrivateKey(fromId); //AG
    }
    if(receiverkey == null || senderKey == null ){console.log("error while ecrypting, unknown ID");return;}

    let sharedAESKey = generateAESKey(senderKey, receiverkey); //generateAESKey(A or B, AG or BG);

    let encriptedMessage = encryptWithAes( message,sharedAESKey);

    //send encypted message
    chatboxReceiveMessage(toId, encriptedMessage , hashedMessage );
}

function UploadMessage(fromId, toId){
    //display message 
    let filename = document.getElementById("fileUpload" + fromId).value;
    if(filename == ""){return};
    displayImageOrigin(fromId);
    // encript message
    let hashedMessage = hashcode(filename);

    if (fromId == 1){ 
        senderKey = privateKeyBob; //A
        receiverkey = askPrivateKey(fromId); //BG
    }
    else if(fromId == 2) {
        senderKey = privateKeyAlice; //B
        receiverkey = askPrivateKey(fromId); //AG
    }
    if(receiverkey == null || senderKey == null ){console.log("error while ecrypting, unknown ID");return;}

    let sharedAESKey = generateAESKey(senderKey, receiverkey); //generateAESKey(A or B, AG or BG);

    let encriptedFilename = encryptWithAes( filename,sharedAESKey);

    //send message
    chatboxReceiveImage(toId,encriptedFilename, hashedMessage );
    imagecounter++;
    document.getElementById("fileUpload" + fromId).value = "";
    cachedImage = "";
}
}

{//recieve
function chatboxReceiveMessage(id ,encryptedmessage, hashedMessage) {
    //decrypt message
    if (id == 1){ 
        senderKey = askPrivateKey(2); //AG
        receiverkey = privateKeyBob ; //B
    }
    else if(id == 2) {
        senderKey = askPrivateKey(1); //BG
        receiverkey = privateKeyAlice; //A
    }
    if(receiverkey == null || senderKey == null ){console.log("error while ecrypting, unknown ID");return;}

    let sharedAESKey = generateAESKey(receiverkey,senderKey); //generateAESKey(A or B, AG or BG);

    let message = decryptWithAes(encryptedmessage, sharedAESKey).toString();
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

function chatboxReceiveImage(id ,encyrptedFilename , hashedMessage) {
    //decrypt message

    if (id == 1){ 
        senderKey = askPrivateKey(2); //AG
        receiverkey = privateKeyBob ; //B
    }
    else if(id == 2) {
        senderKey = askPrivateKey(1); //BG
        receiverkey = privateKeyAlice; //A
    }
    if(receiverkey == null || senderKey == null ){console.log("error while ecrypting, unknown ID");return;}

    let sharedAESKey = generateAESKey(receiverkey,senderKey); //generateAESKey(A or B, AG or BG);

    let filename = decryptWithAes(encyrptedFilename, sharedAESKey).toString();

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
}

{//displays 
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
}

{//helpers
var loadFile = function(event) {
    cachedImage = URL.createObjectURL(event.target.files[0]);
    };

function hashcode(s){
    return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
    }

}

{//DHKE
function n(pk ,G , mod=7){
    return Math.pow(G,pk) % mod;
}

function askPrivateKey(fromId){
    let privK ="";
    if (fromId == 1){ 
        privK = privateKeyBob;
    }
    else if(fromId == 2) {
        privK = privateKeyAlice;
    }
    else{
        console.log("error while generating key");
         return null;

    }
    return n(privK, decidedKey);
}


}

{//AES
function generateAESKey(senderKey,receiverkey){
    return n(senderKey,receiverkey);
}

function encryptWithAes(message, key){
    var encrypted = CryptoJS.AES.encrypt(message, "a"+ key);
    return encrypted;
}

function decryptWithAes(message, key){
    var decrypted = CryptoJS.AES.decrypt(message, "a" + key);
    return decrypted.toString(CryptoJS.enc.Utf8);
}

}