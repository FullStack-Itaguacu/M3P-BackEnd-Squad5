//const { checkBody } = require('../services/checkBody')

class BuyersController{
    async listBuyers(request, response) {
        try {          
            return response.status(200).send({'msg':'--- listBuyers ---', 'endpoint': request.url  });
        } catch (error) {
            return response.status(400).send({
                msg: "Erro enviado do banco de dados",
                error: error.message
            })
            }
    }

    //Servirá para criar usuário vendedor(admin) ou usuário comprador(user)
    async listBuyersById(request, response){
        try {
            return response.status(201).send({'msg':'--- listBuyersById ---', 'endpoint': request.url})
        } catch (error) {
            return response.status(400).send({
                msg: "Erro enviado do banco de dados",
                error: error.message
            })
        }        
    }

    // Atualizar usuário - comprador para usuário - admin  
    async updateBuyerById(request, response) {
        try {
            return response.status(201).send({'msg':'--- ipdateUser ---', 'endpoint': request.url})
        } catch (error) {
            return response.status(400).send({
                msg: "Erro enviado do banco de dados",
                error: error.message
            })
        }
    }
}

module.exports = new BuyersController()