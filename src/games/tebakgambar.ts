import got from 'got'
import { z } from 'zod'

export const TebakGambarSchema = z.object({
  index: z.number(),
  img: z.string(),
  jawaban: z.string(),
  deskripsi: z.string()
})
export type TebakGambar = z.infer<typeof TebakGambarSchema>

export let tebakgambarjson: TebakGambar[]
export default async function tebakgambar (): Promise<TebakGambar> {
  if (!tebakgambarjson) {
    tebakgambarjson = await got(
      'https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakgambar.json'
    ).json()
  }
  return TebakGambarSchema.parse(
    tebakgambarjson[Math.floor(Math.random() * tebakgambarjson.length)]
  )
}