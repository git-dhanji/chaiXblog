import { Container, useDynamicTitle } from "../components";

const SECTIONS = [
  {
    heading: "Information we collect",
    body: "When you visit the site, we automatically collect certain information about your device, including your web browser, IP address, time zone, and some of the cookies installed on your device. As you browse, we collect information about the individual pages you view and what referred you to the site.",
  },
  {
    heading: "How we use your information",
    body: "We use the information we collect to operate and improve the blog, to communicate with you, and to keep the experience secure. We never sell your personal information to third parties.",
  },
];

const RULES = [
  "No spamming or advertising on the website.",
  "Respect other users and refrain from any form of harassment or hate speech.",
  "Do not distribute unauthorized content or engage in any illegal activities.",
  "Protect your account credentials and do not share them with others.",
];

export default function WebPolicy() {
  useDynamicTitle();
  return (
    <div className="py-14">
      <Container className="max-w-3xl">
        <span className="eyebrow">Legal</span>
        <h1 className="mt-2 font-display text-4xl font-bold text-fg">
          Privacy Policy
        </h1>
        <p className="mt-3 text-fg-muted">
          This Privacy Policy describes how your personal information is
          collected, used, and shared when you visit Inkwell.
        </p>

        <div className="mt-10 space-y-10">
          {SECTIONS.map((s) => (
            <section key={s.heading}>
              <h2 className="font-display text-2xl font-semibold text-fg">
                {s.heading}
              </h2>
              <p className="mt-3 leading-relaxed text-fg-muted">{s.body}</p>
            </section>
          ))}

          <section>
            <h2 className="font-display text-2xl font-semibold text-fg">
              Community rules
            </h2>
            <ul className="mt-4 space-y-3">
              {RULES.map((rule) => (
                <li key={rule} className="flex gap-3 text-fg-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {rule}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-fg">
              Copyright
            </h2>
            <p className="mt-3 leading-relaxed text-fg-muted">
              All content provided on this blog is for informational purposes
              only. This blog&apos;s content is the property of the blog owner
              and is protected by copyright law. You may not reproduce,
              distribute, or transmit any part of this blog without prior
              written permission.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
