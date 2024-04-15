import CandidatoVaga from "../Modelo/candidato_vaga.js";
import conectar from "./conexao.js";

export default class CandidatoVagaDAO {
  async gravar(candidatoVaga) {
    if (candidatoVaga instanceof CandidatoVaga) {
      const sql =
        "INSERT INTO candidato_vaga(dataHoraInscricao, CPF, codigoVaga) VALUES (?,?,?)";
      const parametros = [
        candidatoVaga.dataHoraInscricao,
        candidatoVaga.cpf,
        candidatoVaga.codigoVaga
      ];
      const conexao = await conectar();
      await conexao.execute(sql, parametros);
      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async atualizar(candidatoVaga) {
    if (candidatoVaga instanceof CandidatoVaga) {
      const sql =
        "UPDATE candidato_vaga SET dataHoraInscricao = ?, CPF = ?, codigoVaga = ? WHERE CPF = ? AND codigoVaga = ?";
      const parametros = [candidatoVaga.dataHoraInscricao,candidatoVaga.cpf,candidatoVaga.codigoVaga,candidatoVaga.cpf,candidatoVaga.codigoVaga];
      const conexao = await conectar();
      await conexao.execute(sql, parametros);
      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async consultar(parametro) {
    let sql = "";
    let parametros = [];

    if (typeof parametro === "string") {
      sql = `SELECT * FROM candidato_vaga WHERE CPF LIKE ? OR codigoVaga LIKE ?`;
      parametros = ["%" + parametro + "%", "%" + parametro + "%"];
    } else {
      sql = "SELECT * FROM candidato_vaga WHERE CPF = ? AND codigoVaga = ?";
      parametros = [parametro.cpf, parametro.codigoVaga];
    }

    const conexao = await conectar();
    const [registros] = await conexao.execute(sql, parametros);
    global.poolConexoes.releaseConnection(conexao);

    return registros;
  }

  async excluir(candidatoVaga) {
    if (candidatoVaga instanceof CandidatoVaga) {
      const sql =
        "DELETE FROM candidato_vaga WHERE CPF = ? AND codigoVaga = ?";
      const parametros = [candidatoVaga.cpf, candidatoVaga.codigoVaga];
      const conexao = await conectar();
      await conexao.execute(sql, parametros);
      global.poolConexoes.releaseConnection(conexao);
    }
  }
}
