import { argv as A } from './index.mjs'
import { degoPackageRootPath } from './helpers.mjs'
import { readFileSync } from 'fs'
import { resolve } from 'path'

export async function getVersion(argv: typeof A) {
  const headers = new Headers()
  headers.set(
    'Authorization',
    'Bearer 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'
  )
  headers.set('accept', 'application/vnd.github+json')

  const response = await await fetch(
    'https://api.github.com/repos/Hexy32/dego-package/contents/package.json',
    { headers }
  ).then(res => res.json())

  const remotePackageInfo = JSON.parse(
    Buffer.from(response.content, 'base64').toString('utf8')
  )

  const packageInfo = getPackageInfo()

  if (remotePackageInfo.version !== packageInfo.version) {
    return `Dego is out of date!\nYour version: ${packageInfo.version}\nCurrent version: ${remotePackageInfo.version}`
  } else {
    return `Dego up to date!\nVersion: ${packageInfo.version}`
  }
}

export function getPackageInfo() {
  const packageJSONLocation = resolve(degoPackageRootPath, './package.json')

  const file = readFileSync(packageJSONLocation, { encoding: 'utf8' })
  return JSON.parse(file)
}
