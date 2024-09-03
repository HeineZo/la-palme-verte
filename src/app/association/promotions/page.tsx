import { User } from '@/class/User.class';
import MemberCard from '@/shared/components/MemberCard.component';
import { ScrollShadow } from '@nextui-org/react';
import React from 'react';
import { getAllStaffMembers } from 'server/user';

export default async function Page() {
  const staffMembers: User[] = await getAllStaffMembers();

  // Organiser les utilisateurs par promotion
  const promotions: Record<string, User[]> = {};

  staffMembers.forEach((member) => {
    member.promotion.forEach((promo) => {
      promotions[promo] = promotions[promo] ?? [];
      promotions[promo].push(member);
    });
  });

    // Trier les promotions par date décroissante
    const sortedPromotions = Object.keys(promotions).sort((a, b) => b.localeCompare(a));

  return (
    <main>
      <section className="section flex flex-col pb-0">
        <h1>Promotions</h1>
        <p>Découvrez les membres des promotions précédentes de l'association</p>
      </section>
      {sortedPromotions.map((promo) => (
        <section key={promo} className="section flex flex-col gap-8 py-a">
          <h5 className='flex gap-2'>Promotion <span className='text-primary'>{promo}</span></h5>
          <ScrollShadow orientation='horizontal' className='flex overflow-x-auto overflow-y-hidden lg:flex-wrap gap-4'>
            {promotions[promo].map((member, index) => (
              <MemberCard key={index} member={member} />
            ))}
          </ScrollShadow>
        </section>
      ))}
    </main>
  );
}
