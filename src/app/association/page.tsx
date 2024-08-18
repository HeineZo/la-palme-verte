import { User } from '@/class/User.class';
import BecomeMember from '@/shared/components/BecomeMember.component';
import MemberCard from '@/shared/components/MemberCard.component';
import Timeline from '@/shared/layout/Timeline.layout';
import Counter from '@/shared/utils/Counter.component';
import Reveal from '@/shared/utils/Reveal.component';
import { Image } from '@nextui-org/image';
import { Link } from '@nextui-org/link';
import { IconMail, IconMapPin } from '@tabler/icons-react';
import { differenceInCalendarYears } from 'date-fns';
import { getStaffMembers } from 'server/user';
import timelineEvents from './assets/timeline-events.json';

/**
 * Page de présentation de l'association
 */
export default async function Page() {
  const staffMembers: User[] = await getStaffMembers();

  return (
    <main>
      <section className="section flex justify-between section gap-20 mt-28 flex-col lg:flex-row">
        <h1>Qui sommes-nous ?</h1>
        <div className="flex flex-col gap-6 lg:w-1/2">
          <p>
            Notre aventure commence en 2005, à l’origine réservée au personnel
            et aux anciens étudiants de l’UBS, nous sommes une association à but
            non-lucratif dont l’objectif majeur est de favoriser la connaissance
            de la biodiversité subaquatique par le biais de différentes
            activités (soirées de bio marines, sorties ornithologiques,
            plongées).
          </p>
          <p>
            Nous souhaitons également intervenir dans différentes actions
            d'éco-citoyenneté et sensibiliser le public à la protection de la
            biodiversité marine (nettoyages de plages, soirées caritatives).
            Aujourd’hui, nous sommes ouverts à tous les étudiants de l’UBS et
            nous vous attendons avec impatience !
          </p>
        </div>
      </section>
      <section className="flex w-full justify-center items-center section">
        <Image
          alt="Photo de groupe"
          src="/assets/association/photo_groupe.png"
        />
      </section>
      <section className="section flex justify-center w-screen bg-highlight bg-[url('/logo-white.svg')] bg-cover bg-center bg-blend-screen">
        <div className="flex w-3/4 justify-between flex-col lg:flex-row">
          <h4 className="text-center lg:text-left lg:text-5xl">
            Une association qui traverse les générations
          </h4>
          <div className="lg:w-1/2">
            <Timeline events={timelineEvents} />
          </div>
        </div>
      </section>
      <section className="flex justify-between lg:mx-10 section gap-20 flex-col lg:flex-row rounded-medium bg-primary-100 mt-20">
        <div className="flex flex-col gap-10 lg:w-1/2 px-10">
          <div>
            <h2>Quelques chiffres</h2>
            <p>
              Depuis la création de l’association, nous ne cessons de réaliser
              des événements et des ateliers pour permettre de sensibiliser à la
              protection de l’environnement marin.
            </p>
          </div>
          <div className="flex flex-col gap-10">
            <div className="flex gap-6 w-full justify-between">
              <span className="flex flex-col gap-2 w-1/2">
                <Counter
                  fontStyle="text-4xl lg:text-5xl font-heading font-bold"
                  value={20}
                />
                <Reveal>
                  <p>Ateliers réalisés</p>
                </Reveal>
              </span>
              <span className="flex flex-col gap-2 w-1/2">
                <Counter
                  fontStyle="text-4xl font-heading font-bold"
                  value={differenceInCalendarYears(
                    new Date(),
                    new Date(2005, 1, 1),
                  )}
                />
                <Reveal>
                  <p>Années d'expérience</p>
                </Reveal>
              </span>
            </div>
            <div className="flex gap-6 w-full justify-between">
              <span className="flex flex-col gap-2 w-1/2">
                <Counter
                  fontStyle="text-4xl font-heading font-bold"
                  className="*:text-black"
                  suffix="€"
                  value={700}
                />
                <Reveal>
                  <p>Récoltés pour la protection de la faune maritime</p>
                </Reveal>
              </span>
              <span className="flex flex-col gap-2 w-1/2">
                <Counter
                  fontStyle="text-4xl font-heading font-bold"
                  value={59} //TODO: remplacer par une méthode getAdherentCount()
                />
                <Reveal>
                  <p>Adhérents</p>
                </Reveal>
              </span>
            </div>
          </div>
        </div>
      </section>
      <div className="section flex flex-col text-center items-center gap-20">
        <div className="flex flex-col gap-6">
          <h1>L'équipe</h1>
          <p>
            Le coeur de l'association bat au rythme des membres d'une jeune
            équipe talentueuse et motivée.
          </p>
        </div>
        <div className="flex flex-wrap gap-8 lg:gap-12 justify-center">
          {staffMembers.map((member, index) => (
            <MemberCard key={index} member={member} />
          ))}
        </div>
        <BecomeMember
          buttonTitle="Candidater"
          showInfiniteLoop={false}
          subtitle="Faites nous part de votre candidature et participez à une association dynamique"
          title="Vous souhaitez nous rejoindre ?"
        />
      </div>
      <div className="flex justify-between flex-col section gap-5">
        <div className="flex justify-between flex-col lg:flex-row gap-10 mb-10">
          <div>
            <h1>Contactez-nous</h1>
            <p className="break-word">
              Une question, une remarque, un avis ? Venez-nous en parler par
              message ou en personne !
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <IconMapPin />
              <div>
                <h6>Email</h6>
                <Link
                  color="foreground"
                  href={`mailto:${process.env.NEXT_PUBLIC_MAIL}`}
                  underline="hover"
                >
                  lapalmeverte.association@gmail.com
                </Link>
              </div>
            </div>
            <div className="flex gap-4">
              <IconMail />
              <div>
                <h6>Localisation</h6>
                <Link
                  href="https://www.google.com/maps?ll=47.645279,-2.746143&z=14&t=m&hl=fr&gl=FR&mapclient=embed&cid=15593355113507095576"
                  isExternal
                  showAnchorIcon
                >
                  Université Bretagne Sud - Vannes 56000
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <iframe
            className="rounded-medium"
            height="500"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10752.05926845766!2d-2.7461428!3d47.6452789!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48101e9be97d2849%3A0xd866b9dbcd1c8418!2sUniversit%C3%A9%20de%20Bretagne%20Sud%20UBS!5e0!3m2!1sfr!2sfr!4v1696194379296!5m2!1sfr!2sfr"
            title="Où sommes-nous ?"
            width="100%"
          />
        </div>
      </div>
    </main>
  );
}
