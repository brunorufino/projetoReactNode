CREATE DATABASE sistema;

USE sistema;

CREATE TABLE candidato (

    CPF VARCHAR(11) PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    idade INT NOT NULL, 
    email VARCHAR(100) NOT NULL,
    telefone VARCHAR(20),
    cidade VARCHAR(50),
    estado VARCHAR(50),
    UNIQUE (email)
);

CREATE TABLE vaga (

    codigoVaga INT AUTO_INCREMENT PRIMARY KEY,
    cargo VARCHAR(100) NOT NULL,
    tipoVaga VARCHAR(20) NOT NULL,
    empresa VARCHAR(100) NOT NULL,
    localizacao VARCHAR(100),
    salario DECIMAL(10, 2),
    dataPublicacao DATE
);


CREATE TABLE candidato_vaga (
    
    dataHoraInscricao DATETIME NOT NULL,
    CPF VARCHAR(11) NOT NULL,
    codigoVaga INT NOT NULL,
    FOREIGN KEY (CPF) REFERENCES Candidato(CPF) ON DELETE CASCADE,
    FOREIGN KEY (codigoVaga) REFERENCES Vaga(codigoVaga) ON DELETE CASCADE,
    UNIQUE (CPF, codigoVaga)
);

-- CREATE TABLE candidato_vaga (
    
--     dataIncricao TIME
--     horaInscricao DATE NOT NULL,
--     CPF VARCHAR(11) NOT NULL,
--     codigoVaga INT NOT NULL,
--     FOREIGN KEY (CPF) REFERENCES Candidato(CPF) ON DELETE CASCADE,
--     FOREIGN KEY (codigoVaga) REFERENCES Vaga(codigoVaga) ON DELETE CASCADE,
--     UNIQUE (CPF, codigoVaga)
-- );