import mongoose from 'mongoose';

const Empregado = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  cargo:{
    type: String,
    required: true
  }, 
  setor: {
    type: String,
    required: true
  }, 
  salario: {
    type: Number,
    required: false
  }
}, {
  timestamps: true,
});

export default mongoose.model('empregado', Empregado);