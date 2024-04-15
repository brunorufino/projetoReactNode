import { Router } from "express";
import CandidatoVagaCtrl from "../Controle/cadidato_vagaCtrl.js";

const rotaCandidatoVaga = new Router();
const cvCrtl = new CandidatoVagaCtrl();

rotaCandidatoVaga
  .get("/", cvCrtl.consultar)
  .get("/:termo", cvCrtl.consultar)
  .post("/", cvCrtl.gravar)
  .patch("/", cvCrtl.atualizar)
  .put("/", cvCrtl.atualizar)
  .delete("/", cvCrtl.excluir);

export default rotaCandidatoVaga;
