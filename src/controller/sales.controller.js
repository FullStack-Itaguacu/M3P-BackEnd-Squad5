//const { checkBody } = require('../services/checkBody')

class SalesController{
    async createSales(request, response) {
        try {          
            return response.status(200).send({'msg':'--- createSales ---', 'endpoint': request.url });
        } catch (error) {
            return response.status(400).send({
                msg: "Erro enviado do banco de dados",
                error: error.message
            })
            }
    }

    //Servirá  para listar compras de usuário ou vendas de administrador
    //E servirá para calcular os dados do dashboard
    async listSalesById(request, response){
        try {
            return response.status(201).send({'msg':'--- listBuyersById ---', 'endpoint': request.url})
        } catch (error) {
            return response.status(400).send({
                msg: "Erro enviado do banco de dados",
                error: error.message
            })
        }        
    }

}

module.exports = new SalesController()