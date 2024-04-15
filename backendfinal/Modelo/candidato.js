import CandidatoDAO from "../Persistencia/candidatoDAO.js";

export default class Candidato {
  #cpf;
  #nome;
  #idade;
  #email;
  #telefone;
  #cidade;
  #estado;
  #vagas;

  constructor( cpf = "",nome = "",idade = 0,email = "",telefone = "",cidade = "",estado = "", vagas ) {
    this.#cpf = cpf;
    this.#nome = nome;
    this.#idade = idade;
    this.#email = email;
    this.#telefone = telefone;
    this.#cidade = cidade;
    this.#estado = estado;
    this.#vagas = vagas;
  }

  get cpf() {
    return this.#cpf;
  }

  set cpf(novoCpf) {
    this.#cpf = novoCpf;
  }

  get nome() {
    return this.#nome;
  }

  set nome(novoNome) {
    this.#nome = novoNome;
  }

  get idade() {
    return this.#idade;
  }

  set idade(novaIdade) {
    this.#idade = novaIdade;
  }

  get email() {
    return this.#email;
  }

  set email(novoEmail) {
    this.#email = novoEmail;
  }

  get telefone() {
    return this.#telefone;
  }

  set telefone(novoTelefone) {
    this.#telefone = novoTelefone;
  }

  get cidade() {
    return this.#cidade;
  }

  set cidade(novaCidade) {
    this.#cidade = novaCidade;
  }

  get estado() {
    return this.#estado;
  }

  set estado(novoEstado) {
    this.#estado = novoEstado;
  }

  set vagas(novasVagas){
    this.#vagas = novasVagas;
  }
  get vagas(){
    return this.#vagas;
  }
  toJSON() {
    return {
      cpf: this.#cpf,
      nome: this.#nome,
      idade: this.#idade,
      email: this.#email,
      telefone: this.#telefone,
      cidade: this.#cidade,
      estado: this.#estado,
      vagas: this.#vagas
    };
  }

  async gravar() {
    const candidatoDAO = new CandidatoDAO();
    await candidatoDAO.gravar(this);
  }

  async excluir() {
    const candidatoDAO = new CandidatoDAO();
    await candidatoDAO.excluir(this);
  }

  async atualizar() {
    const candidatoDAO = new CandidatoDAO();
    await candidatoDAO.atualizar(this);
  }

  async consultar(parametro) {
    const candidatoDAO = new CandidatoDAO();
    return await candidatoDAO.consultar(parametro);
  }
}
