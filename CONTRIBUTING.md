# Guia de Contribuição

Obrigado por se interessar em contribuir! Por favor, siga este guia para colaborar com o projeto.

## 📋 Antes de Começar

1. Faça um fork do repositório
2. Clone seu fork: `git clone https://github.com/seu-usuario/exemplo_js_backend_real.git`
3. Crie uma branch para sua feature: `git checkout -b feature/minha-feature`

## 🔧 Setup Local

```bash
npm install
npm run prisma:migrate
npm run dev
```

## 📝 Commits

- Use mensagens de commit claras e descritivas
- Prefira commits pequenos e focados
- Exemplo: `feat: adicionar endpoint de atualizar cliente`

## 🧪 Antes de fazer Push

- Certifique-se que o código está funcionando
- Não comita arquivos `.env`, `*.db` ou `node_modules`
- Siga o padrão de código existente

## 📮 Pull Requests

1. Atualize sua branch com a main: `git rebase main`
2. Faça push para seu fork
3. Abra um Pull Request com descrição clara das mudanças
4. Aguarde revisão

## 🐛 Reportando Bugs

Abra uma Issue com:
- Descrição clara do problema
- Passos para reproduzir
- Comportamento esperado vs. atual
- Versão do Node.js e SO

Obrigado por contribuir! 🎉
