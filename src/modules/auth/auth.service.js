import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findClienteByEmail } from "../client/client.service.js";
const JWT_SECRET = process.env.JWT_SECRET;
export async function login(email, senha) {
const cliente = await findClienteByEmail(email);
if (!cliente) throw new Error("Credenciais inválidas");
const senhaOk = await bcrypt.compare(senha, cliente.senhaHash);
if (!senhaOk) throw new Error("Credenciais inválidas");
const token = jwt.sign(
{ sub: cliente.id, email: cliente.email },
JWT_SECRET,
{ expiresIn: "1h" }
);
const { senhaHash, ...clienteSemSenha } = cliente;
return { token, cliente: clienteSemSenha };
}