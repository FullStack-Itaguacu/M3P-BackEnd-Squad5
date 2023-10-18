//const { checkBody } = require('../services/checkBody')

const { Sale } = require('../models/sale')
const { Product } = require('../models/product')

class SalesController {
    async createSales(request, response) {
        try {
            const { productId, amountBuy, users_addresses_id, typePayment } = request.body;

            if (!productId || !amountBuy || !users_addresses_id || !typePayment) {
                return response.status(422).send({ "message": "Preencha todos os campos!" })
            }

            const product = Product.findByPk(productId)

            if (!product || amountBuy > totalStock) {
                response.status(409).send({ "message": "Quantidade de produtos inferior a quantidade de produtos da compra!" })
            }

            const total = amountBuy * unitPrice;

            const sale = await Sale.create({
                productId,
                amountBuy,
                users_addresses_id, 
                typePayment,
                total
            })

            response.status(201).send({ "message": "Registros criados com sucesso!" + sale })

        } catch (error) {
            return response.status(400).send({
                msg: "Erro enviado do banco de dados",
                error: error.message
            })
        }
    }

    //Servirá  para listar compras de usuário ou vendas de administrador
    //E servirá para calcular os dados do dashboard
    async listSalesById(request, response) {
        try {
            const { buyer_id } = request.query;

            let lista = {}

            if(buyer_id){
                lista  = buyer_id
            }

            const data = Sale.findAll({
                where: lista
            })

            response.status(200).send(data)

        } catch (error) {
            return response.status(400).send({
                msg: "Erro enviado do banco de dados",
                error: error.message
            })
        }
    }

}

module.exports = new SalesController()