"use client";
import { Accordion, AccordionItem, Button, cn } from "@nextui-org/react";

// TODO: Faire un fichier de type dédié
interface QuestionFAQ {
  title: string;
  content: string;
}

interface FAQProps {
  questions: QuestionFAQ[];
  title?: string;
  description?: string;
  className?: React.ComponentProps<"div">["className"];
}

/**
 * Questions fréquemment posés
 */
export default function FAQ({
  questions,
  title = "Vous avez des questions ?",
  description = "Les questions que l'on nous pose le plus souvent",
  className,
}: FAQProps) {
  return (
    <div className={cn("section flex flex-col py-16 gap-14 max-w-7xl w-full", className)}>
      <div className="flex flex-col gap-4 items-center">
        <h2 className="text-center">{title}</h2>
        <p className="text-center">{description}</p>
      </div>

      <Accordion variant="bordered">
        {questions.map(({ title, content }, index) => (
          <AccordionItem
            key={index}
            aria-label={`Accordion ${index}`}
            title={title}
            classNames={{ title: "font-body", indicator: "text-medium" }}
          >
            {content}
          </AccordionItem>
        ))}
      </Accordion>

      <div className="flex flex-col gap-6 items-center">
        <div className="flex flex-col gap-4">
          <h4 className="text-center">
            Encore des questions ?
          </h4>
          <p className="text-center">
            Envoyez-nous un message, nous vous répondrons dans les plus brefs
            délais
          </p>
        </div>
        <Button color="secondary" className="text-accent w-fit">
          Contactez-nous
        </Button>
      </div>
    </div>
  );
}
