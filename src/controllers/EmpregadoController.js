import * as Yup from 'yup';
import Empregado from "../models/Empregado.js";

class EmpregadoController {
    async list(req, res) {
        Empregado.find({}).then((empregados) => {
            res.json({
                error: false,
                empregados: empregados
            });
        }).catch((err => {
            console.log(err);
            return res.status(400).json({
                error: true,
                message: "Erro ao listar os empregados!"
            })
        }));
    }
    
    async listOne(req, res) {
        Empregado.findOne({ _id: req.params.id }).select().then((empregado) => {
            return res.json({
                error: false,
                empregado: empregado
            });
        }).catch((err) => {
            console.log(err)
            return res.status(400).json({
                error: true,
                message: "Erro ao listar o empregado!"
            })
        })
    }
    //POST /empregados para criar um novo empregado
    /*
    {
        "nome": "",
        "cargo": "",
        "setor": "",
        "salario": 0
    }
    */
    async create(req, res) {
        const schema = Yup.object().shape({
            nome: Yup.string().required(),
            cargo: Yup.string().required(),
            setor: Yup.string().required(),
            salario: Yup.string()
        });
        
        if( !(await schema.isValid(req.body))){
            return res.status(401).json({
                error: true,
                code: 100,
                message: "error: Este empregado já está cadastrado"
            })
        };

        const empregado = await Empregado.create(req.body, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 100,
                message: "error: Empregado não foi cadastrado com sucesso"
            })

            res.status(200).json({
                error: false,
                message: "Empregado cadastrado com sucesso",
                empregado: empregado
            })           
        }); 
    }
    
    async update(req, res) {
        const schema = Yup.object().shape({
            nome: Yup.string().required().notOneOf(['']),
            cargo: Yup.string().required().notOneOf(['']),
            setor: Yup.string().required().notOneOf(['']),
            salario: Yup.string()
        });
        Empregado.updateOne({ _id: req.params.id }, req.body).then(() => {
            return res.json({
                error: false,
                message: "Empregado foi editado com sucesso!"
            })
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({
                error: true,
                message: "Erro: empregado não foi editado com sucesso!"
            })
        })
    }
    
    async deleteOne(req, res) {
        const EmpregadoExiste = await Empregado.findOne({ _id: req.params.id}, (error) => {
            if (error) return res.status(400).json({
                error: true,
                code: 105,
                message: "Erro: Empregado não encontrado"
            });
        })
        
        const empregado = await Empregado.deleteOne({ _id: req.params.id }, (error) => {
            if (error) return res.status(400).json({
                error: true,
                code: 106,
                message: "Erro: não foi possível deletar o empregado!"
            });
        });

        return res.status(200).json({
            error: false,
            message: "Empregado deletado com sucesso",
        });
    }

}

export default new EmpregadoController();