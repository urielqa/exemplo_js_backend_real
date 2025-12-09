import { login } from "./auth.service.js";
export async function loginController(req, res, next) {
try {
const { email, senha } = req.body;
const result = await login(email, senha);
res.json(result);
} catch (err) {
err.statusCode = 401;
next(err);
}
}