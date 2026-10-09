DROP DATABASE IF EXISTS papyro_db;
CREATE DATABASE papyro_db;
USE papyro_db;

CREATE TABLE livro (
  id INT AUTO_INCREMENT PRIMARY KEY,
  isbn VARCHAR(13) NOT NULL UNIQUE,
  titulo VARCHAR(150) NOT NULL,
  autor VARCHAR(100) NOT NULL,
  editora VARCHAR(100) NOT NULL,
  ano_publicacao INT NOT NULL,
  edicao VARCHAR(20) NOT NULL,
  genero VARCHAR(50) NOT NULL
);


CREATE TABLE leitor (
  id INT AUTO_INCREMENT PRIMARY KEY,
  matricula VARCHAR(20) NOT NULL UNIQUE,
  cpf VARCHAR(14) NOT NULL UNIQUE,
  nome VARCHAR(100) NOT NULL,
  tipo ENUM('Aluno', 'Professor') NOT NULL,
  turma VARCHAR(20),
  telefone VARCHAR(20) NOT NULL,
  email VARCHAR(100) NOT NULL
);

CREATE TABLE exemplar (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_livro INT NOT NULL,
  codigo INT NOT NULL UNIQUE,
  situacao ENUM('Disponivel', 'Emprestado', 'Extraviado') NOT NULL,

  FOREIGN KEY (id_livro) REFERENCES livro(id)
);
 
CREATE TABLE emprestimo (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_leitor INT NOT NULL,
  id_exemplar INT NOT NULL,
  data_emprestimo DATE NOT NULL,
  data_prevista_devolucao DATE NOT NULL,
  data_devolucao DATE NULL,

  FOREIGN KEY (id_leitor) REFERENCES leitor(id),
  FOREIGN KEY (id_exemplar) REFERENCES exemplar(id)

);



