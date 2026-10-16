# 📚 Papyro - API de Gerenciamento de Livros

O **Papyro** é uma aplicação Node.js desenvolvida para gerenciar um catálogo de livros. A API permite realizar operações de CRUD (Criar, Ler, Atualizar e Deletar) conectando-se a um banco de dados MySQL.

---

## 🚀 Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript no servidor.
- **Express**: Framework web para criação das rotas e servidor HTTP.
- **MySQL2**: Driver de conexão com o banco de dados MySQL.
- **dotenv**: Gerenciamento de variáveis de ambiente.

---

## 📁 Estrutura do Projeto

```text
09_papyro/
├── controller/
│   └── bookController.js    # Regras de negócio e controle das requisições de livros
├── routes/
│   └── bookRoutes.js        # Definição das rotas da API
├── cria o db papyro.sql     # Script SQL para criação do banco de dados e tabelas
├── database.js              # Configuração e conexão com o banco de dados MySQL
├── app.js                   # Ponto de entrada (Server Express)
├── .env                     # Variáveis de ambiente (Configurações locais)
└── package.json             # Dependências e scripts do projeto

```

---

## 🛠️ Configuração e Instalação

### Pró-requisitos

* **Node.js** instalado (versão 18 ou superior recomendada).
* **MySQL** instalado e em execução.

### Passo a Passo

1. **Clonar o repositório:**
```bash
git clone <https://github.com/desenvolvedorback/papyro-db.git>
cd 09_papyro

```


2. **Instalar as dependências:**
```bash
npm install

```


3. **Configurar o Banco de Dados:**
* Execute o script SQL contido no arquivo `cria o db papyro.sql` no seu SGBD MySQL para criar o banco de dados e as tabelas necessárias.


4. **Configurar as Variáveis de Ambiente:**
* Crie um arquivo `.env` na raiz do projeto (com base no `.env` de exemplo, se disponível) e preencha com as credenciais do seu banco de dados:
```env
PORT=3000
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=papyro

```




5. **Executar a aplicação:**
```bash
npm start
# ou para modo de desenvolvimento (caso utilize nodemon):
npm run dev

```



---

## 📌 Rotas da API (Endpoints)

| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/books` | Lista todos os livros |
| `GET` | `/books/:id` | Busca um livro pelo ID |
| `POST` | `/books` | Cadastra um novo livro |
| `PUT` | `/books/:id` | Atualiza um livro existente |
| `DELETE` | `/books/:id` | Remove um livro do catálogo |

---

## 📄 Licença

Este projeto está sob a licença ISC. Sinta-se à vontade para contribuir!

```

---

### Dicas adicionais:
Se você utiliza algum comando específico no seu `package.json` para rodar o projeto (como `node app.js` ou `nodemon app.js`), você pode ajustar a seção de **Executar a aplicação** de acordo!

