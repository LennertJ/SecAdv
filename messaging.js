function ChatBox1Message(){
    //show message in left message box
    let message = document.getElementById('textarea1').value;
    document.getElementById('textarea1').value="";
    displayMessageOrigin(1, message);
    let hashedMessage = hashcode( message);

    // encript message


    //send encypted message
    chatboxReceiveMessage(2, message, hashedMessage );
}

function ChatBox2Message(){
    //display message
    let message = document.getElementById('textarea2').value;
    displayMessageOrigin(2,message);
    document.getElementById('textarea2').value="";
    let hashedMessage = hashcode( message);

    // encript message


    //send encypted message
    chatboxReceiveMessage(1, message, hashedMessage );
}



function displayMessageOrigin(id, message) {
    let messagefield = document.createElement("Div");
    messagefield.className += "container";
    let messageParagraph = document.createElement("P");
    messageParagraph.innerHTML = message;
    messagefield.appendChild(messageParagraph);
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