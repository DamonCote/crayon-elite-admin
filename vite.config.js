import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import path from "path";
import ElementPlus from "unplugin-element-plus/vite";
import viteCompression from "vite-plugin-compression";
import fs from "fs";

export default defineConfig({
    envDir: "env",
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "~@": path.resolve(__dirname, "./src"),
        },
        extensions: [".vue", ".js", ".json", ".scss"],
    },
    outDir: "dist",
    server: {
        port: 3000,
        host: "local.crayon-elite.evoart.ai",
        open: true,
        https: {
            key: fs.readFileSync("./ssl/local.crayon-elite.evoart.ai-key.pem"),
            cert: fs.readFileSync("./ssl/local.crayon-elite.evoart.ai.pem"),
        },
        proxy: {
            "/api/v1": {
                target: "https://api-crayon.evoart.ai",
                changeOrigin: true,
                secure: false,
            },
        },
    },

    plugins: [
        vue(),
        viteCompression({
            threshold: 4096,
        }),
        ElementPlus({
            importStyle: "sass",
            useSource: true,
        }),
        Components({
            resolvers: [
                ElementPlusResolver({
                    importStyle: "sass",
                }),
            ],
        }),
        AutoImport({
            resolvers: [
                ElementPlusResolver({
                    importStyle: "sass",
                }),
            ],
        }),
    ],

    build: {
        rollupOptions: {
            input: {
                index: path.resolve(__dirname, "index.html"),
            },
            output: {
                chunkFileNames: "js/[name]-[hash].js",
                entryFileNames: "js/[name]-[hash].js",
                assetFileNames: (assetInfo) => {
                    const info = assetInfo.name.split(".");
                    let extType = info[info.length - 1];
                    if (
                        /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(
                            assetInfo.name
                        )
                    ) {
                        extType = "media";
                    } else if (
                        /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/.test(assetInfo.name)
                    ) {
                        extType = "images";
                    } else if (
                        /\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)
                    ) {
                        extType = "fonts";
                    }
                    return `${extType}/[name]-[hash][extname]`;
                },
            },
        },
    },
});
