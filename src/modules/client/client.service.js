import bcrypt from "bcryptjs";
import { prisma } from "../../config/prisma.js";
const SALT_ROUNDS = 10;
export async function createCliente({ nome, email, senha }) {
const exists = await prisma.cliente.findUnique({
where: { email },
});
if (exists) {
const error = new Error("Email já cadastrado");
error.statusCode = 409;
throw error;
}
const senhaHash = await bcrypt.hash(senha, SALT_ROUNDS);
const cliente = await prisma.cliente.create({
data: { nome, email, senhaHash },
});

const { senhaHash: _, ...clienteSemSenha } = cliente;
return clienteSemSenha;
}
export function listClientes() {
return prisma.cliente.findMany({ orderBy: { id: "asc" } });
}
export function findClienteByEmail(email) {
return prisma.cliente.findUnique({ where: { email } });
}