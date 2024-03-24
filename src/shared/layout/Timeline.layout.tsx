'use client';

import React, { useState } from 'react';
import { Accordion, AccordionItem, Divider, cn } from '@nextui-org/react';
import { IconChevronUp } from '@tabler/icons-react';

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  active?: boolean;
}

interface TimelineProps {
  events: TimelineEvent[];
}

/**
 * Affiche une liste d'événements sous forme de timeline
 * @param events Liste des événements à ajouter
 */
export default function Timeline({ events }: TimelineProps) {
  const [accordionOpen, setAccordionOpen] = useState<boolean[]>(Array(events.length).fill(false));

  const toggleAccordion = (index: number) => {
    const newAccordionState = [...accordionOpen];
    newAccordionState[index] = !newAccordionState[index];
    setAccordionOpen(newAccordionState);
  };

  return (
    <Accordion
      disableIndicatorAnimation
      selectionMode="multiple"
      showDivider={false}
    >
      {events.map((event, index) => (
        <AccordionItem
          onPress={() => { toggleAccordion(index); }}
          hideIndicator
          key={index}
          textValue={event.description}
          title={
            <div className="flex gap-10 p-5 rounded-medium hover:backdrop-blur-md transition-all">
              <div className="flex flex-col items-center">
                <span className="relative flex min-w-[48px] min-h-[48px]">
                  <span
                    className={cn(
                      event.active &&
                      'animate-[ping_2s_infinite] absolute inline-flex h-full w-full rounded-full bg-primary-400',
                    )}
                  />
                  <span
                    className={cn(
                      'relative inline-flex rounded-full min-w-[48px] min-h-[48px] bg-accent-400 ring-2 ring-secondary',
                      event.active && 'bg-accent-700 ring-0',
                    )}
                  />
                </span>
                {index + 1 < events.length && (
                  <Divider className="h-full" orientation="vertical" />
                )}
              </div>
              <div className="flex flex-col gap-4">
                <small className="font-body font-normal">{event.date}</small>
                <span className='flex gap-2 flex-col sm:flex-row'>
                  <h5 className='text-2xl lg:text-4xl'>{event.title}</h5>
                  {accordionOpen[index] ?
                    <IconChevronUp className='transition duration-300 size-8' />
                    : <IconChevronUp className='transition duration-300 rotate-180 size-8' />
                  }
                </span>
                

              </div>
            </div>
          }
        >
          <p className="ml-24">{event.description}</p>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
