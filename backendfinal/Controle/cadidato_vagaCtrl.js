import CandidatoVaga from "../Modelo/candidato_vaga.js";

export default class CandidatoVagaCtrl {
  async gravar(req, res) {
    res.type("application/json");
    if (req.method === "POST" && req.is("application/json")) {
      const dados = req.body;
      const { dataHoraInscricao, cpf, codigoVaga } = dados;

      if (dataHoraInscricao && cpf && codigoVaga) {
        const candidatoVaga = new CandidatoVaga(
          dataHoraInscricao,
          cpf,
          codigoVaga
        );
        try {
          await candidatoVaga.gravar();
          res.status(200).json({
            status: true,
            mensagem: "Reserva vinculada ao veículo!",
          });
        } catch (erro) {
          res.status(500).json({
            status: false,
            mensagem: "Erro ao vincular reserva: " + erro.message,
          });
        }
      }
    }
  }

  async atualizar(req, res) {
    res.type("application/json");
    if (
      (req.method === "PUT" || req.method === "PATCH") &&
      req.is("application/json")
    ) {
      const dados = req.body;
      const { dataHoraInscricao, cpf, codigoVaga } = dados;

      if (dataHoraInscricao && cpf && codigoVaga) {
        const candidatoVaga = new CandidatoVaga(
          dataHoraInscricao,
          cpf,
          codigoVaga
        );
        try {
          await candidatoVaga.atualizar();
          res.status(200).json({
            status: true,
            mensagem: "Reserva atualizada com sucesso!",
          });
        } catch (erro) {
          res.status(500).json({
            status: false,
            mensagem: "Erro ao atualizar reserva: " + erro.message,
          });
        }
      }
    }
  }

  async consultar(req, res) {
    res.type("application/json");
    let termo = req.params.termo || "";

    if (req.method === "GET") {
      const candidatoVaga = new CandidatoVaga();
      try {
        const lista = await candidatoVaga.consultar(termo);
        res.json({
          status: true,
          lista,
        });
      } catch (erro) {
        res.json({
          status: false,
          mensagem: "Não foi possível encontrar a reserva: " + erro.message,
        });
      }
    } else {
      res.status(400).json({
        status: false,
        mensagem: "Por favor, utilize o método GET para consultar reserva!",
      });
    }
  }

  async excluir(req, res) {
    res.type("application/json");
    if (req.method === "DELETE" && req.is("application/json")) {
      const dados = req.body;
      const { dataHoraInscricao, cpf, codigoVaga } = dados;

      if (dataHoraInscricao && cpf && codigoVaga) {
        const candidatoVaga = new CandidatoVaga(
          dataHoraInscricao,
          cpf,
          codigoVaga
        );
        try {
          await candidatoVaga.excluir();
          res.status(200).json({
            status: true,
            mensagem: "Vínculo excluído com sucesso!",
          });
        } catch (erro) {
          res.status(500).json({
            status: false,
            mensagem: "Erro ao excluir reserva: " + erro.message,
          });
        }
      } else {
        res.status(400).json({
          status: false,
          mensagem: "Informe os dados da reserva!",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        mensagem: "Utilize o método DELETE para excluir um vínculo",
      });
    }
  }
}
