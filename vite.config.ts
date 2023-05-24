import { fileURLToPath, URL } from "node:url";
import { resolve } from "node:path";
import { readFileSync, writeFileSync } from "node:fs";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import Pages from "vite-plugin-pages";
import Markdown from "vite-plugin-vue-markdown";
import Shiki from "markdown-it-shiki";
import anchor from "markdown-it-anchor";
import LinkAttributes from "markdown-it-link-attributes";
import tocDoneRight from "markdown-it-toc-done-right";
import emoji from "markdown-it-emoji";

// @ts-expect-error missing types
import TOC from "markdown-it-table-of-contents";

import matter from "gray-matter";

import UnoCSS from "unocss/vite";

import { ViteSSGOptions } from "vite-ssg";
const ssgOptions: ViteSSGOptions = {
  formatting: "minify",
  format: "cjs",
};


const dict: any[] = [];
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  ssgOptions,
  plugins: [
    UnoCSS(),
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Pages({
      extensions: ["vue", "md"],
      dirs: "pages",
      extendRoute(route) {
        const path = resolve(__dirname, route.component.slice(1));
        if (path.endsWith(".md")) {
          const md = readFileSync(path, "utf-8");
          const { data } = matter(md);
          route.meta = Object.assign(route.meta || {}, { frontmatter: data });
          dict.push(route);
        }
        console.log("333", dict);
        
        writeFileSync(
          resolve(__dirname, "pages/dict.ts"),
          `export default ${JSON.stringify(dict)}`
        );
        return route;
      },
    }),
    Markdown({
      wrapperComponent: (id) =>
        id.includes("/demo/") ? "WrapperDemo" : "WrapperPost",
      wrapperClasses: (id, code) =>
        code.includes("@layout-full-width")
          ? ""
          : "prose m-auto slide-enter-content",
      headEnabled: true,
      markdownItOptions: {
        quotes: "\"\"''",
      },
      markdownItSetup(md) {
        md.use(Shiki, {
          theme: {
            light: "vitesse-light",
            dark: "vitesse-dark",
          },
        });
        const a = anchor.permalink.linkInsideHeader({
          symbol: "#",
          renderAttrs: () => ({ "aria-hidden": "true" }),
        });
        console.log(a);
        md.use(anchor, {
          permalink: a,
        });

        md.use(LinkAttributes, {
          matcher: (link: string) => /^https?:\/\//.test(link),
          attrs: {
            target: "_blank",
            rel: "noopener",
          },
        });

        md.use(TOC, {
          includeLevel: [1, 2, 3],
        });

        md.use(tocDoneRight);
        md.use(emoji);
      },
      frontmatterPreprocess(frontmatter, options, id, defaults) {
        const head = defaults(frontmatter, options);
        return { head, frontmatter };
      },
    }),
    AutoImport({
      imports: ["vue", "@vueuse/head", "@vueuse/core", "vue-router"],
    }),
    Components({
      extensions: ["vue", "md"],
      dts: true,
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    }),
  ],
});
