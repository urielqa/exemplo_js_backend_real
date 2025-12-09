import { login } from '../auth.service.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as clientService from '../../client/client.service.js';

jest.mock('../../client/client.service.js');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('Auth Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('deve retornar erro com credenciais inválidas - email não existe', async () => {
      clientService.findClienteByEmail.mockResolvedValue(null);

      await expect(login('inexistente@example.com', 'senha123'))
        .rejects
        .toThrow('Credenciais inválidas');
    });

    it('deve retornar erro com senha incorreta', async () => {
      const mockCliente = {
        id: 1,
        email: 'teste@example.com',
        senhaHash: 'hash_da_senha',
        nome: 'Teste'
      };

      clientService.findClienteByEmail.mockResolvedValue(mockCliente);
      bcrypt.compare.mockResolvedValue(false);

      await expect(login('teste@example.com', 'senha_errada'))
        .rejects
        .toThrow('Credenciais inválidas');
    });

    it('deve retornar token e cliente com credenciais válidas', async () => {
      const mockCliente = {
        id: 1,
        email: 'teste@example.com',
        senhaHash: 'hash_da_senha',
        nome: 'Teste'
      };

      const mockToken = 'jwt_token_válido';

      clientService.findClienteByEmail.mockResolvedValue(mockCliente);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue(mockToken);

      const result = await login('teste@example.com', 'senha123');

      expect(result).toHaveProperty('token');
      expect(result).toHaveProperty('cliente');
      expect(result.token).toBe(mockToken);
      expect(result.cliente.email).toBe('teste@example.com');
      expect(result.cliente).not.toHaveProperty('senhaHash');
    });

    it('deve gerar JWT com dados corretos', async () => {
      const mockCliente = {
        id: 1,
        email: 'teste@example.com',
        senhaHash: 'hash_da_senha',
        nome: 'Teste'
      };

      clientService.findClienteByEmail.mockResolvedValue(mockCliente);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('token');

      await login('teste@example.com', 'senha123');

      // Verificar que jwt.sign foi chamado com os argumentos corretos
      const calls = jwt.sign.mock.calls;
      expect(calls).toHaveLength(1);
      
      const [payload, secret, options] = calls[0];
      expect(payload).toEqual({ sub: 1, email: 'teste@example.com' });
      expect(options).toEqual({ expiresIn: '1h' });
    });
  });
});
