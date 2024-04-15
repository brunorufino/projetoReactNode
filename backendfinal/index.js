import express from 'express';
import cors from 'cors';
import rotaCandidato from './Rotas/rotaCandidato.js';
import rotaVaga from './Rotas/rotaVaga.js';
import rotaCandidatoVaga from './Rotas/rotaCandidato_vaga.js'




const host='localhost';
//const express = require('express')
const app = express()
const PORT = 4000


app.get('/', (req, res) => {
    res.send("Servidor Node.js está funcionando!");
})


app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/candidato', rotaCandidato);
app.use('/vaga', rotaVaga);
app.use('/candidato_vaga', rotaCandidatoVaga);

app.listen(PORT, ()=> {
    console.log(`Servidor rodando na porta ${PORT}`);

})