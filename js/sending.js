
function ChatBoxMessage(fromId, toId){//main
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

function UploadMessage(fromId, toId){
    let filename = document.getElementById("fileUpload" + fromId).value;
    if(filename == ""){return};
    displayImageOrigin(fromId);
    let hashedMessage = hashcode(filename);
    chatboxReceiveImage(toId,filename, hashedMessage );
    imagecounter++;
    document.getElementById("fileUpload" + fromId).value = "";
    cachedImage = "";
}

