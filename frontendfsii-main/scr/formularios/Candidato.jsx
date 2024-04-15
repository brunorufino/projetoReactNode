import React, { useEffect, useState } from "react";
import { Form, Button, FormControl, InputGroup, Col, Row } from "react-bootstrap";
import { urlBackend } from "../assets/funcoes";
import "./config.css";

export default function FormFuncionario(props) {
  const [editvaga, setEditvaga] = useState([]);
  const [listaVagas, setListaVaga] = useState([]);
  const [canditado, setCanditado] = useState({
    cpf:"",
    nome: "",
    dataNascimento: "",
    email: "",
    telefone: "",
    cidade: "",
    estado : "",
    listaVagas: [],
  });
  const [cpfPorVaga, setCpfPorVaga] = useState({});

  useEffect(() => {
    const getVagas = async () => {
      try {     
        const retornoVagas = await fetch(urlBackend + "/vaga", {
          method: "GET",
        });

        if (retornoVagas.ok) {       
          const listaVagas = await retornoVagas.json();
          setListaVaga(listaVagas.listaVagas);
          const nomesVagas = listaVagas.listaVagas.map((vagas) => vagas.cargo);
          setEditvaga(nomesVagas);
        } else {
          console.error("Erro ao buscar vagas:", retornoVagas.statusText);
        }
      } catch (error) {
        console.error("Erro inesperado:", error);
      }
    };

    getVagas();
  }, []);


  const handleVagaChange = (index, e) => {
    const vagaSelecionada = listaVagas.find(
      (vaga) => vaga.cargo === e.target.value
    );

    // Verificar se o CPF já foi selecionado para essa vaga
    if (cpfPorVaga[vagaSelecionada.codigoVaga] === canditado.cpf) {
      alert("CPF já cadastrado para esta vaga");
      return;
    }

    const updatedItens = [...canditado.listaVagas];
    updatedItens[index].vaga = vagaSelecionada;
    setCanditado({ ...canditado, listaVagas: updatedItens });

    // Atualizar o estado com o CPF selecionado para esta vaga
    setCpfPorVaga({
      ...cpfPorVaga,
      [vagaSelecionada.codigoVaga]: canditado.cpf,
    });
  };


  const handleCpfChange = (e) => {
    setCanditado({ ...canditado, cpf: e.target.value });
  };


  const handleNomeChange = (e) => {
    setCanditado({ ...canditado, nome: e.target.value });
  };


  const handleDataNascimentoChange = (e) => {
    setCanditado({ ...canditado, dataNascimento: e.target.value });
  };

  
  const handleEmailChange = (e) => {
    setCanditado({ ...canditado, email: e.target.value });
  };

  const handleTelefoneChange = (e) => {
    setCanditado({ ...canditado, telefone: e.target.value });
  };

  const handleCidadeChange = (e) => {
    setCanditado({ ...canditado, cidade: e.target.value });
  };

  const handleEstadoChange = (e) => {
    setCanditado({ ...canditado, estado: e.target.value });
  };

  const handleAddItem = () => {
    const novaVaga = { vaga: "" }; // Item a ser adicionado

    // Verifica se a nova vaga já existe na lista
    const vagaExiste = canditado.listaVagas.some(item => item.vaga === novaVaga.vaga);

    // Se a vaga não existe na lista, adiciona
    if (!vagaExiste) {
      setCanditado({
        ...canditado,
        listaVagas: [...canditado.listaVagas, novaVaga],
      });
    }
  };

  const handleRemoveItem = (index) => {
    const removedVaga = canditado.listaVagas[index].vaga;
    const updatedItens = [...canditado.listaVagas];
    updatedItens.splice(index, 1);
    setCanditado({ ...canditado, listaVagas: updatedItens });

    // Remover o CPF associado a esta vaga
    delete cpfPorVaga[removedVaga.codigoVaga];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const vagasSimplificadas = canditado.listaVagas.map(vaga => vaga.vaga);
     
    const requestBody = {
      cpf: canditado.cpf,
      nome: canditado.nome,
      idade: canditado.dataNascimento,
      email: canditado.email,
      telefone: canditado.telefone,
      cidade: canditado.cidade,
      estado : canditado.estado,
      vagas: vagasSimplificadas
    };
    
    try {
      const response = await fetch(`${urlBackend}/candidato`,{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(requestBody)
      });

      if(response.ok){
        alert("Candidatura cadastrada com sucesso!!");
        window.location.reload();
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  return (
    <Form onSubmit={handleSubmit} style={{ background: 'white', padding: '20px', borderRadius: '10px' }}>
      <br />
      <Row style={{ marginBottom: '20px' }}>
        <Col md={6}>
          <Form.Group>
            <Form.Label className="labels">NOME</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o nome do candidato"
              required
              value={canditado.nome}
              id="nome"
              onChange={handleNomeChange}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, informe o nome da candidato!
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label className="labels">CPF</Form.Label>
            <FormControl
              type="text"
              placeholder="Digite o CPF"
              onChange={handleCpfChange}
              value={canditado.cpf}
            />
            
          </Form.Group>
        </Col>
      </Row>
  
      <Row style={{ marginBottom: '20px' }}>
        <Col md={6}>
          <Form.Group>
            <Form.Label className="labels">DATA NASCIMENTO</Form.Label>
            <Form.Control
              type="date"
              placeholder=""
              required
              value={canditado.dataNascimento}
              id="nome"
              onChange={handleDataNascimentoChange}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, informe o nome da pessoa!
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label className="labels">E-MAIL</Form.Label>
            <FormControl
              type="text"
              placeholder="Digite o e-mail"
              onChange={handleEmailChange}
              value={canditado.email}
            />
          </Form.Group>
        </Col>
      </Row>
  
      <Row style={{ marginBottom: '20px' }}>
        <Col md={6}>
          <Form.Group>
            <Form.Label className="labels">TELEFONE</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o telefone (11)11111-1111"
              required
              value={canditado.telefone}
              id="nome"
              onChange={handleTelefoneChange}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, informe o nome da pessoa!
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label className="labels">CIDADE</Form.Label>
            <FormControl
              type="text"
              placeholder="Digite a cidade"
              onChange={handleCidadeChange}
              value={canditado.cidade}
            />
          </Form.Group>
        </Col>
      </Row>
  
      <Row style={{ marginBottom: '20px' }}>
        <Col md={6}>
          <Form.Group>
            <Form.Label className="labels">ESTADO</Form.Label>
            <FormControl
              as="select"
              onChange={(e) => handleEstadoChange(e)}
            >
              <option value="" disabled selected>
                Selecione um Estado
              </option>    
              <option value="AC">Acre</option>
              <option value="AL">Alagoas</option>
              <option value="AP">Amapá</option>
              <option value="AM">Amazonas</option>
              <option value="BA">Bahia</option>
              <option value="CE">Ceará</option>
              <option value="DF">Distrito Federal</option>
              <option value="ES">Espírito Santo</option>
              <option value="GO">Goiás</option>
              <option value="MA">Maranhão</option>
              <option value="MT">Mato Grosso</option>
              <option value="MS">Mato Grosso do Sul</option>
              <option value="MG">Minas Gerais</option>
              <option value="PA">Pará</option>
              <option value="PB">Paraíba</option>
              <option value="PR">Paraná</option>
              <option value="PE">Pernambuco</option>
              <option value="PI">Piauí</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="RN">Rio Grande do Norte</option>
              <option value="RS">Rio Grande do Sul</option>
              <option value="RO">Rondônia</option>
              <option value="RR">Roraima</option>
              <option value="SC">Santa Catarina</option>
              <option value="SP">São Paulo</option>
              <option value="SE">Sergipe</option>
              <option value="TO">Tocantins</option>
            </FormControl>
          </Form.Group>
        </Col>
      </Row>
  
      <Form.Group>
        <Form.Label className=" labels" >DISPONÍVEIS:</Form.Label>
        {canditado.listaVagas.map((item, index) => (
          <div key={index} className="">
            <InputGroup className="mb-3">
              <FormControl
                as="select"
                onChange={(e) => handleVagaChange(index, e)}
                value={item.vaga ? item.vaga.cargo : ""}
              >
                
                <option value="" disabled>
                  Adicionar vagas
                </option>
                {editvaga.map((vaga, index) => (
                  <option key={index} value={vaga}>
                    {vaga}
                  </option>
                ))}
              </FormControl>
                
              <Button variant="danger" onClick={() => handleRemoveItem(index)}>
                Remover
              </Button>
            </InputGroup>
            
          </div>
          
        ))}
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button variant="secondary" onClick={handleAddItem} className="ml-5">
          Adicionar vagas
        </Button>
      </Form.Group>
      
      <Button
        variant="danger"
        type="button"
        onClick={() => {
          props.exibirTabela(true);
        }}
      >
        Cancelar
      </Button>
      &nbsp;&nbsp;&nbsp;
      <Button variant="primary" type="submit" onSubmit={handleSubmit}>
        Submeter
      </Button>
      <div> 
        <br/> 
      </div>
    </Form>
  );
}
