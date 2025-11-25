function saveCard() {
    const card = {
        icon: document.getElementById("icon").value,
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        link: document.getElementById("link").value
    };

    console.log("New Card Added:", card); 
    alert("Card saved (frontend only).\nNext step: connect to Node.js backend!");
}