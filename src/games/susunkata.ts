import got from 'got'
import { z } from 'zod'

export const SusunKataSchema = z.object({
  index: z.number(),
  soal: z.string(),
  tipe: z.string(),
  jawaban: z.string()
})
export type SusunKata = z.infer<typeof SusunKataSchema>

export let susunkatajson: SusunKata[]
export default async function susunkata (): Promise<SusunKata> {
  if (!susunkatajson) {
    susunkatajson = await got(
      'https://raw.githubusercontent.com/BochilTeam/database/master/games/susunkata.json'
    ).json()
  }
  return SusunKataSchema.parse(
    susunkatajson[Math.floor(Math.random() * susunkatajson.length)]
  )
}