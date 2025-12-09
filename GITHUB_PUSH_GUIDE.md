# 🚀 Guia: Subir Projeto no GitHub

## ✅ Pré-requisitos Verificados

- ✅ Git instalado (v2.50.1)
- ✅ Projeto pronto para GitHub
- ✅ Arquivos desnecessários removidos (.env, coverage)
- ✅ .gitignore configurado

## 📋 Passo a Passo

### 1️⃣ Configurar Git (Se for a primeira vez)

Execute os comandos abaixo **uma única vez** no seu terminal:

```powershell
git config --global user.name "Seu Nome"
git config --global user.email "seu.email@example.com"
```

**Exemplo:**
```powershell
git config --global user.name "João Silva"
git config --global user.email "joao@example.com"
```

### 2️⃣ Inicializar Repositório Local

```powershell
cd c:\desenvolvimento\exemplo_js_backend_real
git init
git add .
git commit -m "initial commit: api backend com nodejs, express e prisma"
```

### 3️⃣ Criar Repositório no GitHub

1. Acesse [github.com](https://github.com)
2. Clique em **"New"** (novo repositório)
3. Preencha os dados:
   - **Repository name:** `exemplo_js_backend_real`
   - **Description:** `API REST com Node.js, Express e Prisma ORM`
   - **Public** (para que seja visível)
   - **Deixe desmarcado** "Add a README file" (já temos)
   - Clique em **"Create repository"**

### 4️⃣ Conectar Repositório Local ao GitHub

Copie a URL do seu novo repositório (será algo como):
```
https://github.com/SEU_USUARIO/exemplo_js_backend_real.git
```

No terminal, execute:

```powershell
git remote add origin https://github.com/SEU_USUARIO/exemplo_js_backend_real.git
git branch -M main
git push -u origin main
```

⚠️ **IMPORTANTE:** Substitua `SEU_USUARIO` pelo seu username do GitHub!

### 5️⃣ Autenticar no GitHub (se solicitado)

Se o Git pedir autenticação:

#### Opção A: Token de Acesso Pessoal (Recomendado)

1. Acesse: https://github.com/settings/tokens
2. Clique em **"Generate new token"** → **"Generate new token (classic)"**
3. Defina:
   - **Note:** `Git CLI`
   - **Expiration:** 90 days (ou o que preferir)
   - **Scopes:** Marque `repo` (acesso completo a repositórios)
4. Clique em **"Generate token"**
5. **Copie o token** (aparecerá apenas uma vez!)
6. No terminal, quando pedir senha, cole o token

#### Opção B: SSH (Avançado)

Alternativamente, configure SSH:
- [Guia GitHub: Gerar SSH Key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

## 📝 Comandos Rápidos (para o futuro)

Depois que subir, para fazer novos commits:

```powershell
# Verificar status
git status

# Adicionar arquivos
git add .

# Fazer commit
git commit -m "descrição da mudança"

# Fazer push (enviar para GitHub)
git push origin main
```

## 🔍 Verificar se Funcionou

Depois de fazer `git push`, acesse:
```
https://github.com/SEU_USUARIO/exemplo_js_backend_real
```

Você deverá ver:
- ✅ README.md
- ✅ Todos os arquivos do projeto
- ✅ Pasta src/ com o código
- ✅ Pasta prisma/ com as migrações

## 💡 Dicas Importantes

1. **Nunca commite `.env`** - Já está no `.gitignore` ✅
2. **Padrão de commit** - Use mensagens claras e descritivas
3. **Branches** - Para features, crie: `git checkout -b feature/minha-feature`
4. **Pull Requests** - Excelente para colaboração e code review

## 🆘 Troubleshooting

### "fatal: remote origin already exists"
```powershell
git remote remove origin
git remote add origin https://github.com/SEU_USUARIO/exemplo_js_backend_real.git
```

### "Permission denied (publickey)"
Configure SSH ou use HTTPS com Token.

### "fatal: Not a git repository"
Certifique-se que está na pasta correta:
```powershell
cd c:\desenvolvimento\exemplo_js_backend_real
git status
```

## 📚 Links Úteis

- [GitHub Docs - Getting started](https://docs.github.com/en/get-started)
- [Git Cheat Sheet](https://github.github.com/training-kit/downloads/github-git-cheat-sheet.pdf)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

**Precisa de ajuda? Execute os comandos do Passo 2️⃣ a 5️⃣ em ordem!** 🚀
