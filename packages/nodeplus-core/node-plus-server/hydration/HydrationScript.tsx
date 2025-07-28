import React from 'react'
import { hydrateRoot } from 'react-dom/client'

interface HydrationData {
  props?: any
  componentName?: string
}

// Wrapper component to ensure proper React context
function HydrationWrapper({ Component, componentProps }: { Component: React.ComponentType<any>, componentProps: any }) {
  return React.createElement(Component, componentProps)
}

async function hydrate() {
  // Get hydration data from window object
  const hydrationData: HydrationData = (window as any).__HYDRATION_DATA__ || {}
  const { props = {}, componentName = '' } = hydrationData

  if (!componentName) {
    console.error('[NodePlus Hydration] Component name is empty')
    return
  }
  
  try {
    // Import the component module using dynamic import
    // This assumes components are in the app/pages directory
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
    
    console.log(`✅ [NodePlus Hydration] Component ${componentName} hydrated successfully`)
  } catch (error) {
    console.error(`[NodePlus Hydration] Error loading component ${componentName}:`, error)
  }
}

// Start hydration
hydrate().catch(err => {
  console.error('[NodePlus Hydration] Error during hydration:', err)
}) 