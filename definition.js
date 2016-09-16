var definition;

function defineWord(){
    var worddef = new XMLHttpRequest;

    worddef.open('GET', "https://api.datamuse.com/words?ml=" + responseWord + "&max=4");

    worddef.send();

    worddef.addEventListener('readystatechange', function() {
        if (worddef.readyState != XMLHttpRequest.DONE) {
            return;
        }
        var status;
        try {
            status = worddef.status;
        } catch(e) {
            console.log(e);
            return;
        }
        if (status != 200) {
            console.log("error - status " + status);
            return;
        }
        definition = worddef.responseText.toUpperCase();
        printThesauras();
    });

}

function printThesauras(){
    definition = JSON.parse(definition);
    for (var i = 0; i < definition.length; i++){
        console.log(definition[i]["WORD"]);
    }
}
