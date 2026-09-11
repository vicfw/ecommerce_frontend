import UI_Typography from "@/components/ui/typography/UI_Typography";

export type LegalSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

type LegalDocumentProps = {
  title: string;
  intro?: string;
  sections: LegalSection[];
  footerNote: string;
};

export const LegalDocument = ({
  title,
  intro,
  sections,
  footerNote,
}: LegalDocumentProps) => {
  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-6 py-4 md:py-8 max-sm:pb-20">
      <UI_Typography
        component="h1"
        className="med16 text-foreground md:text-2xl"
      >
        {title}
      </UI_Typography>

      {intro ? (
        <UI_Typography
          component="p"
          className="reg14 leading-8 text-muted-foreground"
        >
          {intro}
        </UI_Typography>
      ) : null}

      {sections.map((section) => (
        <section key={section.title} className="flex flex-col gap-3">
          <UI_Typography component="h2" className="med16 text-foreground">
            {section.title}
          </UI_Typography>
          {section.paragraphs?.map((paragraph) => (
            <UI_Typography
              key={paragraph}
              component="p"
              className="reg14 leading-8 text-muted-foreground"
            >
              {paragraph}
            </UI_Typography>
          ))}
          {section.bullets?.length ? (
            <ul className="list-disc space-y-2 pr-5">
              {section.bullets.map((bullet) => (
                <li key={bullet}>
                  <UI_Typography
                    component="span"
                    className="reg14 leading-8 text-muted-foreground"
                  >
                    {bullet}
                  </UI_Typography>
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}

      <UI_Typography
        component="p"
        className="reg12 border-t border-border pt-4 leading-7 text-muted-foreground"
      >
        {footerNote}
      </UI_Typography>
    </article>
  );
};
