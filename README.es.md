# Agentes de seodraft

Plantillas de agentes y plugins listos para conectar con [seodraft](https://seodraft.app), el agente de SEO que escribe sin relleno de IA.

[English](README.md)

## Qué es seodraft

[seodraft](https://seodraft.app/es) es un agente de SEO que funciona como servidor MCP remoto en `https://seodraft.app/mcp`. Lo conectás a la IA que ya usás (Claude, ChatGPT, Cursor, Grok Bot o cualquier cliente MCP) y se encarga del flujo completo del blog:

- **Temas con volumen de búsqueda medido**, sacado de tu propia cuenta de DataForSEO.
- **Briefs del SERP**: qué busca la gente y qué cubren los primeros resultados, antes de escribir.
- **Borradores a partir de la evidencia que vos aportás.** Nada de datos, citas ni clientes inventados.
- **Controles de calidad contra el "AI slop"**: sin relleno, con la keyword bien ubicada y sin canibalizar tus posts existentes.
- **Entrega solo de borradores aprobados**, en Markdown, HTML o como borrador en git. No tiene herramienta para publicar.

Podés probar gratis los mismos controles con el [detector de AI slop](https://seodraft.app/es/tools/ai-slop).

## Cómo conectarlo

La URL del servidor es siempre la misma: `https://seodraft.app/mcp`. La autenticación es OAuth con registro dinámico de cliente y PKCE, así que no hay API key para pegar.

- **Claude:** Configuración → Conectores → Agregar conector personalizado, y pegás la URL. En Claude Code: `claude mcp add --transport http seodraft https://seodraft.app/mcp`.
- **ChatGPT:** activás el modo desarrollador y creás una app o conector con la URL y OAuth.
- **Cursor:** usá el botón de instalación del [README en inglés](README.md#cursor) o instalá este repo como plugin.
- **Grok Bot:** partí de la plantilla https://x.ai/bot/OkT4Dbjy4xVf7oVBCr8hL.
- **eve (Vercel):** mirá la carpeta [`eve/`](eve).

## Precio

**US$5 por mes o US$50 por año**, con **7 días de prueba gratis sin tarjeta**. Más info en [seodraft.app/es/pricing](https://seodraft.app/es/pricing).

## Licencia

[MIT](LICENSE). Cubre solo la configuración, los prompts y la documentación de este repositorio, no el servicio de seodraft.
