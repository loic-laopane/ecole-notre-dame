import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      // Désactivé : les apostrophes et guillemets français ('…', "…") déclenchent cette règle
      // massivement dans le JSX sans présenter de réel risque.
      'react/no-unescaped-entities': 'off',
    },
  },
]

export default eslintConfig
