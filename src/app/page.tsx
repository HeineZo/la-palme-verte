import { Button } from "@nextui-org/button";
import { IconChevronRight } from "@tabler/icons-react";

export default function Accueil() {
  return (
    <main className="h-screen">
      <Button color="primary" endContent={<IconChevronRight />}>
        Découvrir plus
      </Button>
	  <p className="text-primary">test</p>
	  <h1 className="font-heading">Test</h1>
    </main>
  );
}
