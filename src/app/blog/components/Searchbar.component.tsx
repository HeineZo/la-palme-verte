import { Input } from '@nextui-org/react';
import { IconSearch } from '@tabler/icons-react';
import { useState } from 'react';

interface SearchbarProps {
  onSearchChange: (searchValue: string) => void;
}

export default function Searchbar({ onSearchChange }: SearchbarProps) {
  const [searchValue, setSearchValue] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    onSearchChange(value);
  };

  return (
    <Input
      isClearable
      radius="full"
      placeholder="Rechercher un article"
      value={searchValue}
      onChange={handleChange}
      startContent={<IconSearch size={18} stroke={1.5} />}
    />
  );
}
