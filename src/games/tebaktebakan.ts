import got from 'got'
import { z } from 'zod'

export const TebakTebakanSchema = z.object({
  soal: z.string(),
  jawaban: z.string()
})
export type TebakTebakan = z.infer<typeof TebakTebakanSchema>

export let tebaktebakanjson: TebakTebakan[]
export default async function tebaktebakan (): Promise<TebakTebakan> {
  if (!tebaktebakanjson) {
    tebaktebakanjson = await got(
      'https://raw.githubusercontent.com/BochilTeam/database/master/games/tebaktebakan.json'
    ).json()
  }
  return TebakTebakanSchema.parse(
    tebaktebakanjson[Math.floor(Math.random() * tebaktebakanjson.length)]
  )
}