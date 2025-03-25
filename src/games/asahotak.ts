import got from "got"
import { z } from "zod"

export const AsahOtakSchema = z.object({
  index: z.number(),
  soal: z.string(),
  jawaban: z.string()
})

export type AsahOtak = z.infer<typeof AsahOtakSchema>

export let asahotakjson: AsahOtak[]
export default async function asahotak (): Promise<AsahOtak> {
  if (!asahotakjson) {
    asahotakjson = await got(
      "https://raw.githubusercontent.com/BochilTeam/database/master/games/asahotak.json"
    ).json()
  }
  return AsahOtakSchema.parse(
    asahotakjson[Math.floor(Math.random() * asahotakjson.length)]
  )
}
