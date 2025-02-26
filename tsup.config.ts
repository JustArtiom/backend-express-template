import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src'],
    splitting: true,
    silent: process.env.NODE_ENV === 'production',
    minify: process.env.NODE_ENV === 'production',
    clean: true,
})
