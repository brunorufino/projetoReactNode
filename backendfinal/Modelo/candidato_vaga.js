import CandidatoVagaDAO from "../Persistencia/candidato_vagaDAO.js";

export default class CandidatoVaga {
  #dataHoraInscricao;
  #cpf;
  #codigoVaga;

  constructor(dataHoraInscricao, cpf, codigoVaga) {
    this.#dataHoraInscricao = dataHoraInscricao;
    this.#cpf = cpf;
    this.#codigoVaga = codigoVaga;
  }

  get dataHoraInscricao() {
    return this.#dataHoraInscricao;
  }

  set dataHoraInscricao(novaDataHoraInscricao) {
    this.#dataHoraInscricao = novaDataHoraInscricao;
  }

  get cpf() {
    return this.#cpf;
  }

  set cpf(novoCpf) {
    this.#cpf = novoCpf;
  }

  get codigoVaga() {
    return this.#codigoVaga;
  }

  set codigoVaga(novoCodigoVaga) {
    this.#codigoVaga = novoCodigoVaga;
  }

  toJSON() {
    return {
      dataHoraInscricao: this.#dataHoraInscricao,
      cpf: this.#cpf,
      codigoVaga: this.#codigoVaga,
    };
  }

  async gravar() {
    const candidatoVagaDAO = new CandidatoVagaDAO();
    await candidatoVagaDAO.gravar(this);
  }

  async excluir() {
    const candidatoVagaDAO = new CandidatoVagaDAO();
    await candidatoVagaDAO.excluir(this);
  }

  async atualizar() {
    const candidatoVagaDAO = new CandidatoVagaDAO();
    await candidatoVagaDAO.atualizar(this);
  }

  async consultar(parametro) {
    const candidatoVagaDAO = new CandidatoVagaDAO();
    return await candidatoVagaDAO.consultar(parametro);
  }
}
