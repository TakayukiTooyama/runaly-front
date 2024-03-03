import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const strictEntries = <T extends Record<string, any>>(
  object: T,
): [keyof T, T[keyof T]][] => Object.entries(object)

export const generateNewColor = () => {
  const hexColorRep = Array.from({ length: 6 }, () => {
    const randomPosition = Math.floor(Math.random() * 16)
    return '0123456789ABCDEF'[randomPosition]
  })

  return `#${hexColorRep.join('')}`
}

export const extractFilename = (id: string) => id.replace(/-\d+$/, '')

export const isIndexValid = (index: number, maxLength: number) =>
  index < 0 || index === maxLength
