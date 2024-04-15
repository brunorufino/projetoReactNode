import Vaga from "../Modelo/vaga.js";
import conectar from "./conexao.js";

export default class VagaDAO {
  async gravar(vaga) {
    if (vaga instanceof Vaga) {
      const sql =
        `INSERT INTO vaga(cargo, tipoVaga, empresa, localizacao, salario, dataPublicacao) VALUES(?,?,?,?,?,?)`;
      const parametros = [
        vaga.cargo,
        vaga.tipoVaga,
        vaga.empresa,
        vaga.localizacao,
        vaga.salario,
        vaga.dataPublicacao,
      ];
      const conexao = await conectar();
      const retorno = await conexao.execute(sql, parametros);
      vaga.codigoVaga = retorno[0].insertId;
      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async atualizar(vaga) {
    if (vaga instanceof Vaga) {
      const sql =
        "UPDATE vaga SET cargo = ?, tipoVaga = ?, empresa = ?, localizacao = ?, salario = ?, dataPublicacao = ? WHERE codigoVaga = ?";
      const parametros = [
        vaga.cargo,
        vaga.tipoVaga,
        vaga.empresa,
        vaga.localizacao,
        vaga.salario,
        vaga.dataPublicacao,
        vaga.codigoVaga,
      ];
      const conexao = await conectar();
      await conexao.execute(sql, parametros);
      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async excluir(vaga) {
    if (vaga instanceof Vaga) {
      const sql = "DELETE FROM vaga WHERE codigoVaga = ?";
      const parametros = [vaga.codigoVaga];
      const conexao = await conectar();
      await conexao.execute(sql, parametros);
      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async consultar(parametroConsulta) {
    let sql = "";
    let parametros = [];
    if (!isNaN(parseInt(parametroConsulta))) {
      sql =
        "SELECT codigo, cargo, tipoVaga, empresa, localizacao, salario, dataPublicacao FROM vaga WHERE codigoVaga = ? ORDER BY cargo";
      parametros = [parametroConsulta];
    } else {
      if (!parametroConsulta) {
        parametroConsulta = "";
      }
      sql = `SELECT codigoVaga, cargo, tipoVaga, empresa, localizacao, salario, dataPublicacao FROM vaga WHERE cargo LIKE ?`;
      parametros = ["%" + parametroConsulta + "%"];
    }
    const conexao = await conectar();
    const [registros, campos] = await conexao.execute(sql, parametros);
    let listaVagas = [];

    for (const registro of registros) {
      const vaga = new Vaga(
        registro.codigoVaga,
        registro.cargo,
        registro.tipoVaga,
        registro.empresa,
        registro.localizacao,
        registro.salario,
        registro.dataPublicacao
      );
      listaVagas.push(vaga);
    }
    global.poolConexoes.releaseConnection(conexao);
    return listaVagas;
  }
}
