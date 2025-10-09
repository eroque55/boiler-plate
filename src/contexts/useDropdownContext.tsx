import { usePathname } from 'expo-router';
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

type ContextValues = {
  dropDownKey: string;
  setDropDownKey: Dispatch<SetStateAction<string>>;
};

const Context = createContext({} as ContextValues);

export const DropdownProvider = ({ children }: PropsWithChildren) => {
  const pathName = usePathname();

  const [dropDownKey, setDropDownKey] = useState<string>('');

  useEffect(() => {
    if (dropDownKey) {
      setDropDownKey('');
    }
  }, [pathName]);

  return (
    <Context.Provider value={{ dropDownKey, setDropDownKey }}>
      {children}
    </Context.Provider>
  );
};

export const useDropdown = () => useContext(Context);
