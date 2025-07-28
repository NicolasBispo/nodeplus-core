import { setupHydration, generateHydrationHTML } from './HydrationSetup';
import path from 'path';

/**
 * Configuração padrão do sistema de hydration para o NodePlus
 */
export const DEFAULT_HYDRATION_CONFIG = {
  routePath: '/scripts/hydration',
  pagesDirectory: '../app/pages',
  indexPath: path.join(process.cwd(), 'src/app/index.html')
};

/**
 * Configura o sistema de hydration com configurações padrão
 * @param app - Instância do Express
 * @param customConfig - Configurações customizadas (opcional)
 */
export function setupDefaultHydration(app: any, customConfig: any = {}): void {
  const config = { ...DEFAULT_HYDRATION_CONFIG, ...customConfig };
  setupHydration(app, config);
}

/**
 * Gera HTML com hydration para um componente específico
 * @param componentName - Nome do componente
 * @param props - Props do componente
 * @param templateHtml - HTML template base
 * @returns HTML com scripts de hydration
 */
export function createHydratedHTML(
  componentName: string,
  props: any = {},
  templateHtml: string
): string {
  return generateHydrationHTML(componentName, props, templateHtml);
}

/**
 * Middleware para injetar dados de hydration automaticamente
 * @param req - Request do Express
 * @param res - Response do Express
 * @param next - Next function
 */
export function hydrationMiddleware(req: any, res: any, next: any): void {
  // Adiciona dados de hydration ao res.locals para uso nos controllers
  res.locals.hydration = {
    componentName: '',
    props: {}
  };
  
  // Método para definir dados de hydration
  res.setHydrationData = (componentName: string, props: any = {}) => {
    res.locals.hydration.componentName = componentName;
    res.locals.hydration.props = props;
  };
  
  next();
} 