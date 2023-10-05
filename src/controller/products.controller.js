//const { checkBody } = require('../services/checkBody')

class ProductsController{
    async creaateProduct(request, response) {
        try {          
            return response.status(200).send({'msg':'--- creaateProduct ---',
                                              'body': request.body  });
        } catch (error) {
            return response.status(400).send({
                msg: "Erro enviado do banco de dados",
                error: error.message
            })
            }
    }

    //Servirá para criar usuário vendedor(admin) ou usuário comprador(user)
    async listProductsByAdmin(request, response){
        try {
            return response.status(201).send({'msg':'--- listProducts ---'})
        } catch (error) {
            return response.status(400).send({
                msg: "Erro enviado do banco de dados",
                error: error.message
            })
        }        
    }

    // Atualizar usuário - comprador para usuário - admin  
    async listProductsById(request, response) {
        try {
            return response.status(201).send({'msg':'--- listProductsById ---', 'endpoint': request.url})
        } catch (error) {
            return response.status(400).send({
                msg: "Erro enviado do banco de dados",
                error: error.message
            })
        }
    }

    async listProducts(request, response) {
        try {
            return response.status(201).send({'msg':'--- listProducts ---', 'endpoint': request.url})
        } catch (error) {
            return response.status(400).send({
                msg: "Erro enviado do banco de dados",
                error: error.message
            })
        }
    }

    async updateProductsByAdminById(request, response) {
        try {
            return response.status(201).send({'msg':'--- updateProductsById ---', 'endpoint': request.url})
        } catch (error) {
            return response.status(400).send({
                msg: "Erro enviado do banco de dados",
                error: error.message
            })
        }
    }
}

module.exports = new ProductsController()