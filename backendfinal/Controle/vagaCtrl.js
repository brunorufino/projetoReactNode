import Vaga from "../Modelo/vaga.js";

export default class VagaCtrl {
  async gravar(req, res) {
    res.type("application/json");
    if (req.method === "POST" && req.is("application/json")) {
      const dados = req.body;
      const { cargo, tipoVaga, empresa, localizacao, salario, dataPublicacao } =
        dados;

      if (
        cargo &&
        tipoVaga &&
        empresa &&
        localizacao &&
        salario &&
        dataPublicacao
      ) {
        const vaga = new Vaga(
          0,
          cargo,
          tipoVaga,
          empresa,
          localizacao,
          salario,
          dataPublicacao
        );
        try {
          await vaga.gravar()
          res.status(200).json({
            status: true,
            codigoGerado: vaga.codigoVaga,
            mensagem: "Vaga cadastrada com sucesso!",
          });
        } catch (erro) {
          res.status(500).json({
            status: false,
            mensagem: "Erro ao cadastrar vaga: " + erro.message,
          });
        }
      } else {
        res.status(400).json({
          status: false,
          mensagem: "Por favor, preencha todos os campos da vaga!",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        mensagem: "Por favor, utilize o método POST para cadastrar uma vaga!",
      });
    }
  }

  async atualizar(req, res) {
    res.type("application/json");
    if (
      (req.method === "PUT" || req.method === "PATCH") &&
      req.is("application/json")
    ) {
      const dados = req.body;
      const {
        codigoVaga,
        cargo,
        tipoVaga,
        empresa,
        localizacao,
        salario,
        dataPublicacao,
      } = dados;

      if (
        codigoVaga &&
        cargo &&
        tipoVaga &&
        empresa &&
        localizacao &&
        salario &&
        dataPublicacao
      ) {
        const vaga = new Vaga(
          codigoVaga,
          cargo,
          tipoVaga,
          empresa,
          localizacao,
          salario,
          dataPublicacao
        );
        try {
          await vaga.atualizar();
          res.status(200).json({
            status: true,
            mensagem: "Vaga atualizada com sucesso!",
          });
        } catch (erro) {
          res.status(500).json({
            status: false,
            mensagem: "Erro ao atualizar a vaga: " + erro.message,
          });
        }
      } else {
        res.status(400).json({
          status: false,
          mensagem: "Por favor, informe todos os dados da vaga!",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        mensagem:
          "Por favor, utilize os métodos PUT ou PATCH para atualizar uma vaga!",
      });
    }
  }

  async excluir(req, res) {
    res.type("application/json");
    if (req.method === "DELETE" && req.is("application/json")) {
      const dados = req.body;
      const { codigoVaga } = dados;

      if (codigoVaga) {
        const vaga = new Vaga(codigoVaga);
        try {
          await vaga.excluir();
          res.status(200).json({
            status: true,
            mensagem: "Vaga excluída com sucesso!",
          });
        } catch (erro) {
          res.status(500).json({
            status: false,
            mensagem: "Erro ao excluir a vaga: " + erro.message,
          });
        }
      } else {
        res.status(400).json({
          status: false,
          mensagem: "Por favor, informe o código da vaga!",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        mensagem: "Por favor, utilize o método DELETE para excluir uma vaga!",
      });
    }
  }

  async consultar(req, res) {
    res.type("application/json");
    let termo = req.params.termo || "";
    if (req.method === "GET") {
      const vaga = new Vaga();
      try {
        const listaVagas = await vaga.consultar(termo);
        res.json({
          status: true,
          listaVagas,
        });
      } catch (erro) {
        res.json({
          status: false,
          mensagem: "Não foi possível obter as vagas: " + erro.message,
        });
      }
    } else {
      res.status(400).json({
        status: false,
        mensagem: "Por favor, utilize o método GET para consultar vagas!",
      });
    }
  }
}
