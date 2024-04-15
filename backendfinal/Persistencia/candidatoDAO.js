import Candidato from "../Modelo/candidato.js";
import conectar from "./conexao.js";

export default class CandidatoDAO {
  async gravar(candidato) {
    if (candidato instanceof Candidato) {

      const conexao = await conectar();
      await conexao.beginTransaction();

      const sql =
        "INSERT INTO candidato(cpf, nome, idade, email, telefone, cidade, estado) VALUES(?,?,?,?,?,?,?)";
      const parametros = [
        candidato.cpf,
        candidato.nome,
        candidato.idade,
        candidato.email,
        candidato.telefone,
        candidato.cidade,
        candidato.estado,
      ];

      await conexao.execute(sql, parametros);
      
      for(const vagas of candidato.vagas){
        let dataAtual = new Date();
        const sql2 = "INSERT INTO candidato_vaga(dataHoraInscricao, CPF, codigoVaga) VALUES (?,?,?)" 
        let parametros2 = [dataAtual,candidato.cpf,vagas.codigoVaga];
        await conexao.execute(sql2,parametros2);
      }

      await conexao.commit();
      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async atualizar(candidato) {
    if (candidato instanceof Candidato) {
      const sql =
        "UPDATE candidato SET nome = ?, idade = ?, email = ?, telefone = ?, cidade = ?, estado = ? WHERE CPF = ?";
      const parametros = [
        candidato.nome,
        candidato.idade,
        candidato.email,
        candidato.telefone,
        candidato.cidade,
        candidato.estado,
        candidato.cpf,
      ];
      const conexao = await conectar();
      await conexao.execute(sql, parametros);
      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async excluir(candidato) {
    if (candidato instanceof Candidato) {
      const sql = "DELETE FROM candidato WHERE CPF = ?";
      const parametros = [candidato.cpf];
      const conexao = await conectar();
      await conexao.execute(sql, parametros);
      global.poolConexoes.releaseConnection(conexao);
    }
  }

  /*
  async consultar(parametroConsulta) {
    let sql = "";
    let parametros = [];
    if (!isNaN(parseInt(parametroConsulta))) {
      sql =
        "SELECT CPF, nome, idade, email, telefone, cidade, estado FROM candidato WHERE CPF = ? ORDER BY nome";
      parametros = [parametroConsulta];
    } else {
      if (!parametroConsulta) {
        parametroConsulta = "";
      }
      sql = `SELECT CPF, nome, idade, email, telefone, cidade, estado FROM candidato WHERE nome LIKE ?`;
      parametros = ["%" + parametroConsulta + "%"];
    }
    const conexao = await conectar();
    const [registros, campos] = await conexao.execute(sql, parametros);
    let listaCandidatos = [];

    for (const registro of registros) {
      const candidato = new Candidato(
        registro.CPF,
        registro.nome,
        registro.idade,
        registro.email,
        registro.telefone,
        registro.cidade,
        registro.estado
      );
      listaCandidatos.push(candidato);
    }
    global.poolConexoes.releaseConnection(conexao);
    return listaCandidatos;
  }
*/


  async consultar(termoBusca){
    const conexao = await conectar();
    let sql="";
    let parametros="";
    let listaCandidatos = [];
    if (!termoBusca) {
      sql = `SELECT * FROM candidato can	 
              INNER JOIN candidato_vaga cand_vaga
              ON can.CPF = cand_vaga.CPF
              INNER JOIN vaga v ON 
              v.codigoVaga = cand_vaga.codigoVaga
              ORDER BY can.nome`;
              termoBusca="";
    }
    else{
      if (!isNaN(parseInt(termoBusca))) {
        sql = `SELECT * FROM candidato can	 
                INNER JOIN candidato_vaga cand_vaga
                ON can.CPF = cand_vaga.CPF
                INNER JOIN vaga v ON 
                v.codigoVaga = cand_vaga.codigoVaga
                WHERE can.CPF = ?`;
                parametros = [termoBusca];

                console.log(sql);
      } else {
        
        sql = `SELECT * FROM candidato can	 
                  INNER JOIN candidato_vaga cand_vaga
                  ON can.CPF = cand_vaga.CPF
                  INNER JOIN vaga v ON 
                  v.codigoVaga = cand_vaga.codigoVaga
                  WHERE can.nome LIKE ?`;
                  parametros = ["%" + termoBusca + "%"];
      }
    }
   
    const [registros, campos] = await conexao.execute(sql,parametros);

      if(registros.length > 0){       

          for (const registro of registros) {
            const objVagas = {
                    "codigoVaga": registro.codigoVaga,
                    "cargo": registro.cargo,
                    "tipoVaga": registro.tipoVaga,
                    "empresa": registro.empresa,
                    "localizacao": registro.localizacao,
                    "salario": registro.salario,
                    "dataPublicacao": registro.dataPublicacao
          }
          const candidato = new Candidato(registro.CPF,registro.nome,registro.idade,registro.email,registro.telefone,registro.cidade,registro.estado,objVagas); 
          listaCandidatos.push(candidato);
          
          } 
        }
        global.poolConexoes.releaseConnection(conexao);
        return listaCandidatos;   
    }
  

}


