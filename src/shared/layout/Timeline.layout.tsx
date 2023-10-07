'use client';

import React from 'react';
import { Accordion, AccordionItem, Divider, cn } from '@nextui-org/react';

export type TimelineEvent = {
  date: string;
  title: string;
  description: string;
  active?: boolean;
};

type Props = {
  events: TimelineEvent[];
};

export default function Timeline({ events }: Props) {
  return (
    <main>
      <Accordion selectionMode="multiple" showDivider={false} hideIndicator>
        {events?.map((event, index) => (
          <AccordionItem
            key={index}
            title={
              <div className="flex gap-10 p-5 rounded-medium hover:bg-default-50 transition-all">
                <span
                  className={cn(
                    'min-w-[48px] max-h-[48px] rounded-full bg-highlight',
                  )}
                />
                <div className="flex flex-col gap-4">
                  <small className="font-body font-normal">{event.date}</small>
                  <h4>{event.title}</h4>
                </div>
              </div>
            }
          >
            <p className="ml-24">{event.description}</p>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  );
}
