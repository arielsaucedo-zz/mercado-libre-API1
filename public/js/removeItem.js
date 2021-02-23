window.onload = function(){
    let cartForm = document.getElementById("cartForm");
    let itemId = document.getElementById("itemId");

    cartForm.addEventListener("submit", function() {
        axios.post("http://localhost:3000/api/items", {itemId: itemId.value})
        .then(function(resultado){
            console.log("Esta funcionando");
            console.log(resultado)
        })
        
    })
}