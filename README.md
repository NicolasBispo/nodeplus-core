# Node Plus - Mono Repo

Um framework Node.js moderno para desenvolvimento full-stack com React, TypeScript e Express.js.

## 🏗️ Estrutura do Projeto

Este é um mono repositório contendo:

- **`packages/framework-template/`** - Template de aplicação exemplo
- **`packages/nodeplus-core/`** - Core do framework com módulos implementados

## 📦 Módulos Disponíveis

### Framework Template
Um template completo de aplicação que demonstra como usar o Node Plus Core.

**Características:**
- Servidor Express com Vite para desenvolvimento
- Controllers com decorators TypeScript
- Renderização server-side com React
- Sistema de roteamento declarativo
- Hot reload durante desenvolvimento

**📖 [Ver Documentação do Framework Template](./packages/framework-template/README.md)**

### Node Plus Core

O núcleo do framework que fornece todas as funcionalidades base.

#### Módulos Implementados:

##### 🚀 Node Plus Server
Framework server-side que combina Express.js com React para aplicações full-stack.

**Funcionalidades:**
- Decorators para definição de rotas
- Base Controller com funcionalidades SEO
- Sistema de renderização de templates React
- Router inteligente com suporte RESTful
- Middleware de erro integrado
- TypeScript first

**📖 [Ver Documentação do Node Plus Server](./packages/nodeplus-core/node-plus-server/README.md)**

## 🚀 Início Rápido

### 1. Clonando o Repositório

```bash
git clone <repository-url>
cd mono-repo
yarn install
```

### 2. Executando o Framework Template

```bash
cd packages/framework-template
yarn dev
```

O servidor estará disponível em `http://localhost:3000`

### 3. Rotas Disponíveis no Template

- `GET /` - Página inicial
- `GET /about` - Página sobre
- `POST /contact` - Formulário de contato
- `GET /users` - Lista de usuários
- `GET /users/:id` - Detalhes do usuário
- `POST /users` - Criar usuário
- `PUT /users/:id` - Atualizar usuário
- `DELETE /users/:id` - Deletar usuário

## 🛠️ Desenvolvimento

### Pré-requisitos

- Node.js 18+
- Yarn
- TypeScript

### Scripts Disponíveis

```bash
# Instalar dependências
yarn install

# Executar o template de exemplo
cd packages/framework-template
yarn dev

# Build do core
cd packages/nodeplus-core
yarn build
```

### Estrutura de Desenvolvimento

```
mono-repo/
├── packages/
│   ├── framework-template/     # Template de aplicação
│   │   ├── src/
│   │   │   ├── app/           # Componentes React
│   │   │   ├── controllers/   # Controllers da aplicação
│   │   │   ├── config/        # Configurações
│   │   │   └── server.tsx     # Servidor principal
│   │   └── README.md
│   └── nodeplus-core/         # Core do framework
│       ├── node-plus-server/  # Módulo server-side
│       │   ├── controller/    # Controllers base
│       │   ├── decorators/    # Decorators TypeScript
│       │   ├── router/        # Sistema de roteamento
│       │   └── README.md
│       └── package.json
├── package.json
└── README.md
```

## 🎯 Casos de Uso

### Para Desenvolvedores Iniciantes
Use o **Framework Template** como ponto de partida para suas aplicações. Ele já vem configurado com todas as funcionalidades necessárias.

### Para Desenvolvedores Experientes
Use o **Node Plus Core** para criar suas próprias implementações ou estender o framework com novos módulos.

### Para Contribuidores
O mono repositório facilita o desenvolvimento e teste de novos módulos mantendo tudo integrado.

## 🔧 Configuração

### TypeScript
Certifique-se de que o TypeScript está configurado com decorators habilitados:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

### Dependências Principais
- Express.js 5.x
- React 18.x
- TypeScript 5.x
- Vite 7.x

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Diretrizes de Contribuição

- Mantenha a estrutura de mono repositório
- Documente novos módulos com README.md
- Siga os padrões TypeScript estabelecidos
- Teste suas mudanças no framework template

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📚 Documentação Adicional

- [Framework Template](./packages/framework-template/README.md) - Documentação completa do template
- [Node Plus Server](./packages/nodeplus-core/node-plus-server/README.md) - Documentação do módulo server-side

## 🆘 Suporte

Para dúvidas, issues ou sugestões, abra uma issue no repositório ou entre em contato através dos canais oficiais do projeto. 