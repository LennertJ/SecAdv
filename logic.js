
document.getElementById('textarea2');

function ChatBox1Message(){
    //show message in left message box
    let message = document.getElementById('textarea1').value;

    let messagefield = document.createElement("Div");
    messagefield.className += "container";
    let messageParagraph = document.createElement("P");
    messageParagraph.innerHTML = message;
    messagefield.appendChild(messageParagraph);
    document.getElementById("chatbox1").appendChild(messagefield);
    document.getElementById('textarea1').value="";

    // encript message


    //send encypted message

    chatbox2ReceiveMessage(message);
}

function chatbox1ReceiveMessage(message) {
    //decrypt message

    //display message
    let messagefield = document.createElement("Div");
    messagefield.className += "container darker";
    let messageParagraph = document.createElement("P");
    messageParagraph.innerHTML = message;
    messagefield.appendChild(messageParagraph);
    document.getElementById("chatbox1").appendChild(messagefield);
}





//message box 2

function ChatBox2Message(){
    let message = document.getElementById('textarea2').value;

    let messagefield = document.createElement("Div");
    messagefield.className += "container";
    let messageParagraph = document.createElement("P");
    messageParagraph.innerHTML = message;
    messagefield.appendChild(messageParagraph);
    document.getElementById("chatbox2").appendChild(messagefield);
    document.getElementById('textarea2').value="";
    // encript message


    //send encypted message
    chatbox1ReceiveMessage(message);
}

function chatbox2ReceiveMessage(message) {
    //decrypt message

    //display message
    let messagefield = document.createElement("Div");
    messagefield.className += "container darker";
    let messageParagraph = document.createElement("P");
    messageParagraph.innerHTML = message;
    messagefield.appendChild(messageParagraph);
    document.getElementById("chatbox2").appendChild(messagefield);
}
