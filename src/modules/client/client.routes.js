import { Router } from "express";
import {
criarCliente,
listarClientes,
} from "./client.controller.js";
export const clientRouter = Router();
clientRouter.post("/", criarCliente);
clientRouter.get("/", listarClientes);