import { criarCliente, listarClientes } from '../client.controller.js';
import * as clientService from '../client.service.js';

jest.mock('../client.service.js');

describe('Client Controller', () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    mockReq = {
      body: {}
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    mockNext = jest.fn();
    jest.clearAllMocks();
  });

  describe('criarCliente', () => {
    it('deve criar cliente com sucesso', async () => {
      mockReq.body = {
        nome: 'João Silva',
        email: 'joao@example.com',
        senha: 'senha123'
      };

      const mockCliente = {
        id: 1,
        nome: 'João Silva',
        email: 'joao@example.com'
      };

      clientService.createCliente.mockResolvedValue(mockCliente);

      await criarCliente(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(mockCliente);
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('deve retornar erro 400 se campos obrigatórios faltam', async () => {
      mockReq.body = {
        nome: 'João Silva'
        // faltam email e senha
      };

      await criarCliente(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Campos obrigatórios'
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('deve chamar next com erro se ocorrer exceção', async () => {
      mockReq.body = {
        nome: 'João Silva',
        email: 'joao@example.com',
        senha: 'senha123'
      };

      const mockError = new Error('Erro no banco de dados');
      clientService.createCliente.mockRejectedValue(mockError);

      await criarCliente(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalledWith(mockError);
      expect(mockRes.json).not.toHaveBeenCalled();
    });

    it('deve validar presença de nome', async () => {
      mockReq.body = {
        email: 'joao@example.com',
        senha: 'senha123'
        // falta nome
      };

      await criarCliente(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(400);
    });

    it('deve validar presença de email', async () => {
      mockReq.body = {
        nome: 'João Silva',
        senha: 'senha123'
        // falta email
      };

      await criarCliente(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(400);
    });

    it('deve validar presença de senha', async () => {
      mockReq.body = {
        nome: 'João Silva',
        email: 'joao@example.com'
        // falta senha
      };

      await criarCliente(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(400);
    });
  });

  describe('listarClientes', () => {
    it('deve listar todos os clientes com sucesso', async () => {
      const mockClientes = [
        {
          id: 1,
          nome: 'João Silva',
          email: 'joao@example.com',
          senhaHash: 'hash1',
          criadoEm: new Date(),
          atualizadoEm: new Date()
        },
        {
          id: 2,
          nome: 'Maria Santos',
          email: 'maria@example.com',
          senhaHash: 'hash2',
          criadoEm: new Date(),
          atualizadoEm: new Date()
        }
      ];

      clientService.listClientes.mockResolvedValue(mockClientes);

      await listarClientes(mockReq, mockRes, mockNext);

      expect(clientService.listClientes).toHaveBeenCalled();
      expect(mockRes.json).toHaveBeenCalledWith(mockClientes);
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('deve retornar lista vazia', async () => {
      clientService.listClientes.mockResolvedValue([]);

      await listarClientes(mockReq, mockRes, mockNext);

      expect(mockRes.json).toHaveBeenCalledWith([]);
    });

    it('deve chamar next com erro se ocorrer exceção', async () => {
      const mockError = new Error('Erro ao listar clientes');
      clientService.listClientes.mockRejectedValue(mockError);

      await listarClientes(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalledWith(mockError);
      expect(mockRes.json).not.toHaveBeenCalled();
    });
  });
});
