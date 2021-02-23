const { validationResult } = require("express-validator");
// ******** Sequelize ***********
const {
  Product,
  Item,
} = require("../../database/models");

module.exports = {
    addToCart(req, res) {
        const errors = validationResult(req);
    
        if (errors.isEmpty()) {
          // Busco el producto que voy a agregar como Item.
          Product.findByPk(req.body.productId, {
            include: ["user"],
          })
            .then((product) => {
              // Saco el valor del producto, teniendo en cuenta el descuento.
              let price =
                Number(product.discount) > 0
                  ? product.price - (product.price * product.discount) / 100
                  : product.price;
              // Creo el Item de compra
              return Item.create({
                salePrice: price,
                quantity: req.body.quantity,
                subTotal: price * req.body.quantity,
                state: 1,
                userId: req.body.userId,
                sellerId: product.user.id,
                productId: req.body.productId,
              });
            })
            .then((item) => {
                let respuesta = {
                    meta : {
                        status : 201,
                        message: "Product added to cart",
                    },
                    data : item
                }
                return res.json(respuesta)
                
            })
            
            .catch((e) => {
                console.log(e)
                let respuesta = {
                    meta : {
                        status : 500,
                        message: "Product NOT added to cart",
                    },
                    data: {error: e}
                }
                return res.json
            });
        } else {
           Product.findByPk(req.body.productId, {
             include: ["user"],
           })
             .then(product => {
                let respuesta = {
                    meta : {
                        status : 203,
                        url: '/api/items',
                        message: "Error : Product NOT added to cart"
                    },
                    data : {product: product, errors: errors.mapped()}
                }
                return res.json(respuesta)
             })     
        }
    },
    deleteFromCart(req, res) {
      Item.destroy({
        where: {
          id: req.body.itemId,
        },
        force: true,
      })
        .then(function(resultado) {
          let respuesta = {
            meta : {
                status : 200,
                Method : "DELETE"
            }
        }
        res.json(respuesta)  
    })
    .catch((e) => console.log(e))
}}