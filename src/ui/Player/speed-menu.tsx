import { Menu, usePlaybackRateOptions } from '@vidstack/react'
import {
  ChevronRightIcon,
  RadioButtonIcon,
  RadioButtonSelectedIcon,
} from '@vidstack/react/icons'

const radioClassName =
  'ring-sky-400 group relative flex w-full cursor-pointer select-none items-center justify-start rounded-sm p-2.5 outline-none data-[hocus]:bg-white/10 data-[focus]:ring-[3px]'
const radioIconClassName = 'h-4 w-4 text-white group-data-[checked]:hidden'
const radioSelectedIconClassName =
  'text-indigo-400 hidden h-4 w-4 group-data-[checked]:block'

export function SpeedMenu() {
  const options = usePlaybackRateOptions()
  const hint =
    options.selectedValue === '1' ? 'Normal' : options.selectedValue + 'x'
  return (
    <Menu.Root>
      <Menu.Button
        className='relative ml-2 flex w-32 cursor-pointer select-none items-center justify-center rounded-md  bg-gray-800 p-2 outline-none ring-inset ring-sky-400 data-[open]:sticky data-[open]:-top-2 data-[hocus]:bg-white/10 data-[focus]:ring-[3px]'
        disabled={options.disabled}
      >
        <span className='text-sm text-white/50'>{hint}</span>
        <ChevronRightIcon className='ml-0.5 h-[18px] w-[18px] text-sm text-white/50 parent-data-[open]:hidden' />
      </Menu.Button>
      <Menu.Items
        className='flex h-[var(--menu-height)] max-h-[400px] min-w-[150px] flex-col overflow-y-auto overscroll-y-contain rounded-md border border-white/10 bg-black/95 p-2 font-sans text-[15px] font-medium outline-none backdrop-blur-sm transition-[height] duration-300 will-change-[height] animate-out fade-out slide-out-to-bottom-2 data-[resizing]:overflow-hidden data-[open]:animate-in data-[open]:fade-in data-[open]:slide-in-from-bottom-4'
        placement='top'
        offset={0}
      >
        <Menu.RadioGroup
          className='flex w-full flex-col'
          value={options.selectedValue}
        >
          {options.map(({ label, value, select }) => (
            <Menu.Radio
              className={radioClassName}
              value={value}
              onSelect={select}
              key={value}
            >
              <RadioButtonIcon className={radioIconClassName} />
              <RadioButtonSelectedIcon className={radioSelectedIconClassName} />
              {label}
            </Menu.Radio>
          ))}
        </Menu.RadioGroup>
      </Menu.Items>
    </Menu.Root>
  )
}
