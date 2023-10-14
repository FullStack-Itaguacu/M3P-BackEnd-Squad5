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
            const authenticatedUser = request.user;

            if (!authenticatedUser){
                return response.status(401).send({
                    msg: "Acesso não autorizado. É necessário a autenticação."
                })
            }

            if (authenticatedUser.typeUser !== "administrador"){
                return response.status(403).send({
                    msg: "Acesso não autorizado. Este endpoint é permitido para administradores."
                });
            }

            //Obter o userId da rota
            const userId = request.params.userId;
            const product = await Product.findOne({
                where:{
                    userId: userId
                }
            });

            if (!product){
                return response.status(404).send({
                    msg: "Produto não encontrado para usuário especificado."
                })
            }

            return response.status(200).send(product);
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