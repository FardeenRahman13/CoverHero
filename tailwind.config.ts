import type { Config } from "tailwindcss";
export default { content: ["./app/**/*.tsx", "./components/**/*.tsx"],
 theme: { extend: { fontFamily: { serif: ["Georgia", "Times New Roman", "serif"] } } }, plugins: [] } satisfies Config;
