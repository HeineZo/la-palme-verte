'use client';

import { FAQ as FAQType } from '@/class/FAQ.class';
import Button from '@/shared/theme/Button';
import { Accordion, AccordionItem, Link, cn } from '@nextui-org/react';
import React from 'react';

interface FAQProps {
  faq: FAQType[];
  title?: string;
  description?: string;
  className?: React.ComponentProps<'div'>['className'];
}

/**
 * Questions fréquemment posés
 * @param faq Questions à afficher
 * @param title Titre de la section *(optionnel)*
 * @param description Description de la section
 * @param className Classe tailwind à ajouter *(optionnel)*
 */
export default function FAQ({ faq, title, description, className }: FAQProps) {
  return (
    <div
      className={cn(
        'section flex flex-col py-16 gap-14 max-w-4xl w-full',
        className,
      )}
    >
      <div className="flex flex-col gap-4 items-center text-center">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      <Accordion variant="bordered">
        {faq.map(({ id, question, answer }) => (
          <AccordionItem
            aria-label={`Accordion ${id}`}
            classNames={{ title: 'font-body', indicator: 'text-medium' }}
            key={id}
            title={question}
          >
            {answer}
          </AccordionItem>
        ))}
      </Accordion>

      <div className="flex flex-col gap-6 items-center">
        <div className="flex flex-col gap-4 text-center">
          <h4>Encore des questions ?</h4>

          <p>
            Envoyez-nous un message, nous vous répondrons dans les plus brefs
            délais
          </p>
        </div>
        <Button
          className="text-accent w-fit"
          color="secondary"
          as={Link}
          href={`mailto:${process.env.NEXT_PUBLIC_MAIL}`}
        >
          Contactez-nous
        </Button>
      </div>
    </div>
  );
}
