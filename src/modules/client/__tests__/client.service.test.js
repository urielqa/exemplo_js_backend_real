import { createCliente, listClientes, findClienteByEmail } from '../client.service.js';
import bcrypt from 'bcryptjs';

jest.mock('bcryptjs');
jest.mock('../../../config/prisma.js', () => ({
  prisma: {
    cliente: {
      findUnique: jest.fn(),
      create: jest.fn(),
      findMany: jest.fn()
    }
  }
}));

import { prisma } from '../../../config/prisma.js';

describe('Client Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createCliente', () => {
    it('deve criar um novo cliente com sucesso', async () => {
      const clienteData = {
        nome: 'João Silva',
        email: 'joao@example.com',
        senha: 'senha123'
      };

      const mockClienteCriado = {
        id: 1,
        nome: 'João Silva',
        email: 'joao@example.com',
        senhaHash: 'hash_bcrypt',
        criadoEm: new Date(),
        atualizadoEm: new Date()
      };

      bcrypt.hash.mockResolvedValue('hash_bcrypt');
      prisma.cliente.findUnique.mockResolvedValue(null);
      prisma.cliente.create.mockResolvedValue(mockClienteCriado);

      const result = await createCliente(clienteData);

      expect(prisma.cliente.findUnique).toHaveBeenCalledWith({
        where: { email: 'joao@example.com' }
      });
      expect(bcrypt.hash).toHaveBeenCalledWith('senha123', 10);
      expect(prisma.cliente.create).toHaveBeenCalledWith({
        data: {
          nome: 'João Silva',
          email: 'joao@example.com',
          senhaHash: 'hash_bcrypt'
        }
      });
      expect(result).not.toHaveProperty('senhaHash');
      expect(result).toHaveProperty('nome');
      expect(result).toHaveProperty('email');
    });

    it('deve lançar erro se email já existe', async () => {
      const clienteData = {
        nome: 'João Silva',
        email: 'joao@example.com',
        senha: 'senha123'
      };

      const clienteExistente = {
        id: 1,
        nome: 'Outro Cliente',
        email: 'joao@example.com',
        senhaHash: 'hash',
        criadoEm: new Date(),
        atualizadoEm: new Date()
      };

      prisma.cliente.findUnique.mockResolvedValue(clienteExistente);

      await expect(createCliente(clienteData))
        .rejects
        .toThrow('Email já cadastrado');
    });

    it('deve usar bcrypt com 10 rounds de salt', async () => {
      const clienteData = {
        nome: 'João Silva',
        email: 'joao@example.com',
        senha: 'senha123'
      };

      prisma.cliente.findUnique.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue('hash');
      prisma.cliente.create.mockResolvedValue({
        id: 1,
        nome: 'João Silva',
        email: 'joao@example.com',
        senhaHash: 'hash',
        criadoEm: new Date(),
        atualizadoEm: new Date()
      });

      await createCliente(clienteData);

      expect(bcrypt.hash).toHaveBeenCalledWith('senha123', 10);
    });
  });

  describe('listClientes', () => {
    it('deve retornar lista de clientes', async () => {
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

      prisma.cliente.findMany.mockResolvedValue(mockClientes);

      const result = await listClientes();

      expect(prisma.cliente.findMany).toHaveBeenCalledWith({
        orderBy: { id: 'asc' }
      });
      expect(result).toHaveLength(2);
      expect(result[0].nome).toBe('João Silva');
    });

    it('deve retornar lista vazia se não há clientes', async () => {
      prisma.cliente.findMany.mockResolvedValue([]);

      const result = await listClientes();

      expect(result).toEqual([]);
    });
  });

  describe('findClienteByEmail', () => {
    it('deve encontrar cliente por email', async () => {
      const mockCliente = {
        id: 1,
        nome: 'João Silva',
        email: 'joao@example.com',
        senhaHash: 'hash',
        criadoEm: new Date(),
        atualizadoEm: new Date()
      };

      prisma.cliente.findUnique.mockResolvedValue(mockCliente);

      const result = await findClienteByEmail('joao@example.com');

      expect(prisma.cliente.findUnique).toHaveBeenCalledWith({
        where: { email: 'joao@example.com' }
      });
      expect(result).toEqual(mockCliente);
    });

    it('deve retornar null se cliente não existe', async () => {
      prisma.cliente.findUnique.mockResolvedValue(null);

      const result = await findClienteByEmail('inexistente@example.com');

      expect(result).toBeNull();
    });
  });
});
