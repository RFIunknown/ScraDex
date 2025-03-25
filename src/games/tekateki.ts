import got from 'got'
import { z } from 'zod'

export const TekaTekiSchema = z.object({
  soal: z.string(),
  jawaban: z.string()
})
export type TekaTeki = z.infer<typeof TekaTekiSchema>

export let tekatekijson: TekaTeki[]
export default async function tekateki (): Promise<TekaTeki> {
  if (!tekatekijson) {
    tekatekijson = await got(
      'https://raw.githubusercontent.com/BochilTeam/database/master/games/tekateki.json'
    ).json()
  }
  return TekaTekiSchema.parse(
    tekatekijson[Math.floor(Math.random() * tekatekijson.length)]
  )
}