# Node Plus Server

Um framework Node.js moderno que combina Express.js com React para criar aplicações web full-stack com renderização server-side e client-side.

## 🚀 Características

- **Decorators para Rotas**: Sistema de decorators TypeScript para definir rotas de forma declarativa
- **Base Controller**: Classe base para controllers com funcionalidades SEO e redirecionamento
- **Template Renderer**: Sistema de renderização de templates React
- **Router Inteligente**: Sistema de roteamento com suporte a recursos RESTful
- **Middleware de Erro**: Tratamento de erros integrado
- **TypeScript First**: Desenvolvido com TypeScript desde o início

## 📦 Instalação

```bash
npm install nodeplus-core
# ou
yarn add nodeplus-core
```

## 🛠️ Uso Básico

### 1. Configurando o Servidor

```typescript
import express from 'express';
import { registerControllerRoutes } from 'nodeplus-core/node-plus-server';
import { HomeController } from './controllers/HomeController';

const app = express();

// Registrar rotas do controller
app.use(registerControllerRoutes(HomeController));

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
```

### 2. Criando Controllers

```typescript
import { BaseAppController } from 'nodeplus-core/node-plus-server';
import { Controller, Get, Post } from 'nodeplus-core/node-plus-server';
import { Request, Response } from 'express';

@Controller('/users')
export class UserController extends BaseAppController {
  constructor(req: Request, res: Response) {
    super(req, res);
  }

  @Get('/')
  async index() {
    const users = await User.findAll();
    return this.render('users/index', { users });
  }

  @Get('/:id')
  async show() {
    const { id } = this.extractArgs('show');
    const user = await User.findByPk(id);
    return this.render('users/show', { user });
  }

  @Post('/')
  async create() {
    const userData = this.extractArgs('create');
    const user = await User.create(userData);
    return this.redirect(`/users/${user.id}`);
  }
}
```

### 3. Decorators Disponíveis

#### Decorators de Rota
- `@Get(path?)` - Define uma rota GET
- `@Post(path?)` - Define uma rota POST
- `@Put(path?)` - Define uma rota PUT
- `@Patch(path?)` - Define uma rota PATCH
- `@Delete(path?)` - Define uma rota DELETE

#### Decorator de Controller
- `@Controller(basePath?)` - Define o caminho base do controller

### 4. BaseAppController

O `BaseAppController` fornece funcionalidades comuns para todos os controllers:

```typescript
export class BaseAppController {
  protected req: Request;
  protected res: Response;
  protected seoProperties: SEOProperties = {};

  // Métodos disponíveis:
  protected setSEO(properties: SEOProperties) // Define propriedades SEO
  protected redirect(path: string) // Redireciona para uma URL
  protected extractArgs(methodName: string) // Extrai argumentos do request
}
```

### 5. Sistema de Recursos RESTful

```typescript
import { resources } from 'nodeplus-core/node-plus-server';

const userController = {
  index: (req, res) => { /* listar usuários */ },
  show: (req, res) => { /* mostrar usuário */ },
  create: (req, res) => { /* criar usuário */ },
  update: (req, res) => { /* atualizar usuário */ },
  destroy: (req, res) => { /* deletar usuário */ }
};

app.use(resources('users', userController));
```

### 6. Middleware de Erro

```typescript
import { errorMiddleware } from 'nodeplus-core/node-plus-server';

app.use(errorMiddleware);
```

## 📁 Estrutura do Módulo

```
node-plus-server/
├── controller/
│   ├── BaseAppController.tsx    # Controller base com funcionalidades comuns
│   ├── ControllerHandler.tsx    # Handler para processar controllers
│   └── TemplateRenderer.tsx     # Sistema de renderização de templates
├── decorators/
│   └── RouteDecorators.tsx     # Decorators para definição de rotas
├── requests/
│   └── Decorators.tsx          # Decorators para extração de dados
├── router/
│   └── Router.tsx              # Sistema de roteamento
├── utils/
│   └── controllerNaming.ts     # Utilitários para nomenclatura
├── config/
│   └── Path.ts                 # Configurações de caminhos
└── default-pages/
    └── NotFound.tsx            # Página 404 padrão
```

## 🔧 Configuração

### TypeScript

Certifique-se de habilitar os decorators no seu `tsconfig.json`:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

### Dependências Necessárias

```json
{
  "dependencies": {
    "express": "^5.1.0",
    "reflect-metadata": "^0.2.2",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  }
}
```

## 🎯 Exemplos de Uso

### Exemplo Completo

```typescript
import express from 'express';
import { Controller, Get, Post } from 'nodeplus-core/node-plus-server';
import { BaseAppController } from 'nodeplus-core/node-plus-server';
import { registerControllerRoutes } from 'nodeplus-core/node-plus-server';

@Controller('/api')
export class ApiController extends BaseAppController {
  @Get('/users')
  async getUsers() {
    return { users: [] };
  }

  @Post('/users')
  async createUser() {
    const userData = this.extractArgs('createUser');
    return { message: 'User created' };
  }
}

const app = express();
app.use(registerControllerRoutes(ApiController));
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes. 