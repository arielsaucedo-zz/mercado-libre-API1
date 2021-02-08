window.onload = function(){
    let addToCartForm = document.getElementById("addToCartForm");
    let quantity = document.getElementById("quantity");
    let productId = document.getElementById("productId");

    addToCartForm.addEventListener("submit", function() {
        axios.post("http://localhost:3000/api/items", {productId: productId.value, quantity: quantity.value, userId: 102 })
        .then(function(resultado){
            console.log(resultado)
        })
        
    })

    
    
    
    

        



}