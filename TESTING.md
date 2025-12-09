# Guia de Testes com Jest

Este projeto usa **Jest** para testes unitários. Jest é um framework de teste poderoso e fácil de usar.

## 📦 Instalação

Jest já está instalado como dependência de desenvolvimento:

```bash
npm install
```

## 🚀 Rodando Testes

### Executar todos os testes
```bash
npm test
```

### Modo watch (reinicia ao salvar arquivo)
```bash
npm run test:watch
```

### Gerar relatório de cobertura
```bash
npm run test:coverage
```

## 📁 Estrutura de Testes

Os testes devem estar em uma pasta `__tests__` dentro de cada módulo:

```
src/modules/
├── auth/
│   ├── auth.service.js
│   ├── auth.controller.js
│   └── __tests__/
│       └── auth.service.test.js
└── client/
    ├── client.service.js
    ├── client.controller.js
    └── __tests__/
        ├── client.service.test.js
        └── client.controller.test.js
```

## 📝 Escrevendo Testes

### Estrutura Básica

```javascript
import { minhaFuncao } from '../minha-funcao.js';

describe('Minha Função', () => {
  it('deve fazer algo específico', () => {
    // Arrange - preparar dados
    const input = 'teste';
    
    // Act - executar a função
    const result = minhaFuncao(input);
    
    // Assert - verificar resultado
    expect(result).toBe('esperado');
  });
});
```

### Mocking de Dependências

```javascript
import { funcaoPrincipal } from '../index.js';
import * as servicoExterno from '../servico.js';

// Mock do serviço externo
jest.mock('../servico.js');

describe('Função Principal', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Limpar mocks antes de cada teste
  });

  it('deve chamar o serviço corretamente', async () => {
    servicoExterno.buscarDados.mockResolvedValue({ id: 1 });
    
    const result = await funcaoPrincipal();
    
    expect(servicoExterno.buscarDados).toHaveBeenCalled();
  });
});
```

## 🧪 Exemplos de Assertivas

```javascript
// Igualdade
expect(value).toBe(5);              // igualdade estrita (===)
expect(obj).toEqual({ id: 1 });     // igualdade profunda

// Booleanos
expect(value).toBeTruthy();
expect(value).toBeFalsy();

// Nulos
expect(value).toBeNull();
expect(value).toBeDefined();
expect(value).not.toBeUndefined();

// Números
expect(value).toBeGreaterThan(3);
expect(value).toBeLessThan(5);
expect(value).toBeCloseTo(0.3);

// Strings
expect(str).toMatch(/pattern/);
expect(str).toContain('substring');

// Arrays
expect(array).toContain('element');
expect(array).toHaveLength(3);

// Objetos
expect(obj).toHaveProperty('propriedade');
expect(obj).not.toHaveProperty('senhaHash');

// Exceções
expect(() => funcao()).toThrow();
expect(() => funcao()).toThrow('mensagem');

// Promises
await expect(promise).rejects.toThrow();
await expect(promise).resolves.toBe(valor);
```

## 📊 Cobertura de Código

A cobertura mostra qual % do código foi testado:

```bash
npm run test:coverage
```

Resultado esperado:
- **Statements**: % de linhas executadas
- **Branches**: % de caminhos condicionais testados
- **Functions**: % de funções chamadas
- **Lines**: % de linhas com teste

Veja a cobertura em HTML:
```bash
npm run test:coverage
# Abra coverage/lcov-report/index.html no navegador
```

## 🎯 Boas Práticas

1. **Um conceito por teste**: Cada `it()` deve testar uma única coisa
2. **Nomes descritivos**: Use `it('deve fazer X quando Y')`
3. **Arrange-Act-Assert**: Organize os testes em 3 fases
4. **Não testar implementação**: Teste comportamento, não detalhes internos
5. **Mock dependências externas**: Banco de dados, APIs, etc
6. **Testes isolados**: Um teste não deve depender de outro
7. **BeforeEach**: Limpe mocks e resete estado antes de cada teste

## 📚 Testes Inclusos

### auth.service.test.js
- ✅ Login com credenciais inválidas
- ✅ Login com senha incorreta
- ✅ Login com credenciais válidas
- ✅ Validação do JWT gerado

### client.service.test.js
- ✅ Criar cliente com sucesso
- ✅ Validar email duplicado
- ✅ Hash de senha com bcrypt
- ✅ Listar clientes
- ✅ Buscar cliente por email

### client.controller.test.js
- ✅ Criar cliente via HTTP
- ✅ Validar campos obrigatórios
- ✅ Listar clientes via HTTP
- ✅ Tratamento de erros

## 🐛 Troubleshooting

### Erro: "Cannot find module"
Certifique-se que os paths nos imports estão corretos e use a extensão `.js`.

### Erro: "Timeout exceeded"
Aumentar o timeout:
```javascript
it('meu teste', async () => {
  // ...
}, 10000); // 10 segundos
```

### Mocks não funcionam
Chame `jest.clearAllMocks()` no `beforeEach()`.

## 📖 Links Úteis

- [Documentação Jest](https://jestjs.io/)
- [Jest Expect API](https://jestjs.io/docs/expect)
- [Jest Mocking](https://jestjs.io/docs/manual-mocks)

---

**Happy Testing! 🎉**
