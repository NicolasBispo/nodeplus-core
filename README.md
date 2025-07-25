# @nodeplus/core

Core framework for NodePlus - A Rails-like framework for Node.js with React SSR.

## Installation

```bash
npm install @nodeplus/core
```

## Quick Start

```typescript
import { createNodePlusApp, AppController } from '@nodeplus/core';
import { HomePage } from './views/HomePage';

// Define your controller
export class HomeController extends AppController {
  async index() {
    const pageProps = {
      title: "Welcome to NodePlus",
      message: "A Rails-like framework for Node.js"
    };

    return this.renderRoute(pageProps);
  }
}

// Define your routes
function defineRoutes() {
  const { router } = require('@nodeplus/core');
  
  router.get('/', 'HomeController.index');
  router.get('/about', 'HomeController.about');
}

// Start the application
createNodePlusApp(defineRoutes, 3000);
```

## Features

- ✅ **Rails-like Controllers** - Extend `AppController` for easy request handling
- ✅ **React SSR** - Server-side rendering with hydration
- ✅ **TypeScript Support** - Full TypeScript support out of the box
- ✅ **Vite Integration** - Hot module replacement and fast builds
- ✅ **Express-based** - Built on top of Express.js

## API Reference

### AppController

Base controller class with SSR capabilities.

```typescript
import { AppController } from '@nodeplus/core';

export class MyController extends AppController {
  async index() {
    return this.renderRoute({ title: "My Page" });
  }
}
```

### Router

Rails-like routing DSL.

```typescript
import { router } from '@nodeplus/core';

router.get('/', 'HomeController.index');
router.post('/users', 'UsersController.create');
router.put('/users/:id', 'UsersController.update');
router.delete('/users/:id', 'UsersController.destroy');
```

### createApp

Initialize the framework with configuration.

```typescript
import { createApp } from '@nodeplus/core';

createApp({
  port: 3000,
  routes: defineRoutes,
  middleware: [/* custom middleware */]
});
```

## License

MIT 