'use client'
import { BlogPost } from '@/class/BlogPost.class';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { IconSearch } from '@tabler/icons-react';
import { useState } from 'react';


interface SearchbarProps {
  onSearchChange: (searchValue: string) => void;
  onClick: (url: string) => void;
  searchList: BlogPost[];
}

export default function Searchbar({ onSearchChange, onClick, searchList }: SearchbarProps) {
  const [searchValue] = useState<string>('');
  
  /**
   * Lorsque le texte de recherche change
   * @param value Valeur du texte recherché
   */
  const handleChange = (value: string) => {
    onSearchChange(value);
  };

  return (
    <Autocomplete
      label="Rechercher un article"
      placeholder=""
      value={searchValue}
      defaultItems={searchList}
      onInputChange={handleChange}
      startContent={<IconSearch size={18} stroke={1.5} />}
    >
      {searchList.map((content) => (
          <AutocompleteItem key={content.title} value={content.description} onClick={() => { onClick(content.url); }}>
            {content.title}
          </AutocompleteItem>
        ))}
    </Autocomplete>
  );

}
