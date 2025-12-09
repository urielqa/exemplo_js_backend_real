# API JavaScript Backend

Uma API REST moderna e profissional construída com **Node.js**, **Express** e **Prisma ORM**, implementando autenticação JWT, gerenciamento de clientes e testes unitários com cobertura de ~70%.

## ✨ Destaques

- ✅ **20 testes unitários** passando com Jest
- ✅ **Autenticação JWT** segura
- ✅ **Arquitetura modular** escalável
- ✅ **Senhas hasheadas** com bcryptjs
- ✅ **Validações** de entrada
- ✅ **Tratamento de erros** profissional
- ✅ **Documentação completa**

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript moderno
- **Express.js** - Framework web robusto
- **Prisma ORM** - Gerenciador de banco de dados type-safe
- **SQLite** - Banco de dados leve e portável
- **JWT** - Autenticação segura com tokens
- **bcryptjs** - Hash de senhas com salt rounds
- **Jest** - Framework de testes unitários
- **CORS** - Controle de acesso entre origens
- **dotenv** - Gerenciamento de variáveis de ambiente

## 📋 Pré-requisitos

- Node.js >= 16.x
- npm ou yarn
- Postman (opcional, para testar API)

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/urielqa/exemplo_js_backend_real.git
cd exemplo_js_backend_real
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Execute as migrações do banco de dados:
```bash
npm run prisma:migrate
```

## 🚀 Como Usar

### Modo Desenvolvimento (com hot reload)
```bash
npm run dev
```
A API estará disponível em: `http://localhost:3000`

### Modo Produção
```bash
npm start
```

### Testes Unitários
```bash
# Rodar todos os testes
npm test

# Modo watch (reinicia ao salvar)
npm run test:watch

# Gerar relatório de cobertura
npm run test:coverage
```

### Gerenciar Banco de Dados
```bash
# Acessar Prisma Studio (interface gráfica)
npm run prisma:studio
```

## 📚 Endpoints da API

### Health Check
```http
GET /health
```
**Resposta:**
```json
{
  "status": "ok"
}
```

### Login (Autenticação)
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "joao@example.com",
  "senha": "senha123"
}
```

**Resposta (201):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "cliente": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@example.com",
    "criadoEm": "2024-12-08T10:30:00.000Z"
  }
}
```

### Criar Cliente
```http
POST /api/clientes
Content-Type: application/json

{
  "nome": "João Silva",
  "email": "joao@example.com",
  "senha": "senha123"
}
```

**Resposta (201):**
```json
{
  "id": 1,
  "nome": "João Silva",
  "email": "joao@example.com",
  "criadoEm": "2024-12-08T10:30:00.000Z",
  "atualizadoEm": "2024-12-08T10:30:00.000Z"
}
```

### Listar Clientes
```http
GET /api/clientes
```

**Resposta (200):**
```json
[
  {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@example.com",
    "senhaHash": "...",
    "criadoEm": "2024-12-08T10:30:00.000Z",
    "atualizadoEm": "2024-12-08T10:30:00.000Z"
  }
]
```

## 🧪 Testando com Postman

### Importar Collection (Recomendado)

1. Abra o Postman
2. Clique em **"Import"**
3. Selecione **"Paste Raw Text"** ou **"File"**
4. Use as requisições abaixo

### Exemplos de Teste

**1. Health Check**
```
GET http://localhost:3000/health
```

**2. Criar um Cliente**
```
POST http://localhost:3000/api/clientes
Content-Type: application/json

{
  "nome": "Teste User",
  "email": "teste@example.com",
  "senha": "senha123"
}
```

**3. Fazer Login**
```
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "teste@example.com",
  "senha": "senha123"
}
```

**4. Listar Clientes**
```
GET http://localhost:3000/api/clientes
```

### ✅ Resultado dos Testes
```
✅ Health Check - Responde com status 200
✅ Criar Cliente - Retorna 201 com dados do cliente
✅ Login - Retorna JWT token e dados do cliente
✅ Listar Clientes - Retorna array de clientes
✅ Validações - Email duplicado retorna 409
✅ Erro Handler - Erros retornam status apropriado
```

## 📁 Estrutura do Projeto

```
src/
├── app.js                      # Configuração Express
├── server.js                   # Entry point
├── config/
│   └── prisma.js              # Instância Prisma
├── middlewares/
│   └── errorHandler.js        # Tratamento de erros
└── modules/
    ├── auth/
    │   ├── auth.controller.js  # Lógica de requisições
    │   ├── auth.routes.js      # Rotas de autenticação
    │   ├── auth.service.js     # Lógica de negócio
    │   └── __tests__/          # Testes unitários
    └── client/
        ├── client.controller.js
        ├── client.routes.js
        ├── client.service.js
        └── __tests__/          # Testes unitários

prisma/
├── schema.prisma               # Definição do modelo de dados
└── migrations/                 # Histórico de mudanças BD
```

## 🧪 Cobertura de Testes

```
Test Suites: 3 passed ✅
Tests:      20 passed ✅
Coverage:   ~70% de cobertura

Módulos com 100% de cobertura:
  ✅ auth.service.js
  ✅ client.service.js
  ✅ client.controller.js
```

### Testes Inclusos

**Auth Service:**
- ✅ Login com email inválido
- ✅ Login com senha incorreta
- ✅ Login com sucesso
- ✅ Geração de JWT correto

**Client Service:**
- ✅ Criar cliente com sucesso
- ✅ Validação de email duplicado
- ✅ Hash de senha com bcrypt
- ✅ Listar clientes
- ✅ Buscar cliente por email

**Client Controller:**
- ✅ Criar cliente via HTTP
- ✅ Validar campos obrigatórios
- ✅ Listar clientes
- ✅ Tratamento de erros

## 🔐 Segurança

- 🔒 Senhas hasheadas com **bcryptjs** (10 salt rounds)
- 🔐 Tokens **JWT** com expiração de 1 hora
- ✔️ Validação de **email único**
- 🛡️ **CORS** habilitado
- 🚫 **Tratamento de erros** seguro (sem exposição de dados sensíveis)
- 🔑 Variáveis sensíveis em **`.env`** (não versionadas)

## 🛠️ Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto (baseado em `.env.example`):

```env
# Banco de dados
DATABASE_URL="file:./prisma/dev.db"

# Segurança
JWT_SECRET="sua-chave-secreta-super-segura-aqui"

# Servidor
PORT=3000
```

⚠️ **IMPORTANTE:** Nunca comite `.env` com dados reais!

## 📝 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor em modo desenvolvimento |
| `npm start` | Inicia servidor em produção |
| `npm test` | Executa testes uma vez |
| `npm run test:watch` | Executa testes em modo watch |
| `npm run test:coverage` | Gera relatório de cobertura |
| `npm run prisma:migrate` | Executa migrações do banco |
| `npm run prisma:studio` | Abre Prisma Studio |

## 📚 Documentação Adicional

- **[TESTING.md](./TESTING.md)** - Guia completo de testes com Jest
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Como contribuir ao projeto

## 🎓 O Que Você Aprenderá

Este projeto demonstra:

- ✅ Arquitetura modular em Node.js
- ✅ Padrão MVC (Models, Views, Controllers)
- ✅ Autenticação com JWT
- ✅ Testes unitários com Jest e Mocks
- ✅ ORM com Prisma
- ✅ Validações de entrada
- ✅ Tratamento profissional de erros
- ✅ Boas práticas de Git

## 🚀 Deploy

Para fazer deploy da API:

- **Render** - Integração automática com GitHub
- **Railway** - Deploy rápido e simples
- **Heroku** - Plataforma popular
- **AWS/Azure/GCP** - Soluções enterprise

## 📄 Licença

ISC

## 👨‍💻 Autor

**Uriel Sampaio**

---

**API rodando em:** `http://localhost:3000` 🚀

**GitHub:** https://github.com/urielqa/exemplo_js_backend_real
