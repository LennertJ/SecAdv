
function displayMessageOrigin(id, message) {
    let messagefield = document.createElement("Div");
    messagefield.className += "container";
    let messageParagraph = document.createElement("P");
    messageParagraph.innerHTML = message;
    messagefield.appendChild(messageParagraph);
    document.getElementById("chatbox" + id).appendChild(messagefield);
}

function displayMessageReceiver(idOfReceiver, message) {
    let messagefield = document.createElement("Div");
    messagefield.className += "container darker";
    let messageParagraph = document.createElement("P");
    messageParagraph.innerHTML = message;
    messagefield.appendChild(messageParagraph);
    document.getElementById("chatbox" + idOfReceiver).appendChild(messagefield);
}

//chatbox1

function ChatBox1Message(){
    //show message in left message box
    let message = document.getElementById('textarea1').value;
    document.getElementById('textarea1').value="";
    displayMessageOrigin(1, message);


    // encript message


    //send encypted message

    chatbox2ReceiveMessage(message);
}

function chatbox1ReceiveMessage(message) {
    //decrypt message

    //display message
    displayMessageReceiver(1, message)
}

//message box 2

function ChatBox2Message(){
    //display message
    let message = document.getElementById('textarea2').value;
    displayMessageOrigin(2,message);

    document.getElementById('textarea2').value="";
    // encript message


    //send encypted message
    chatbox1ReceiveMessage(message);
}

function chatbox2ReceiveMessage(message) {
    //decrypt message

    //display decrypted message
    displayMessageReceiver(2, message);
}
