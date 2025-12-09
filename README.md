# API JavaScript Backend

Uma API REST moderna construída com **Node.js**, **Express** e **Prisma ORM**, implementando autenticação JWT e gerenciamento de clientes.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Prisma ORM** - Gerenciador de banco de dados
- **SQLite** - Banco de dados
- **JWT** - Autenticação segura
- **bcryptjs** - Hash de senhas
- **CORS** - Controle de acesso
- **dotenv** - Variáveis de ambiente

## 📋 Pré-requisitos

- Node.js >= 16.x
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/exemplo_js_backend_real.git
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

4. Inicie o banco de dados:
```bash
npm run prisma:migrate
```

## 🚀 Como Usar

### Modo Desenvolvimento (com hot reload)
```bash
npm run dev
```

### Modo Produção
```bash
npm start
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
Retorna o status da API.

### Autenticação
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "usuario@example.com",
  "senha": "senha123"
}
```

### Clientes
```http
# Criar cliente
POST /api/clientes
Content-Type: application/json

{
  "nome": "João Silva",
  "email": "joao@example.com",
  "senha": "senha123"
}

# Listar todos os clientes
GET /api/clientes
```

## 📁 Estrutura do Projeto

```
src/
├── app.js                 # Configuração da aplicação
├── server.js             # Ponto de entrada
├── config/
│   └── prisma.js        # Instância Prisma
├── middlewares/
│   └── errorHandler.js  # Middleware de erros
└── modules/
    ├── auth/
    │   ├── auth.controller.js
    │   ├── auth.routes.js
    │   └── auth.service.js
    └── client/
        ├── client.controller.js
        ├── client.routes.js
        └── client.service.js

prisma/
├── schema.prisma        # Definição do banco de dados
└── migrations/          # Histórico de migrações
```

## 🔐 Segurança

- Senhas são hasheadas com bcryptjs (10 rounds)
- Tokens JWT com expiração de 1 hora
- Validação de email único
- Middleware de tratamento de erros
- CORS habilitado

## 🛠️ Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET="seu-secret-super-seguro-aqui"
PORT=3000
```

## 📝 Licença

ISC

## 👨‍💻 Autor

Uriel Sampaio

---

**API rodando em:** `http://localhost:3000`
