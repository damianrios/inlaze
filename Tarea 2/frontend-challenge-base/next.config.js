/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  eslint: {
    // Deshabilitamos la comprobación de ESLint durante el build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Opcionalmente, podemos deshabilitar la comprobación de tipos durante el build
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig