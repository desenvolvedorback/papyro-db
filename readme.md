# 📚 Papyro — API de Gerenciamento de Biblioteca

O **Papyro** é uma API desenvolvida com Node.js para o gerenciamento de uma biblioteca. O projeto utiliza Express para estruturar o servidor e MySQL para armazenar e gerenciar as informações.

A aplicação está organizada em quatro módulos principais:

- 📖 **Livros:** cadastro e identificação de livros.
- 📚 **Exemplares:** gerenciamento de exemplares físicos associados aos livros.
- 👥 **Leitores:** cadastro de alunos e professores.
- 🔄 **Empréstimos:** registro de empréstimos de exemplares aos leitores.

## 🚀 Tecnologias utilizadas

- **Node.js:** ambiente de execução JavaScript.
- **Express:** framework para criação do servidor e gerenciamento de rotas.
- **MySQL:** sistema de gerenciamento de banco de dados relacional.
- **MySQL2:** driver de conexão entre Node.js e MySQL.
- **dotenv:** gerenciamento de variáveis de ambiente.

## 📁 Estrutura do projeto

```text
09_papyro/
├── controller/
│   ├── bookController.js
│   ├── itemController.js
│   ├── loanController.js
│   └── readerController.js
├── routes/
│   ├── bookRoutes.js
│   ├── itemRoutes.js
│   ├── loanRoutes.js
│   └── readerRoutes.js
├── .env
├── .gitignore
├── app.js
├── cria o db papyro.sql
├── database.js
├── package-lock.json
├── package.json
└── README.md
```

### 📂 Organização dos arquivos

| Arquivo | Descrição |
|---|---|
| `app.js` | Arquivo principal da aplicação. |
| `database.js` | Configuração da conexão com o banco de dados. |
| `controller/bookController.js` | Controla o cadastro de livros. |
| `controller/itemController.js` | Controla o cadastro de exemplares. |
| `controller/loanController.js` | Controla o registro de empréstimos. |
| `controller/readerController.js` | Controla o cadastro de leitores. |
| `routes/bookRoutes.js` | Arquivo de rotas dos livros. |
| `routes/itemRoutes.js` | Arquivo de rotas dos exemplares. |
| `routes/loanRoutes.js` | Arquivo de rotas dos empréstimos. |
| `routes/readerRoutes.js` | Arquivo de rotas dos leitores. |
| `cria o db papyro.sql` | Script SQL para criação do banco de dados. |
| `.env` | Variáveis de ambiente e credenciais locais. |
| `.gitignore` | Arquivos e diretórios ignorados pelo Git. |
| `package.json` | Metadados, dependências e scripts do projeto. |

---

## 🛠️ Instalação e configuração

### 1. Pré-requisitos

Antes de iniciar, instale:

- [Node.js](https://nodejs.org/)
- [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)
- Git, caso queira clonar o repositório.

### 2. Clonar o repositório

```bash
git clone https://github.com/desenvolvedorback/papyro-db.git
cd 09_papyro
```

### 3. Instalar as dependências

Na pasta do projeto, execute:

```bash
npm install
```

### 4. Configurar o banco de dados

Abra seu gerenciador de banco de dados MySQL e execute o script:

```text
cria o db papyro.sql
```

Esse arquivo contém as instruções SQL utilizadas para criar e configurar o banco de dados.

Verifique se o nome do banco criado corresponde ao nome definido na variável `DB_NAME`.

### 5. Configurar as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000

DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=papyro
```

Substitua os valores de exemplo pelas credenciais do seu ambiente MySQL.

**Importante:** não compartilhe suas credenciais nem envie o arquivo `.env` para um repositório público.

### 6. Executar a aplicação

Caso o `package.json` possua o script `start`, execute:

```bash
npm start
```

Se houver um script `dev` configurado, execute:

```bash
npm run dev
```

Como alternativa, caso o projeto esteja configurado para iniciar diretamente pelo arquivo principal:

```bash
node app.js
```

---

## 📡 Módulos da API

A API possui quatro módulos, organizados em arquivos de rotas e controllers.

### 📖 1. Livros

Responsável pelo cadastro de livros no catálogo da biblioteca.

**Campos do cadastro:**

| Campo | Descrição |
|---|---|
| `isbn` | Código ISBN do livro. |
| `titulo` | Título da obra. |
| `autor` | Autor do livro. |
| `editora` | Editora responsável pela publicação. |
| `ano_publicacao` | Ano de publicação. |
| `edicao` | Edição do livro. |
| `genero` | Gênero literário. |

**Exemplo de requisição JSON:**

```json
{
  "isbn": "978879",
  "titulo": "Dom Quixote",
  "autor": "Miguel de Cervantes",
  "editora": "Penguin Classics",
  "ano_publicacao": 2003,
  "edicao": "1ª",
  "genero": "Ficção Clássica"
}
```

O controller verifica o preenchimento dos campos obrigatórios e consulta o banco de dados para impedir o cadastro de um ISBN já existente.

### 📚 2. Exemplares

Responsável pelo cadastro de exemplares associados aos livros cadastrados.

**Campos do cadastro:**

| Campo | Descrição |
|---|---|
| `id_livro` | Identificador do livro associado ao exemplar. |
| `codigo` | Código de identificação do exemplar. |

**Exemplo de requisição JSON:**

```json
{
  "id_livro": 1,
  "codigo": "EX-001"
}
```

Após o cadastro, o exemplar recebe inicialmente a situação `Disponivel`.

O controller também verifica a existência do livro associado e se o código do exemplar já está cadastrado.

### 👥 3. Leitores

Responsável pelo cadastro dos usuários que podem realizar empréstimos na biblioteca.

O sistema aceita dois tipos de leitores: `aluno` e `professor`.

**Campos do cadastro:**

| Campo | Descrição |
|---|---|
| `matricula` | Matrícula do leitor. |
| `cpf` | CPF do leitor. |
| `nome` | Nome completo. |
| `tipo` | Tipo de leitor: `aluno` ou `professor`. |
| `turma` | Turma do aluno, quando aplicável. |
| `telefone` | Telefone para contato. |
| `email` | Endereço de e-mail. |

**Exemplo de requisição JSON:**

```json
{
  "matricula": "2026001",
  "cpf": "00000000000",
  "nome": "João da Silva",
  "tipo": "aluno",
  "turma": "2º ano",
  "telefone": "11999999999",
  "email": "joao@example.com"
}
```

O campo `turma` pode ser omitido ou enviado vazio, pois o controller permite armazená-lo como `NULL`. Os demais campos são obrigatórios.

O sistema também verifica se o CPF já está cadastrado.

> Os dados do exemplo são fictícios e servem apenas para demonstrar o formato da requisição.

### 🔄 4. Empréstimos

Responsável pelo registro de empréstimos de exemplares para leitores cadastrados.

**Campos do cadastro:**

| Campo | Descrição |
|---|---|
| `id_leitor` | Identificador do leitor. |
| `id_exemplar` | Identificador do exemplar emprestado. |
| `data_emprestimo` | Data do empréstimo. |
| `data_prevista_devolucao` | Data prevista para devolução. |

**Exemplo de requisição JSON:**

```json
{
  "id_leitor": 1,
  "id_exemplar": 1,
  "data_emprestimo": "2026-10-30",
  "data_prevista_devolucao": "2026-11-06"
}
```

As datas devem utilizar o formato `AAAA-MM-DD`.

O controller foi desenvolvido para:

- Verificar o preenchimento dos campos obrigatórios.
- Validar o formato das datas.
- Verificar se a data prevista para devolução é posterior à data do empréstimo.
- Verificar a existência do leitor e do exemplar.
- Verificar a disponibilidade do exemplar.
- Registrar o empréstimo no banco de dados.
- Atualizar a situação do exemplar para `Emprestado`.

**Observação:** a implementação atual do controller de empréstimos contém inconsistências nas validações das datas e na consulta do exemplar. Esses pontos devem ser corrigidos para garantir o funcionamento esperado de todas as verificações.

---

## 📋 Respostas HTTP

Os controllers utilizam códigos de status HTTP para indicar o resultado das operações.

| Código | Significado | Utilização observada |
|---|---|---|
| `201 Created` | Recurso criado com sucesso. | Cadastro de livros, exemplares, leitores e empréstimos. |
| `400 Bad Request` | Requisição inválida. | Campos obrigatórios ausentes ou validações inválidas. |
| `409 Conflict` | Conflito com o estado atual dos dados. | Duplicidade de ISBN ou CPF e algumas verificações de cadastro. |
| `500 Internal Server Error` | Erro interno do servidor. | Falha durante a execução da operação no banco de dados. |

As mensagens exatas retornadas dependem do controller responsável pela operação.

---

## 🧪 Testando a API

Você pode utilizar ferramentas como Postman ou Insomnia para testar as requisições.

1. Inicie o servidor Node.js.
2. Certifique-se de que o MySQL esteja em execução.
3. Verifique se as variáveis de ambiente estão configuradas corretamente.
4. Consulte os arquivos da pasta `routes/` para identificar os caminhos e métodos HTTP disponíveis.
5. Envie as requisições com os dados em formato JSON.
6. Verifique o código de status e a resposta retornada pela API.

Os endpoints exatos não são listados nesta versão porque dependem da configuração dos arquivos de rotas e do arquivo `app.js`.

---

## 🔒 Boas práticas

- Mantenha as credenciais do banco de dados no arquivo `.env`.
- Não versione arquivos que contenham senhas ou outras informações sensíveis.
- Utilize consultas parametrizadas para interagir com o banco de dados.
- Valide os dados recebidos nas requisições.
- Trate erros de banco de dados adequadamente.
- Mantenha a separação entre rotas e controllers.
- Documente novos endpoints sempre que funcionalidades forem adicionadas.

---

## 📄 Licença

O projeto declara utilizar a licença ISC, conforme informado na documentação anterior. Consulte o `package.json` para confirmar a licença configurada e inclua um arquivo `LICENSE` no repositório caso queira distribuir formalmente o projeto sob essa licença.

By **Davi Leonardo**.