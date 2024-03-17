'use client'
import React from 'react'
import { Input } from '@nextui-org/react'
import { SearchIcon } from './SeachIcon'
import { useRouter } from 'next/navigation'

interface Props {
  onSearch?: (string: string) => void
}

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [search, setSearch] = React.useState<string>('')
  const router = useRouter()

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.toString())
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push(`/vehicles?query=${search}`)
    onSearch?.(search)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className=' text-default-800 flex items-center justify-center  rounded-2xl'>
        <Input
          radius='lg'
          value={search}
          onChange={handleSearch}
          type='search'
          className='outline-none focus:outline-none active:outline-none'
          classNames={{
            label: 'text-white/50 dark:text-white/90',
            input: [
              'bg-white',
              'sm',
              'text-black/90 dark:text-black/90',
              'border-none ',
              'placeholder:text-default-700/50 dark:placeholder:text-white/60'
            ],
            innerWrapper: 'bg-transparent',
            inputWrapper: [
              'bg-default-100',
              'dark:bg-default/60',
              'backdrop-blur-xl',
              'backdrop-saturate-200',
              'hover:bg-default-200/70',
              'dark:hover:bg-default/70',
              'group-data-[focused=true]:bg-default-200/50',
              'dark:group-data-[focused=true]:bg-default/60',
              '!cursor-text'
            ]
          }}
          placeholder=' Type to search...'
          startContent={
            <SearchIcon className='pointer-events-none flex-shrink-0  text-black/50 text-slate-400 dark:text-white/90' />
          }
        />
      </div>
    </form>
  )
}

export default SearchBar
