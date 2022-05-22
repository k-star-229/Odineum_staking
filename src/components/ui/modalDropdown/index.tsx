import React, { useState } from 'react';

declare type PageProps = {
  selected: string;
  // eslint-disable-next-line react/require-default-props
  className?: string;
  lists: string[];
  handleSelect: (item: string) => void;
};

export const ModalDropdown = ({
  selected,
  className,
  lists,
  handleSelect,
}: PageProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`relative inline-block text-left text-white z-40 ${className}`}
    >
      {isOpen && (
        <div
          className="flex fixed inset-0 bg-red z-0"
          onClick={() => {
            setIsOpen(false);
          }}
         />
      )}
      <div className="z-50">
        <button
          type="button"
          className="inline-flex items-center justify-between w-full rounded-md px-4 py-2 bg-white text-lg font-dropdown hover:bg-gray-50 focus:outline-none bg-body"
          id="menu-button"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {selected}
          <svg
            className="-mr-1 ml-3 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="z-10 origin-topRight absolute right-0 mt-2 w-full min-w-max rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none bg-body"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            {lists &&
              lists.map((list: string, index: number) => (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a
                  href="#"
                  className="font-dropdown block px-4 py-2"
                  role="menuitem"
                  tabIndex={-1}
                  id={`menu-item-${index}`}
                  // eslint-disable-next-line react/no-array-index-key
                  key={`menu-item-${index}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSelect(list);
                    setIsOpen(false);
                  }}
                >
                  {list}
                </a>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
