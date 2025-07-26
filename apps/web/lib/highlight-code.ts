import { codeToHtml } from "shiki"

export async function highlightCode(code: string, language: string = "jsx") {
  const html = await codeToHtml(code, {
    lang: language,
    theme: "github-dark-default",
  })

  return html
}
