# nodeplus-core

Core framework for NodePlus - A Rails-like framework for Node.js with React SSR.

## Installation

```bash
npm install nodeplus-core
```

## Quick Start

```typescript
import { createNodePlusApp, AppController, router } from 'nodeplus-core';
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

  async about() {
    return this.renderRoute({ 
      title: "About NodePlus",
      description: "Learn more about our framework"
    });
  }
}

// Define your routes
function defineRoutes() {
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
import { AppController } from 'nodeplus-core';

export class MyController extends AppController {
  async index() {
    return this.renderRoute({ title: "My Page" });
  }

  async show() {
    const id = this.req.params.id;
    return this.renderRoute({ id, title: `Item ${id}` });
  }

  async create() {
    // Handle POST request
    const data = this.req.body;
    return this.renderRoute({ data, message: "Created successfully" });
  }
}
```

### Router

Rails-like routing DSL.

```typescript
import { router } from 'nodeplus-core';

// Basic routes
router.get('/', 'HomeController.index');
router.get('/about', 'HomeController.about');

// RESTful routes
router.get('/users', 'UsersController.index');
router.get('/users/:id', 'UsersController.show');
router.post('/users', 'UsersController.create');
router.put('/users/:id', 'UsersController.update');
router.delete('/users/:id', 'UsersController.destroy');

// Custom routes
router.get('/api/health', 'ApiController.health');
```

### createApp / createNodePlusApp

Initialize the framework with configuration.

```typescript
import { createApp, createNodePlusApp } from 'nodeplus-core';

// Using createApp with configuration object
createApp({
  port: 3000,
  routes: defineRoutes,
  middleware: [/* custom middleware */]
});

// Using createNodePlusApp for quick setup
createNodePlusApp(defineRoutes, 3000);
```

## Complete Example

Here's a complete example of a NodePlus application:

```typescript
// app.ts
import { createNodePlusApp, AppController, router } from 'nodeplus-core';
import React from 'react';

// Define your React components
const HomePage: React.FC<{ title: string; message: string }> = ({ title, message }) => (
  <div>
    <h1>{title}</h1>
    <p>{message}</p>
  </div>
);

const AboutPage: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <div>
    <h1>{title}</h1>
    <p>{description}</p>
  </div>
);

// Define your controllers
export class HomeController extends AppController {
  async index() {
    return this.renderRoute({
      title: "Welcome to NodePlus",
      message: "A Rails-like framework for Node.js"
    });
  }

  async about() {
    return this.renderRoute({
      title: "About NodePlus",
      description: "Learn more about our framework"
    });
  }
}

// Define routes
function defineRoutes() {
  router.get('/', 'HomeController.index');
  router.get('/about', 'HomeController.about');
}

// Start the application
createNodePlusApp(defineRoutes, 3000);
```

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Development mode with watch
npm run dev
```

## License

MIT 