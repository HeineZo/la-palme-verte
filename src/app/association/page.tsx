import { EmblaCarousel } from "@/components/EmblaCarousel";
import TimelineMark from "@/components/TimelineMark";
import { EmblaOptionsType } from "embla-carousel-react";

export default async function Page() {
  const options: EmblaOptionsType = {};
  const slide_count = 3;
  const slides = Array.from(Array(slide_count).keys());

  return (
    <div className="flex flex-col gap-20 px-32 pt-12">
      <div className="flex justify-between">
        <div className="w-5/12">
          <p>Introduction</p>
          <h1>Notre vision</h1>
        </div>
        <div className="flex flex-col gap-6 w-2/4">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            varius faucibus massa sollicitudin amet augue. Nibh metus a semper
            purus mauris duis. Lorem eu neque, tristique quis duis. Nibh
            scelerisque ac adipiscing velit non nulla in amet pellentesque.
          </p>
          <p>
            Sit turpis pretium eget maecenas. Vestibulum dolor mattis
            consectetur eget commodo vitae. Amet pellentesque sit pulvinar lorem
            mi a, euismod risus rhoncus. Elementum ullamcorper nec, habitasse
            vulputate. Eget dictum quis est sed egestas tellus, a lectus. Quam
            ullamcorper in fringilla arcu aliquet fames arcu.
          </p>
          <p>
            Lacinia eget faucibus urna, nam risus nec elementum cras porta. Sed
            elementum, sed dolor purus dolor dui. Ut dictum nulla pulvinar
            vulputate sit sagittis in eleifend dignissim. Natoque mauris cras
            molestie velit. Maecenas eget adipiscing quisque viverra lectus
            arcu, tincidunt ultrices pellentesque.
          </p>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="w-5/12">
          <p>Chronologie</p>
          <h1>Une association qui traverse les générations</h1>
        </div>
        <div className="flex flex-col w-2/4">
          <TimelineMark
            year={2005}
            title="Création de l'association"
            text="Un groupe d'étudiants de l'UBS de Vannes décide 
                        de créer une association pour sensibiliser le public 
                        à la protection des fonds marins. La Palme Verte est née."
          />
          <TimelineMark
            year={2008}
            title="L'équipe s'agrandit"
            text="5 nouveaux membres rejoignent l'association."
          />
          <TimelineMark
            year={2009}
            title="Premier site web"
            text="L'association se dote d'un site web pour étendre sa visibilité. Créé par Alain, il est toujours en ligne aujourd'hui."
          />
          <TimelineMark
            year={2015}
            title="Plus de 20 adhérents"
            text="L'association franchit le cap des 20 adhérents. Elle est désormais reconnue dans le milieu associatif local."
          />
          <div className="flex h-44">
            <div className="w-1/12">
              {/* <div className="rounded-full bg-black"></div> */}
              <svg>
                <circle cx="20" cy="20" r="20" fill="green" />
              </svg>
            </div>
            <div className="flex flex-col gap-2">
              <p>2023</p>
              <h1 className="text-2xl">Refonte graphique</h1>
              <p>
                La Palme Verte fait peau neuve avec son nouveau logo et un site
                internet réimmaginé.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="w-5/12">
          <p>Informations</p>
          <h1>Quelques chiffres</h1>
          <p>
            Depuis la création de l’association, nous ne cessons de réaliser des
            événements et des ateliers pour permettre de sensibiliser à la
            protection de l’environnement marin.
          </p>
          <div className="grid grid-cols-2 gap-6 mt-12">
            <div>
              <h1>+20</h1>
              <p>Ateliers réalisés</p>
            </div>
            <div>
              <h1>18</h1>
              <p>Années d'expérience</p>
            </div>
            <div>
              <h1>300€</h1>
              <p>Récoltés pour la protection de la faune maritime</p>
            </div>
            <div>
              <h1>15</h1>
              <p>Adhérents</p>
            </div>
          </div>
        </div>
        <EmblaCarousel slides={slides} options={options} />
      </div>
    </div>
  );
}
