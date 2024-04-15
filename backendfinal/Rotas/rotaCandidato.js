import { Router } from "express";
import CandidatoCtrl from "../Controle/cadidatoCtrl.js";

const rotaCandidato = new Router();
const candCtrl = new CandidatoCtrl();

rotaCandidato
  .get('/', candCtrl.consultar)
  .get('/:termo', candCtrl.consultar)
  .post('/', candCtrl.gravar)
  .patch('/', candCtrl.atualizar)
  .put('/', candCtrl.atualizar)
  .delete('/', candCtrl.excluir);

export default rotaCandidato;
