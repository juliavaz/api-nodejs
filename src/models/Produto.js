import mongoose from 'mongoose'; 

const Produto = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    marca: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    }
}, {
    // defindo hora de criação/atualização 
    timestamps: true,
});

export default mongoose.model('produto', Produto);
