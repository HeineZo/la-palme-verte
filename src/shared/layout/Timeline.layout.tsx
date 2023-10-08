/* eslint-disable react/no-unstable-nested-components */

'use client';

import React from 'react';
import { Accordion, AccordionItem, Divider, cn } from '@nextui-org/react';
import { IconMinus, IconPlus } from '@tabler/icons-react';

export type TimelineEvent = {
  date: string;
  title: string;
  description: string;
  active?: boolean;
};

type Props = {
  events: TimelineEvent[];
};

/**
 * Affiche une liste d'événements sous forme de timeline
 * @param events Liste des événements à ajouter
 */
export default function Timeline({ events }: Props) {
  return (
    <Accordion
      selectionMode="multiple"
      showDivider={false}
      disableIndicatorAnimation
      hideIndicator
    >
      {events?.map((event, index) => (
        <AccordionItem
          key={index}
          indicator={({ isOpen }) => (isOpen ? <IconMinus /> : <IconPlus />)}
          title={
            <div className="flex gap-10 p-5 rounded-medium hover:bg-default-50 transition-all">
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
                      'relative inline-flex rounded-full min-w-[48px] min-h-[48px] bg-highlight ring-2 ring-secondary',
                      event.active && 'bg-primary-500 ring-0',
                    )}
                  />
                </span>
                {index + 1 < events.length && (
                  <Divider orientation="vertical" className="h-full" />
                )}
              </div>
              <div className="flex flex-col gap-4">
                <small className="font-body font-normal">{event.date}</small>
                <h4>{event.title}</h4>
              </div>
            </div>
          }
          textValue={event.description}
        >
          <p className="ml-24">{event.description}</p>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
