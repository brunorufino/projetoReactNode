import Pagina from "../templates/Pagina";
import React from "react";
import { Card, Button } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { urlBackend } from "../assets/funcoes";

export default function TelaMenu(props){

  const handleCadastroClick = () => {
    window.location.href = "http://localhost:5173/cadastroCandidatos";
  };


const [listaVagas, setListaVaga] = useState([]);



  useEffect(() => {
    const getVagas = async () => {
      try {
     
        const retornoVagas = await fetch(urlBackend + "/vaga", {
          method: "GET",
        });

        if (retornoVagas.ok) {
         
          const listaVagas = await retornoVagas.json();
          setListaVaga(listaVagas.listaVagas);
     
        } else {
          console.error("Erro ao buscar vagas:", retornoVagas.statusText);
        }
      } catch (error) {
        console.error("Erro inesperado:", error);
      }
    };

    getVagas();
  }, []);





  return(
    <Pagina>


<div style={{ backgroundColor: 'royalblue', padding: '20px', textAlign: 'center', color: 'white', width: 'auto', margin: 'auto' }}>
        <h1>Bem-vindo ao Portal de Oportunidades!</h1>
        <p>Explore as vagas disponíveis e encontre a oportunidade perfeita para você.</p>
      </div>  
            <div style={{ margin: 'auto', padding: '20px', textAlign: 'center', color: '#333', backgroundColor: 'transparent', width: 'auto', maxWidth: 'auto' }}>
              <h2>Vagas Disponíveis:</h2>


           

    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {
        
          listaVagas?.map((vagas,index) => {   
            const cores = ['cyan','#6644E1','#FF6347','#FFFF00','#blue','#FF69B4','#9400D3','#FFD700','#089']
            const cor = cores[index % cores.length];
          return (
           
            // eslint-disable-next-line react/jsx-key
            <div style={{ width: '30%', margin: '10px', padding: '20px', backgroundColor: cor, borderRadius: '5px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
              <div style={{ backgroundColor: cor }}>
                    <h3>{vagas.cargo}</h3>
                    <p>{vagas.empresa}</p>
                    <p > <a href="http://localhost:5173/cadastroCandidatos">  Inscreva-se </a> </p>
            </div>
           </div>
 
          );
        })
        
    

      }
   </div>
         {/* Botão Cadastre-se Aqui Agora */}
       
      </div>
      <div style={{ textAlign: 'center', margin: '20px' }}>
        <button onClick={handleCadastroClick} style={{ backgroundColor: 'yellow', color: 'black', padding: '20px 60px', fontSize: '55px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Cadastre-se Aqui!</button>
      </div>
    </Pagina>
  )
}