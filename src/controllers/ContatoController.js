import * as Yup from 'yup';
import Contato from '../models/Contato.js';

class ContatoController {
    async list(req, res){
        await Contato.find({}).then((contatos) => {
            return res.json({
                error: false,
                contatos: contatos
            });
        }).catch((error) => {
            return res.status(400).json({
                error: true,
                code: 103,
                message: "error: Não foi possível executar a solicitação"
            })
        })
    };

    async listOne(req, res){
        await Contato.findOne({ _id: req.params.id}).select().then((contato) => {
                return res.json({
                    error: false,
                    contato: contato
                });               
            }).catch((error) => {
            return res.status(400).json({
                error: true,
                code: 104,
                message: "error: Não foi possível executar a solicitação"
            })
        })
    };

    async create (req, res) {
        const schema = Yup.object().shape({
            nome: Yup.string().required(),
            email: Yup.string().email().required(),
            senha: Yup.string().required().min(6)
        });

        if( !(await schema.isValid(req.body))){
            return res.status(401).json({
                error: true,
                code: 100,
                message: "error: Este email já está cadastrado"
            })
        };

        const contato = await Contato.create(req.body, (err) => {
            if(err) return res.status(400).json({
                error: true,
                code: 100,
                message: "error: Contato não foi cadastrado com sucesso"
            })

            res.status(200).json({
                error: false,
                message: "Contato cadastrado com sucesso",
                contato: contato
            })           
        });        
    };

    async update(req, res) {
        const contato = req.body;
        Contato.updateOne({_id: req.params.id}, contato).then(() => {
            return res.json({
                error: false,
                message: "Contato editado com sucesso!"
            });
        }).catch((error) => {
            return res.status(400).json({
                error: true,
                code: 107,
                message: "Erro: Contato não foi editado com sucesso!"
            })
        });
    };

    async deleteOne (req, res) {
        const ContatoExiste = await Contato.findOne({ _id: req.params.id}, (error) => {
            if (error) return res.status(400).json({
                error: true,
                code: 105,
                message: "Erro: Contato não encontrado"
            });
        })
        
        const contato = await Contato.deleteOne({ _id: req.params.id }, (error) => {
            if (error) return res.status(400).json({
                error: true,
                code: 106,
                message: "Erro: Contato não foi deletado com sucesso"
            });
        });

        return res.status(200).json({
            error: false,
            message: "Contato deletado com sucesso",
        });
    }
};

export default new ContatoController();
