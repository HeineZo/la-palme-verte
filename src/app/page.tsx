import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { IconChevronRight } from "@tabler/icons-react";

export default function Home() {
  return (
    <main className="">
      <div className="flex gap-20 py-28 px-16 items-center justify-around">
        <div className="flex flex-col gap-6 md:w-3/4 lg:w-1/3 h-fit">
          <h1>Plongez au coeur de l'action</h1>
          <p>
            De 2005 à aujourd’hui, La Palme Verte n’a cessé de se réinventer et
            de sensibiliser le public sur l’importance de la préservation de nos
            fond-marins.
          </p>
          <Button
            color="primary"
            endContent={<IconChevronRight />}
            className="w-fit"
          >
            Découvrir l'association
          </Button>
        </div>
        <div className="hidden lg:flex gap-3">
          <div className="flex flex-col gap-7">
            <Image
              isZoomed
              width={200}
              height={270}
              alt="Image de fond marin"
              src="https://images.unsplash.com/photo-1559825481-12a05cc00344?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80"
            />
            <Image
              isZoomed
              width={200}
              height={300}
              alt="Image de fond marin"
              src="https://images.unsplash.com/photo-1565214975484-3cfa9e56f914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2127&q=80"
            />
          </div>
          <div className="flex flex-col gap-7">
            <Image
              isZoomed
              width={290}
              alt="Image de fond marin"
              src="https://images.unsplash.com/photo-1682687981603-ae874bf432f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
            />
            <Image
              isZoomed
              width={290}
              alt="Image de fond marin"
              src="https://images.unsplash.com/photo-1628630500614-1c8924c99c3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
