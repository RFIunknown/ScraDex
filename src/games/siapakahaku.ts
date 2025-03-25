import got from 'got'
import { z } from 'zod'

export const SiapakahAkuSchema = z.object({
  index: z.number(),
  soal: z.string(),
  jawaban: z.string()
})
export type SiapakahAku = z.infer<typeof SiapakahAkuSchema>

export let siapakahakujson: SiapakahAku[]
export default async function siapakahaku (): Promise<SiapakahAku> {
  if (!siapakahakujson) {
    siapakahakujson = await got(
      'https://raw.githubusercontent.com/BochilTeam/database/master/games/siapakahaku.json'
    ).json()
  }
  return SiapakahAkuSchema.parse(
    siapakahakujson[Math.floor(Math.random() * siapakahakujson.length)]
  )
}