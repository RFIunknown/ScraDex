import got from 'got'
import { z } from 'zod'

export const TebakKataSchema = z.object({
  index: z.number(),
  soal: z.string(),
  jawaban: z.string()
})
export type TebakKata = z.infer<typeof TebakKataSchema>

export let tebakkatajson: TebakKata[]
export default async function tebakkata (): Promise<TebakKata> {
  if (!tebakkatajson) {
    tebakkatajson = await got(
      'https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkata.json'
    ).json()
  }
  return TebakKataSchema.parse(
    tebakkatajson[Math.floor(Math.random() * tebakkatajson.length)]
  )
}
