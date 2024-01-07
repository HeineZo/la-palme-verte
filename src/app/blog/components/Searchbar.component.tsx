import { Input } from '@nextui-org/react';
import { IconSearch } from '@tabler/icons-react';

export default function Searchbar() {
  return (
    <Input
      className="max-w-[400px]"
      isClearable
      radius="full"
      classNames={{
        label: 'text-black/50',
        input: [
          'bg-transparent',
          'text-black/90',
          'placeholder:text-default-700/50',
        ],
      }}
      placeholder="Rechercher un article"
      startContent={<IconSearch size={18} stroke={1.5} />}
    />
  );
}
