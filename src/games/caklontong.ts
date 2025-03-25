import got from 'got'
import { z } from 'zod'

export const CakLontongSchema = z.object({
  index: z.number(),
  soal: z.string(),
  jawaban: z.string(),
  deskripsi: z.string()
})
export type CakLontong = z.infer<typeof CakLontongSchema>

export let caklontongjson: CakLontong[]
export default async function caklontong (): Promise<CakLontong> {
  if (!caklontongjson) {
    caklontongjson = await got(
      'https://raw.githubusercontent.com/BochilTeam/database/master/games/caklontong.json'
    ).json()
  }
  return CakLontongSchema.parse(
    caklontongjson[Math.floor(Math.random() * caklontongjson.length)]
  )
}