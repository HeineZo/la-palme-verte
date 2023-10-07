import BecomeMember from '@/shared/components/BecomeMember.component';
import { Avatar } from '@nextui-org/avatar';
import {
  IconBrandInstagram,
  IconBrandX,
  IconMail,
  IconMapPin,
} from '@tabler/icons-react';
import { Image } from '@nextui-org/image';
import Timeline from '@/shared/layout/Timeline.layout';
import timelineEvents from './assets/timeline-events.json';

type StaffMember = {
  name: string;
  role: string;
  photo: string;
  links?: {
    url: string;
    icon: React.ReactNode;
  }[];
};

/**
 * Page de présentation de l'association
 */
export default async function Page() {
  const staffMembers: StaffMember[] = [
    {
      name: 'Lilou',
      role: 'Graphiste',
      photo: 'https://picsum.photos/200/300',
      links: [
        {
          url: 'https://www.instagram.com/',
          icon: <IconBrandInstagram />,
        },
        {
          url: 'https://twitter.com/',
          icon: <IconBrandX />,
        },
        {
          url: 'mailto: ',
          icon: <IconMail />,
        },
      ],
    },
    {
      name: 'Myriam',
      role: 'Responsable communication',
      photo: 'https://picsum.photos/200/300',
      links: [
        {
          url: 'https://www.instagram.com/',
          icon: <IconBrandInstagram />,
        },
        {
          url: 'https://twitter.com/',
          icon: <IconBrandX />,
        },
        {
          url: 'mailto: ',
          icon: <IconMail />,
        },
      ],
    },
    {
      name: 'Louann',
      role: 'Responsable',
      photo: 'https://picsum.photos/200/300',
      links: [
        {
          url: 'https://www.instagram.com/',
          icon: <IconBrandInstagram />,
        },
        {
          url: 'https://twitter.com/',
          icon: <IconBrandX />,
        },
        {
          url: 'mailto: ',
          icon: <IconMail />,
        },
      ],
    },
    {
      name: 'Côme',
      role: 'Responsable communication',
      photo: 'https://picsum.photos/200/300',
      links: [
        {
          url: 'https://www.instagram.com/',
          icon: <IconBrandInstagram />,
        },
        {
          url: 'https://twitter.com/',
          icon: <IconBrandX />,
        },
        {
          url: 'mailto: ',
          icon: <IconMail />,
        },
      ],
    },
    {
      name: 'Mélissandre',
      role: 'Responsable',
      photo: 'https://picsum.photos/200/300',
      links: [
        {
          url: 'https://www.instagram.com/',
          icon: <IconBrandInstagram />,
        },
        {
          url: 'https://twitter.com/',
          icon: <IconBrandX />,
        },
        {
          url: 'mailto: ',
          icon: <IconMail />,
        },
      ],
    },
    {
      name: 'Valentine',
      role: 'Responsable',
      photo: 'https://picsum.photos/200/300',
      links: [
        {
          url: 'https://www.instagram.com/',
          icon: <IconBrandInstagram />,
        },
        {
          url: 'https://twitter.com/',
          icon: <IconBrandX />,
        },
        {
          url: 'mailto: ',
          icon: <IconMail />,
        },
      ],
    },
  ];

  return (
    <main>
      <section className="section flex justify-between section gap-20 mt-28 flex-col lg:flex-row">
        <div>
          <small>Introduction</small>
          <h1>Une association...</h1>
        </div>
        <div className="flex flex-col gap-6 lg:w-1/2">
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
      </section>
      <section className="section flex w-full justify-center items-center">
        <Image
          src="/assets/association/photo_groupe.png"
          alt="Photo de groupe"
        />
      </section>
      <div className="flex justify-between section gap-20 flex-col lg:flex-row">
        <div>
          <small>Chronologie</small>
          <h1>... Qui traverse les générations</h1>
        </div>
        <div className="flex flex-col lg:w-1/2">
          <Timeline events={timelineEvents} />
        </div>
      </div>
      <div className="flex justify-between section">
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
        {/* <PhotoCarrousel className="w-2/4" photos={slides} options={options} /> */}
      </div>
      <div className="section flex flex-col text-center items-center gap-20">
        <div className="flex flex-col gap-6">
          <h1>L'équipe</h1>
          <p>
            Le coeur de l'association bat au rythme des membres d'une jeune
            équipe talentueuse et motivée.
          </p>
        </div>
        <div className="flex flex-wrap gap-12 justify-center">
          {staffMembers.map((member) => (
            <div className="flex flex-col items-center py-6 gap-5 w-[400px] bg-accent-100 rounded-medium">
              <Avatar src={member.photo} size="lg" />
              <div>
                <p className="text-xl font-bold">{member.name}</p>
                <p>{member.role}</p>
              </div>
              <div className="flex gap-4 justify-center">
                {member.links?.map((link) => (
                  <a href={link.url} target="_blank" rel="noreferrer">
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <BecomeMember
          title="Vous souhaitez nous rejoindre ?"
          subtitle="Faites nous part de votre candidature et rejoignez une communauté grandissante"
          showInfiniteLoop={false}
          buttonTitle="Candidater"
        />
      </div>
      <div className="flex justify-between section">
        <div className="flex-col">
          <div className="mb-8">
            <div>
              <h1>Contactez-nous</h1>
              <p>
                Une question, une remarque, un avis ? Venez-nous en parler par
                message ou en personne !
              </p>
            </div>
          </div>
          <div className="flex mb-8 gap-3">
            <IconMapPin />
            <div>
              <h1 className="text-xl">Email</h1>
              <span className="align-middle">
                <a
                  className="underline"
                  href={`mailto:${process.env.NEXT_PUBLIC_MAIL}`}
                >
                  lapalmeverte.association@gmail.com
                </a>
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <IconMail />
            <div>
              <h1 className="text-xl">Localisation</h1>
              <p>Université Bretagne Sud - Vannes 56000</p>
            </div>
          </div>
        </div>
        <div>
          <iframe
            title="Où sommes-nous ?"
            className="rounded-medium"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10752.05926845766!2d-2.7461428!3d47.6452789!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48101e9be97d2849%3A0xd866b9dbcd1c8418!2sUniversit%C3%A9%20de%20Bretagne%20Sud%20UBS!5e0!3m2!1sfr!2sfr!4v1696194379296!5m2!1sfr!2sfr"
            width="1000"
            height="600"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </main>
  );
}
