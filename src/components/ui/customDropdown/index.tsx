import React, { useEffect, useState, useRef } from 'react';
import styles from './Dropdown.module.scss';

declare type PageProps = {
  selected: string;
  // eslint-disable-next-line react/require-default-props
  classProps?: string;
  // eslint-disable-next-line react/require-default-props
  forNftList?: boolean | undefined;
  lists: string[];
  handleSelect: (item: string) => void;
};

const CustomDropdown = ({
  selected,
  classProps,
  forNftList = false,
  lists,
  handleSelect,
}: PageProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: any) => {
    if (headerRef.current && !headerRef.current.contains(event.target)) {
      if (isOpen) setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, false);
    return () => {
      document.removeEventListener('click', handleClickOutside, false);
    };
  });

  return (
    <div
      className={`relative ${classProps} flex justify-ccenter items-center text-sm z-10`}
    >
      <button
        type="button"
        id="menu-button"
        className={`flex justify-around items-center ${forNftList ? styles.list : styles.button}`}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <div className="text-white">{selected}</div>
        <div>
          {forNftList ? <img src="img/arrow down.png" alt="arrowdown" /> : <img src="img/dropdown.png" alt="arrowdown" />}
        </div>
      </button>

      {isOpen && (
        <div
          className={forNftList ? styles.dropdown1 : styles.dropdown}
          role="menu"
          ref={headerRef}
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1 text-white" role="none">
            {lists &&
              lists.map((list: string, index: number) => (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a
                  href="#"
                  className={`font-dropdown block px-4 ${forNftList ? 'py-2' : 'py-4'}`}
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

export default CustomDropdown;