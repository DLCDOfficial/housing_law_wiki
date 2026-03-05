import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import ViteYaml from "@modyfi/vite-plugin-yaml";

const markdownLoader = () => {
  return {
    name: 'markdown-loader',
    transform(code, id) {
      if (id.slice(-3) === '.md') {
        // Transforms .md files into JS strings
        return `export default ${JSON.stringify(code)};`;
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), markdownLoader(), ViteYaml()],
  base: "/dist/"
})
