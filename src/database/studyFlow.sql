CREATE DATABASE StudyFlow;
USE StudyFlow;

CREATE TABLE usuario (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL
);

CREATE TABLE tarefa (
    idTarefa INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    disciplina VARCHAR(100),
    data DATE,
    status VARCHAR(20),
	CHECK (status IN ('pendente', 'andamento', 'concluido')),
    fkUsuario INT,
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario)
);

INSERT INTO usuario (nome, email, senha)
VALUES 
('Julia Barros', 'julia@email.com', '123456'),
('Carlos Silva', 'carlos@email.com', 'abc123');

INSERT INTO tarefa (nome, materia, tempo_estimado, data, status, fkUsuario)
VALUES
('Estudar SQL', 'Banco de Dados', 60, '2026-04-12', 'pendente', 1),
('Fazer CRUD do projeto', 'Programação Web', 120, '2026-04-13', 'andamento', 1),
('Revisar CSS', 'Front-end', 45, '2026-04-14', 'concluido', 2),
('Modelagem DER', 'Banco de Dados', 90, '2026-04-15', 'pendente', 2);

SELECT * FROM usuario;
SELECT * FROM tarefa;