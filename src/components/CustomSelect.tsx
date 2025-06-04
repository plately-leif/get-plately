import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

type Option = {
  value: string;
  label: string;
  description?: string;
};

type CustomSelectProps = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  label: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
};

export default function CustomSelect({
  options,
  value,
  onChange,
  label,
  required = false,
  placeholder = 'Select an option',
  className = '',
}: CustomSelectProps) {
  const selectedOption = options.find((option) => option.value === value) || { value: '', label: placeholder };

  return (
    <div className={`w-full ${className}`}>
      <Listbox value={value} onChange={onChange}>
        {({ open }) => (
          <>
            <Listbox.Label className="block text-sm font-medium text-gray-700 mb-1">
              {label} {required && <span className="text-red-500">*</span>}
            </Listbox.Label>
            <div className="relative">
              <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-3 pl-4 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-accent/50 sm:text-sm sm:leading-6">
                <span className="block truncate">{selectedOption.label}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
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
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {options.map((option) => (
                    <Listbox.Option
                      key={option.value}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-accent/10 text-accent' : 'text-gray-900'
                        }`
                      }
                      value={option.value}
                    >
                      {({ selected }) => (
                        <>
                          <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                            {option.label}
                          </span>
                          {option.description && (
                            <span className="block text-xs text-gray-500 mt-0.5">
                              {option.description}
                            </span>
                          )}
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-accent">
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
    </div>
  );
}
