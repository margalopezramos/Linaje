export type FaqItem = { question: string; answer: string };

export default function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-ink/10 border-t border-b border-ink/10">
      {items.map((item) => (
        <details key={item.question} className="group py-5">
          <summary className="flex cursor-pointer items-center justify-between font-display text-lg text-ink list-none">
            {item.question}
            <span className="text-gold-dark text-xl group-open:rotate-45 transition-transform">+</span>
          </summary>
          <p className="mt-3 text-stone max-w-prose">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
