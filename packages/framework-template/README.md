# Framework Template

Um template completo de aplicação que demonstra como usar o Node Plus Core para criar aplicações web full-stack com React, TypeScript e Express.js.

## 🚀 Características

- **Servidor Express** com Vite para desenvolvimento
- **Controllers com Decorators** TypeScript para definição de rotas
- **Renderização Server-Side** com React
- **Sistema de Roteamento** declarativo
- **Hot Reload** durante desenvolvimento
- **TypeScript First** com configuração completa
- **Estrutura Organizada** seguindo boas práticas

## 📦 Instalação

```bash
# Clonar o repositório
git clone <repository-url>
cd mono-repo

# Instalar dependências
yarn install

# Navegar para o template
cd packages/framework-template
```

## 🛠️ Desenvolvimento

### Executando o Servidor

```bash
yarn dev
```

O servidor estará disponível em `http://localhost:3000`

### Scripts Disponíveis

```bash
yarn dev          # Inicia o servidor de desenvolvimento
yarn build        # Build da aplicação
yarn start        # Inicia o servidor de produção
```

## 📁 Estrutura do Projeto

```
framework-template/
├── src/
│   ├── app/                    # Componentes React da aplicação
│   │   ├── app.tsx            # Componente principal
│   │   ├── globals.css        # Estilos globais
│   │   └── pages/             # Páginas da aplicação
│   │       ├── About.tsx      # Página Sobre
│   │       ├── Home.tsx       # Página Inicial
│   │       ├── UserDetail.tsx # Detalhes do Usuário
│   │       └── Users.tsx      # Lista de Usuários
│   ├── components/            # Componentes reutilizáveis
│   │   └── Layout.tsx        # Layout principal
│   ├── config/               # Configurações
│   │   ├── hydrateSetup.tsx  # Configuração de hidratação
│   │   └── routes.tsx        # Configuração de rotas
│   ├── controllers/          # Controllers da aplicação
│   │   ├── ApplicationController.tsx
│   │   ├── HomeController.tsx
│   │   └── UserController.tsx
│   ├── scripts/             # Scripts utilitários
│   │   └── hydrate.tsx      # Script de hidratação
│   └── server.tsx           # Servidor principal
├── package.json
├── tsconfig.json
└── README.md
```

## 🎯 Rotas Disponíveis

### Páginas Principais
- `GET /` - Página inicial
- `GET /about` - Página sobre

### API de Usuários
- `GET /users` - Lista todos os usuários
- `GET /users/:id` - Mostra detalhes de um usuário específico
- `POST /users` - Cria um novo usuário
- `PUT /users/:id` - Atualiza um usuário existente
- `DELETE /users/:id` - Remove um usuário

### Formulários
- `POST /contact` - Envia formulário de contato

## 💻 Exemplos de Uso

### Criando um Controller

```typescript
import { BaseAppController } from 'nodeplus-core/node-plus-server';
import { Controller, Get, Post } from 'nodeplus-core/node-plus-server';
import { Request, Response } from 'express';

@Controller('/api')
export class ApiController extends BaseAppController {
  constructor(req: Request, res: Response) {
    super(req, res);
  }

  @Get('/users')
  async getUsers() {
    // Lógica para buscar usuários
    const users = await User.findAll();
    return this.render('users/index', { users });
  }

  @Post('/users')
  async createUser() {
    const userData = this.extractArgs('createUser');
    const user = await User.create(userData);
    return this.redirect(`/users/${user.id}`);
  }
}
```

### Criando uma Página React

```typescript
// src/app/pages/Users.tsx
import React from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

interface UsersProps {
  users: User[];
}

export default function Users({ users }: UsersProps) {
  return (
    <div>
      <h1>Usuários</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Configurando Rotas

```typescript
// src/config/routes.tsx
import { Router } from 'express';
import { registerControllerRoutes } from 'nodeplus-core/node-plus-server';
import { HomeController } from '../controllers/HomeController';
import { UserController } from '../controllers/UserController';

export function setupRoutes() {
  const router = Router();

  // Registrar controllers
  router.use(registerControllerRoutes(HomeController));
  router.use(registerControllerRoutes(UserController));

  return router;
}
```

## 🔧 Configuração

### TypeScript

O projeto já vem configurado com TypeScript e decorators habilitados:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "node"
  }
}
```

### Vite

Configuração do Vite para desenvolvimento:

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    middlewareMode: true
  }
});
```

## 🎨 Estilização

O template usa CSS global com suporte a:

- CSS Modules
- CSS-in-JS
- Tailwind CSS (configurável)
- Styled Components

## 🚀 Deploy

### Build de Produção

```bash
yarn build
```

### Executar em Produção

```bash
yarn start
```

## 🔍 Debugging

### Logs do Servidor

O servidor exibe logs detalhados incluindo:
- Rotas registradas
- Requisições recebidas
- Erros e warnings

### DevTools

- React DevTools disponível em desenvolvimento
- Vite DevTools integrado
- Hot reload automático

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature
3. Implemente suas mudanças
4. Teste localmente com `yarn dev`
5. Abra um Pull Request

## 📚 Documentação Relacionada

- [Node Plus Server](../nodeplus-core/node-plus-server/README.md) - Documentação do módulo server-side
- [README Principal](../../README.md) - Visão geral do projeto

## 🆘 Suporte

Para dúvidas sobre o template:
1. Verifique a documentação do Node Plus Server
2. Abra uma issue no repositório
3. Consulte os exemplos no código

## 📄 Licença

Este template está sob a licença MIT. 