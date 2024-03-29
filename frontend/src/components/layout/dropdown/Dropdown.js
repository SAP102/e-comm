import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon, StarIcon } from '@heroicons/react/20/solid'

const people = [
    {
        id: 1,
        name: '1 star',
        avatar:
            <>
                {[0, 1, 2, 3, 4].map((rating, index) => (
                    <StarIcon
                        key={rating}
                        className={(
                            1 > rating ? 'text-yellow-400 w-[20px]' : 'text-gray-300 w-[20px]'

                        )}
                        aria-hidden="true"
                    />
                ))}
            </>
    },
    {
        id: 2,
        name: '2 star',
        avatar:
            <>
                {[0, 1, 2, 3, 4].map((rating, index) => (
                    <StarIcon
                        key={rating}
                        className={(
                            2 > rating ? 'text-yellow-400 w-[20px]' : 'text-gray-300 w-[20px]'

                        )}
                        aria-hidden="true"
                    />
                ))}
            </>
    },
    {
        id: 3,
        name: '3 star',
        avatar:
            <>
                {[0, 1, 2, 3, 4].map((rating, index) => (
                    <StarIcon
                        key={rating}
                        className={(
                            3 > rating ? 'text-yellow-400 w-[20px]' : 'text-gray-300 w-[20px]'

                        )}
                        aria-hidden="true"
                    />
                ))}
            </>
    },
    {
        id: 4,
        name: '4 star',
        avatar:
            <>
                {[0, 1, 2, 3, 4].map((rating, index) => (
                    <StarIcon
                        key={rating}
                        className={(
                            4 > rating ? 'text-yellow-400 w-[20px]' : 'text-gray-300 w-[20px]'

                        )}
                        aria-hidden="true"
                    />
                ))}
            </>
    },
    {
        id: 5,
        name: '5 star',
        avatar:
            <>
                {[0, 1, 2, 3, 4].map((rating, index) => (
                    <StarIcon
                        key={rating}
                        className={(
                            5 > rating ? 'text-yellow-400 w-[20px]' : 'text-gray-300 w-[20px]'

                        )}
                        aria-hidden="true"
                    />
                ))}
            </>
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Dropdwon({ selected, setSelected }) {

    return (
        <Listbox value={selected} onChange={setSelected}>
            {({ open }) => (
                <>
                    <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                            <span className="flex items-center">
                                {selected?.avatar}
                                <span className="ml-3 block truncate">{selected?.name}</span>
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                        </Listbox.Button>
                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {people.map((person) => (
                                    <Listbox.Option
                                        key={person.id}
                                        className={({ active }) =>
                                            classNames(
                                                active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                'relative cursor-default select-none py-2 pl-3 pr-9'
                                            )
                                        }
                                        value={person}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <div className="flex items-center">
                                                    {/* <img src={person?.avatar} alt="" className="h-6 w-6 flex-shrink-0 rounded-full" /> */}
                                                    {person?.avatar}
                                                    <span
                                                        className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                    >
                                                        {person.name}
                                                    </span>
                                                </div>
                                                {selected ? (
                                                    <span
                                                        className={classNames(
                                                            active ? 'text-white' : 'text-indigo-600',
                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                        )}
                                                    >
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    )
}
