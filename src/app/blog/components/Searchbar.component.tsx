import { Input } from '@nextui-org/react';
import { IconSearch } from '@tabler/icons-react';

export default function Searchbar() {
  return (
    <Input
      isClearable
      radius="full"
      placeholder="Rechercher un article"
      startContent={<IconSearch size={18} stroke={1.5} />}
    />
  );
}
