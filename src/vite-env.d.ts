/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
    readonly VITE_API: string
}

declare module '*.svg' {
    import * as React from 'react'
    const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
    export = ReactComponent
}