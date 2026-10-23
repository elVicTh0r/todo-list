# Forma padrão: projeto Full Stack com TypeScript

**Stack:** Node.js + Express + TypeScript (API), React + TypeScript + Vite (interface), PostgreSQL (posteriormente).

> Use este guia como checklist. Exemplos de negócio usam **produtos**, para você aplicar sozinho à To-Do List.

## 0. Entenda as peças

- **Node.js:** ambiente que executa JavaScript no servidor.
- **npm:** gerenciador de pacotes e scripts.
- **Express:** biblioteca para criar servidores e rotas HTTP.
- **TypeScript:** adiciona checagem estática de tipos ao JavaScript.
- **tsc:** verifica os tipos e, no build, gera JavaScript.
- **tsx:** executa `.ts` durante o desenvolvimento; `tsx watch` reinicia quando arquivos mudam. Não substitui `tsc` para verificar tipos.
- **React:** constrói a interface.
- **Vite:** ferramenta para desenvolvimento e build do frontend.
- **PostgreSQL:** banco para persistência futura.

## 1. Estrutura que vamos manter

```text
todoList/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── data/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── server.ts
│   │   └── app.ts           # opcional, quando projeto crescer
│   ├── package.json
│   ├── package-lock.json
│   └── tsconfig.json
├── frontend/                # React + Vite, depois
├── typescript-puro/         # estudos antigos, opcional
└── README.md
```

Cada pasta com um `package.json` próprio é um projeto npm independente, então pode ter seu `node_modules` próprio. **Não é obrigatório manter `package.json` e `node_modules` na raiz.** Só remova os da raiz depois de verificar se ainda são usados.

## 2. Navegação no terminal integrado do VS Code (PowerShell)

```powershell
pwd                     # mostra pasta atual (ou Get-Location)
ls                      # lista arquivos (ou dir)
cd backend              # entra em backend
cd ..                   # volta um nível
mkdir exemplo           # cria pasta
code .                  # abre pasta atual no VS Code, se comando disponível
Ctrl+C                  # interrompe servidor em execução
```

**Regra:** rode `npm run dev` dentro da pasta cujo `package.json` contém o script desejado. Se seu servidor está em `backend/src/server.ts`, entre em `backend` antes.

## 3. Criando o backend do zero

A partir de uma pasta de projetos:

```powershell
mkdir meu-projeto
cd meu-projeto
mkdir backend
cd backend
npm init -y
npm install express
npm install -D typescript tsx @types/node @types/express
npx tsc --init
mkdir src
```

- `npm init -y`: cria `package.json`.
- `npm install express`: instala dependência usada em execução.
- `npm install -D ...`: instala ferramentas e tipos usados no desenvolvimento.
- `npx tsc --init`: cria `tsconfig.json`.
- `npx`: executa ferramenta do projeto sem instalação global.

**Nodemon?** Você pode usar `nodemon` com `tsx`, mas para projetos novos `tsx watch` já reinicia automaticamente. Não precisa dos dois.

## 4. Configurando TypeScript

No `backend/tsconfig.json`, um exemplo de configuração para módulos ES em Node atual:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "noEmitOnError": true
  },
  "include": ["src/**/*.ts"]
}
```

Em `backend/package.json`, ajuste/adapte estas propriedades, preservando as dependências criadas pelo npm:

```json
{
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "check": "tsc --noEmit",
    "build": "tsc",
    "start": "node dist/server.js"
  }
}
```

**Atenção:** `"type": "module"` deve combinar com `NodeNext` e o uso de imports ES. Para imports relativos entre arquivos `.ts` neste modelo, escreva `.js` no caminho: `import x from './outroArquivo.js'`. O `tsx` resolve isso em desenvolvimento e o JavaScript compilado fica correto.

Comandos:

```powershell
npm run dev       # servidor com reinício automático
npm run check     # confere tipos, sem gerar JS
npm run build     # compila TS para dist/
npm start         # roda o JS compilado (após build)
```

## 5. Primeiro servidor

Crie `backend/src/server.ts`:

```ts
import express from "express";

const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ mensagem: "API funcionando" });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
```

Teste em `http://localhost:3000/`.

## 6. Forma mental da API

**Postman/React → Router → Controller → Service → Dados (array/banco)**

A resposta faz o caminho inverso.

- **server.ts:** inicializa Express, middlewares e registra routers.
- **routes:** associa método/caminho HTTP à função do Controller.
- **controllers:** lê `req.params`, `req.body`, valida entrada HTTP, escolhe status e retorna `res.json()`.
- **services:** executa operações e regras do domínio, sem `req` nem `res`.
- **data:** guarda dados temporários; depois será substituído ou integrado com camada de persistência.

Exemplo com **produtos**:

`src/routes/produtoRoutes.ts`:

```ts
import { Router } from "express";
import { listarProdutos } from "../controllers/produtoController.js";

const router = Router();
router.get("/", listarProdutos);
export default router;
```

`src/controllers/produtoController.ts`:

```ts
import type { Request, Response } from "express";
import { obterProdutos } from "../services/produtoService.js";

export function listarProdutos(_req: Request, res: Response) {
  return res.json(obterProdutos());
}
```

`src/services/produtoService.ts`:

```ts
const produtos = [{ id: 1, nome: "Arroz" }];
export function obterProdutos() {
  return produtos;
}
```

No `src/server.ts` (além de `app.use(express.json())`):

```ts
import produtoRoutes from "./routes/produtoRoutes.js";
app.use("/produtos", produtoRoutes);
```

Assim, `router.get('/')` fica disponível como `GET /produtos`.

### Padrão de endpoints CRUD

| Método | Endpoint | Finalidade |
|---|---|---|
| GET | `/produtos` | listar |
| GET | `/produtos/:id` | buscar um |
| POST | `/produtos` | criar |
| PATCH | `/produtos/:id` | atualizar parte |
| DELETE | `/produtos/:id` | remover |

### Regras práticas

- `req.params.id` chega como texto; converta e valide.
- `req.body` depende de `app.use(express.json())` antes das rotas e de JSON enviado corretamente.
- `400`: dado inválido; `404`: recurso não encontrado; `201`: criado; `200`: sucesso com resposta.
- `find()` retorna item ou `undefined`; `findIndex()` retorna índice ou `-1`.
- Mantenha rotas específicas (`/pendentes`) antes de dinâmicas (`/:id`).
- Se uma função modifica dados e o Controller precisa responder com o resultado, **retorne o valor** no Service.
- Prefira importar interfaces com `import type`.

## 7. Checklist para qualquer nova funcionalidade

1. Definir **qual ação** o usuário precisa.
2. Escolher método e endereço HTTP.
3. Definir dados de entrada e resultado esperado.
4. Criar/ajustar função do **Service**.
5. Criar/ajustar função do **Controller**, com validações e códigos HTTP.
6. Registrar função no **Router**.
7. Testar cenário válido, entrada inválida e recurso inexistente no Postman.
8. Executar `npm run check` e corrigir erros de tipos.

## 8. Testando com Postman

- **GET** `/produtos`: Body não necessário.
- **POST** `/produtos`: Body → raw → JSON:

```json
{ "nome": "Feijão" }
```

- Confira URL, método, resposta e status. `Content-Type: application/json` é normalmente definido ao selecionar JSON.

## 9. Criando o frontend quando chegar a hora

A partir da raiz `meu-projeto` (não dentro do backend):

```powershell
npm create vite@latest frontend -- --template react-ts
cd frontend
npm install
npm run dev
```

O Vite mostra o endereço local, geralmente `http://localhost:5173` (pode mudar).

Organização inicial recomendada:

```text
frontend/src/
├── components/
├── services/       # funções fetch para consumir a API
├── App.tsx
└── main.tsx
```

Comece aprendendo: JSX → componentes → props → useState → eventos/formulários → fetch/useEffect → integração com a API.

**CORS:** quando o React usar uma origem diferente (ex.: `localhost:5173`) para acessar a API (`localhost:3000`), será necessário permitir essa origem no backend ou configurar um proxy do Vite. Não é problema de TypeScript: é uma regra do navegador.

## 10. Banco de dados: depois do frontend, se preferir

Enquanto a API usar array, os dados somem ao reiniciar o backend. Mais tarde, podemos substituir armazenamento em memória por PostgreSQL, mantendo rotas e boa parte dos controllers. As funções de persistência precisarão passar a lidar com operações assíncronas.

## 11. Diagnóstico rápido

| Sintoma | Conferir |
|---|---|
| `Missing script: dev` | Pasta atual e scripts no `package.json` correto |
| `Cannot find ... src/server.ts` | Execute dentro de `backend` |
| `Cannot find module` | Caminho relativo, nome do arquivo, extensão e configuração de módulos |
| `descricao inválida` no POST | Body → raw → JSON; chave `descricao`; `express.json()` |
| `GET /produtos/produtos` | Prefixo duplicado no `app.use` e no Router |
| Tipos errados | `npm run check`, imports `type`, `tsconfig.json` |
| CORS no navegador | Configurar origem permitida no Express ou proxy Vite |

## 12. O molde em uma linha

**Criar pasta → npm init → instalar Express/TypeScript/tsx → configurar tsconfig/scripts → criar server → criar Router → criar Controller → criar Service → testar API → criar React/Vite → integrar → adicionar PostgreSQL.**

> Nota: o formato das pastas e a separação em camadas são convenções úteis, não obrigações do Express. Adapte quando o projeto crescer.
