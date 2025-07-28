# NodePlus Hydration System

O sistema de hydration do NodePlus permite a transição suave do server-side rendering para client-side rendering, mantendo a interatividade dos componentes React.

## Funcionalidades

- **Hydration automática**: Hidrata componentes React automaticamente
- **Configuração flexível**: Permite customização de rotas e caminhos
- **Middleware integrado**: Facilita a integração com Express
- **Compilação SWC**: Compilação rápida de TypeScript para JavaScript

## Uso Básico

### 1. Configuração no Servidor

```typescript
import { setupDefaultHydration, hydrationMiddleware } from 'nodeplus-core/node-plus-server';

// Configurar o sistema de hydration
setupDefaultHydration(app, {
  routePath: '/scripts/hydration',
  scriptPath: '/scripts/hydration'
});

// Adicionar middleware
app.use(hydrationMiddleware);
```

### 2. Uso em Controllers

```typescript
import { Get } from 'nodeplus-core/node-plus-server';

@Get("/")
async index(req: any, res: any) {
  // Definir dados de hydration
  res.setHydrationData('Home', { name: 'NodePlus' });
  
  // Retornar a view
  return <Home initialData={{ name: 'NodePlus' }} />;
}
```

### 3. Estrutura de Arquivos

```
src/
├── app/
│   ├── pages/
│   │   └── Home.tsx          # Componente a ser hidratado
│   └── index.html            # Template HTML base
└── server.tsx               # Configuração do servidor
```

## API Reference

### `setupDefaultHydration(app, config)`

Configura o sistema de hydration com configurações padrão.

**Parâmetros:**
- `app`: Instância do Express
- `config`: Configurações opcionais

**Configurações disponíveis:**
- `routePath`: Rota para servir o script de hydration (padrão: '/scripts/hydration')
- `scriptPath`: Caminho do script de hydration
- `pagesDirectory`: Diretório dos componentes (padrão: '../app/pages')

### `hydrationMiddleware(req, res, next)`

Middleware que adiciona funcionalidades de hydration ao response.

**Métodos adicionados ao res:**
- `res.setHydrationData(componentName, props)`: Define dados de hydration

### `createHydratedHTML(componentName, props, templateHtml)`

Gera HTML com scripts de hydration.

**Parâmetros:**
- `componentName`: Nome do componente
- `props`: Props do componente
- `templateHtml`: HTML template base

## Exemplo Completo

```typescript
// server.tsx
import express from 'express';
import { setupDefaultHydration, hydrationMiddleware } from 'nodeplus-core/node-plus-server';

const app = express();

// Configurar hydration
setupDefaultHydration(app);
app.use(hydrationMiddleware);

// ... outras configurações

app.listen(3000);
```

```typescript
// controllers/HomeController.tsx
import { Get } from 'nodeplus-core/node-plus-server';
import Home from '../app/pages/Home';

@Get("/")
async index(req: any, res: any) {
  res.setHydrationData('Home', { name: 'NodePlus' });
  return <Home initialData={{ name: 'NodePlus' }} />;
}
```

```tsx
// app/pages/Home.tsx
import React, { useState } from 'react';

export default function Home({ initialData }: any) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Welcome to {initialData.name}</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

## Como Funciona

1. **Server-side**: O componente é renderizado no servidor
2. **HTML Generation**: O HTML é gerado com dados de hydration
3. **Client-side**: O script de hydration carrega e hidrata o componente
4. **Interatividade**: O componente se torna interativo no cliente

## Dependências

O sistema de hydration requer as seguintes dependências:

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "@swc/core": "^1.4.8"
  }
}
``` 