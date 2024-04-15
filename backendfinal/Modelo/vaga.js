import VagaDAO from "../Persistencia/vagaDAO.js";

export default class Vaga {
  #codigoVaga;
  #cargo;
  #tipoVaga;
  #empresa;
  #localizacao;
  #salario;
  #dataPublicacao;

  constructor(
    codigoVaga = 0,
    cargo = "",
    tipoVaga = "",
    empresa = "",
    localizacao = "",
    salario = 0,
    dataPublicacao = ""
  ) {
    this.#codigoVaga = codigoVaga;
    this.#cargo = cargo;
    this.#tipoVaga = tipoVaga;
    this.#empresa = empresa;
    this.#localizacao = localizacao;
    this.#salario = salario;
    this.#dataPublicacao = dataPublicacao;
  }

  get codigoVaga() {
    return this.#codigoVaga;
  }

  set codigoVaga(novoCodigoVaga) {
    this.#codigoVaga = novoCodigoVaga;
  }

  get cargo() {
    return this.#cargo;
  }

  set cargo(novoCargo) {
    this.#cargo = novoCargo;
  }

  get tipoVaga() {
    return this.#tipoVaga;
  }

  set tipoVaga(novoTipoVaga) {
    this.#tipoVaga = novoTipoVaga;
  }

  get empresa() {
    return this.#empresa;
  }

  set empresa(novaEmpresa) {
    this.#empresa = novaEmpresa;
  }

  get localizacao() {
    return this.#localizacao;
  }

  set localizacao(novaLocalizacao) {
    this.#localizacao = novaLocalizacao;
  }

  get salario() {
    return this.#salario;
  }

  set salario(novoSalario) {
    this.#salario = novoSalario;
  }

  get dataPublicacao() {
    return this.#dataPublicacao;
  }

  set dataPublicacao(novaDataPublicacao) {
    this.#dataPublicacao = novaDataPublicacao;
  }

  toJSON() {
    return {
      codigoVaga: this.#codigoVaga,
      cargo: this.#cargo,
      tipoVaga: this.#tipoVaga,
      empresa: this.#empresa,
      localizacao: this.#localizacao,
      salario: this.#salario,
      dataPublicacao: this.#dataPublicacao
    };
  }

  async gravar() {
    const vagaDAO = new VagaDAO();
    await vagaDAO.gravar(this);
  }

  async excluir() {
    const vagaDAO = new VagaDAO();
    await vagaDAO.excluir(this);
  }

  async atualizar() {
    const vagaDAO = new VagaDAO();
    await vagaDAO.atualizar(this);
  }

  async consultar(parametro) {
    const vagaDAO = new VagaDAO();
    return await vagaDAO.consultar(parametro);
  }
}
