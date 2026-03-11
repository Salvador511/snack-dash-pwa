import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = process.cwd()
const inputIcon = path.join(ROOT, 'public', 'icons', 'icon-1024.png')
const outDir = path.join(ROOT, 'public', 'splash')

const background = '#303030'

// Output pixel sizes for common iOS devices (portrait + some landscape for iPads).
// These are used by <link rel="apple-touch-startup-image"> with matching media queries.
const splashSizes = [
  // iPhone
  { width: 640, height: 1136 },
  { width: 750, height: 1334 },
  { width: 828, height: 1792 },
  { width: 1125, height: 2436 },
  { width: 1170, height: 2532 },
  { width: 1242, height: 2688 },
  { width: 1290, height: 2796 },

  // iPad portrait
  { width: 1536, height: 2048 },
  { width: 1668, height: 2224 },
  { width: 1668, height: 2388 },
  { width: 2048, height: 2732 },

  // iPad landscape
  { width: 2048, height: 1536 },
  { width: 2224, height: 1668 },
  { width: 2388, height: 1668 },
  { width: 2732, height: 2048 },
]

const exists = async (p) => {
  try {
    await fs.access(p)
    return true
  } catch {
    return false
  }
}

const main = async () => {
  if (!(await exists(inputIcon))) {
    throw new Error(`Missing input icon: ${inputIcon}`)
  }

  await fs.mkdir(outDir, { recursive: true })

  const iconBuffer = await fs.readFile(inputIcon)
  const icon = sharp(iconBuffer)

  for (const { width, height } of splashSizes) {
    const outFile = path.join(outDir, `apple-splash-${width}-${height}.png`)

    // Icon size tuned to look good across devices.
    const iconSize = Math.round(Math.min(width, height) * 0.28)

    const resizedIcon = await icon
      .clone()
      .resize(iconSize, iconSize, {
        fit: 'contain',
        withoutEnlargement: true,
      })
      .png()
      .toBuffer()

    await sharp({
      create: {
        width,
        height,
        channels: 3,
        background,
      },
    })
      .composite([{ input: resizedIcon, gravity: 'center' }])
      .png({ compressionLevel: 9 })
      .toFile(outFile)

    console.log(`generated: public/splash/${path.basename(outFile)}`)
  }
}

main().catch((err) => {

  console.error(err)
  process.exit(1)
})
