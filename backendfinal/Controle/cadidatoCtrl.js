import Candidato from "../Modelo/candidato.js";
import Vagas from "../Modelo/vaga.js";

export default class CandidatoCtrl {
  async gravar(req, res) {
    res.type("application/json");
    if (req.method === "POST" && req.is("application/json")) {
      const dados = req.body;
      const { cpf, nome, idade, email, telefone, cidade, estado } = dados;
      const listaVagas = dados.vagas;

    

      if (cpf && nome && idade && email && telefone && cidade && estado && listaVagas) {


        const vagasRegistradas = [];

        for (const candidatura of listaVagas) {
          
            const objVagas = new Vagas(candidatura.codigoVaga,
              candidatura.cargo,
              candidatura.tipoVaga,
              candidatura.empresa,
              candidatura.localizacao,
              candidatura.salario,
              candidatura.dataPublicacao);
              vagasRegistradas.push(objVagas);
        }



        const candidato = new Candidato(cpf,nome,idade,email,telefone,cidade,estado,vagasRegistradas);
        try {
          await candidato.gravar();
          res.status(200).json({
            status: true,
            mensagem: "Candidato cadastrado com sucesso!",
          });
        } catch (erro) {
          res.status(500).json({
            status: false,
            mensagem: "Erro ao cadastrar candidato: " + erro.message,
          });
        }
      } else {
        res.status(400).json({
          status: false,
          mensagem: "Por favor, preencha todos os campos do candidato!",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        mensagem:
          "Por favor, utilize o método POST para cadastrar um candidato!",
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
      const { cpf, nome, idade, email, telefone, cidade, estado } = dados;

      if (cpf && nome && idade && email && telefone && cidade && estado) {
        const candidato = new Candidato(
          cpf,
          nome,
          idade,
          email,
          telefone,
          cidade,
          estado
        );
        try {
          await candidato.atualizar();
          res.status(200).json({
            status: true,
            mensagem: "Candidato atualizado com sucesso!",
          });
        } catch (erro) {
          res.status(500).json({
            status: false,
            mensagem: "Erro ao atualizar o candidato: " + erro.message,
          });
        }
      } else {
        res.status(400).json({
          status: false,
          mensagem: "Por favor, informe todos os dados do candidato!",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        mensagem:
          "Por favor, utilize os métodos PUT ou PATCH para atualizar um candidato!",
      });
    }
  }

  async excluir(req, res) {
    res.type("application/json");
    if (req.method === "DELETE" && req.is("application/json")) {
      const dados = req.body;
      const { cpf } = dados;

      if (cpf) {
        const candidato = new Candidato(cpf);
        try {
          await candidato.excluir();
          res.status(200).json({
            status: true,
            mensagem: "Candidato excluído com sucesso!",
          });
        } catch (erro) {
          res.status(500).json({
            status: false,
            mensagem: "Erro ao excluir o candidato: " + erro.message,
          });
        }
      } else {
        res.status(400).json({
          status: false,
          mensagem: "Por favor, informe o CPF do candidato!",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        mensagem:
          "Por favor, utilize o método DELETE para excluir um candidato!",
      });
    }
  }

  async consultar(req, res) {
    res.type("application/json");
    const termo = req.params.termo || "";
    if (req.method === "GET") {
      const candidato = new Candidato();
      try {
        const listaCandidatos = await candidato.consultar(termo);
        res.json({
          status: true,
          listaCandidatos,
        });
      } catch (erro) {
        res.json({
          status: false,
          mensagem: "Não foi possível obter os candidatos: " + erro.message,
        });
      }
    } else {
      res.status(400).json({
        status: false,
        mensagem: "Por favor, utilize o método GET para consultar candidatos!",
      });
    }
  }
}
