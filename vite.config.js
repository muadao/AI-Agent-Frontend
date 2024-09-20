import {defineConfig} from 'vite'
import {viteStaticCopy} from 'vite-plugin-static-copy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import viteCompression from 'vite-plugin-compression'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {NaiveUiResolver} from 'unplugin-vue-components/resolvers'

export default defineConfig({
    assetsInclude: ['.gltf', '.png', '.jpg', '.wav', '.mp3', '.lottie'],
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        assetsDir: './assets',
        rollupOptions: {
            input: {
                main: './index.html'
            }
        }
    },
    plugins: [
        viteStaticCopy({
            targets: [{src: './assets', dest: '.'}]
        }),
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: (tag) => {
                        return ['dotlottie-player'].includes(tag)
                    }
                }
            }
        }),
        viteCompression({
            verbose: true,
            algorithm: 'gzip',
            filter: /\.(js|mjs|ts|tsx|json|css|html|wasm|svg|lottie|glb)$/
        }),
        AutoImport({
            imports: [
                'vue',
                {
                    'naive-ui': [
                        'useDialog',
                        'useMessage',
                        'useNotification',
                        'useLoadingBar',
                    ]
                }
            ]
        }),
        Components({
            resolvers: [NaiveUiResolver()]
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    server: {
        open: true,
        cors: true,
        proxy: {
            '^/public_api': {
                target: 'https://cloud.staging.muaverse.build',
                changeOrigin: true
                // rewrite: path => path.replace(/^\/api/, '')
            }
        }
    }
})