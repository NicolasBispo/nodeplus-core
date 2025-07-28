// main.tsx
import React from 'react'
import { hydrateRoot } from 'react-dom/client'

const props = (window as any).__INITIAL_PROPS__ || {}
const componentName = (window as any).__COMPONENT_NAME__ || ''

// Wrapper component to ensure proper React context
function HydrationWrapper({ Component, componentProps }: { Component: React.ComponentType<any>, componentProps: any }) {
  return React.createElement(Component, componentProps)
}

async function hydrate() {
  if (!componentName) {
    console.error('[Hydration] Component name is empty')
    return
  }
  
  try {
    // Import the component module using dynamic import
    const module = await import(`../app/pages/${componentName}.tsx`)
    const Component = module.default
    
    // Ensure we have a valid React component
    if (!Component || typeof Component !== 'function') {
      throw new Error(`Invalid component: ${componentName}`)
    }
    
    // Get the root element
    const rootElement = document.getElementById('root')
    if (!rootElement) {
      throw new Error('Root element not found')
    }
    
    // Create the wrapper element and hydrate
    const element = React.createElement(HydrationWrapper, { Component, componentProps: props })
    hydrateRoot(rootElement, element)
    
    console.log(`✅ [Hydration] Component ${componentName} hydrated successfully`)
  } catch (error) {
    console.error(`[Hydration] Erro ao carregar componente ${componentName}:`, error)
  }
}

// Start hydration
hydrate().catch(err => {
  console.error('[Hydration] Erro ao carregar componente:', err)
})
