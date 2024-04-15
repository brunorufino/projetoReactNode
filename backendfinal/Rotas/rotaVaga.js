import { Router } from "express";
import VagaCtrl from "../Controle/vagaCtrl.js";

const rotaVaga = new Router();
const vCtrl = new VagaCtrl();

rotaVaga
  .get("/", vCtrl.consultar)
  .get("/:termo", vCtrl.consultar)
  .post("/", vCtrl.gravar)
  .patch("/", vCtrl.atualizar)
  .put("/", vCtrl.atualizar)
  .delete("/", vCtrl.excluir);

export default rotaVaga;
