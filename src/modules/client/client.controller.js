import { createCliente, listClientes } from "./client.service.js";
export async function criarCliente(req, res, next) {
try {
const { nome, email, senha } = req.body;
if (!nome || !email || !senha) {
return res.status(400).json({ error: "Campos obrigatórios" });
}
const cliente = await createCliente({ nome, email, senha });
res.status(201).json(cliente);
} catch (err) {
next(err);
}
}
export async function listarClientes(req, res, next) {
try {
const clientes = await listClientes();
res.json(clientes);
} catch (err) {
next(err);
}
}