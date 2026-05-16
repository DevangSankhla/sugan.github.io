import { Link } from 'react-router-dom';

type FooterLink = { label: string; to: string; external?: boolean };
type FooterColumn = { label: string; links: FooterLink[] };

const columns: FooterColumn[] = [
  {
    label: 'Shop',
    links: [
      { label: 'All', to: '/shop' },
      { label: 'Kitchen', to: '/shop/kitchen' },
      { label: 'Living', to: '/shop/living' },
      { label: 'Pet', to: '/shop/pet' },
      { label: 'Bulk / Trade', to: '/bulk-orders' },
    ],
  },
  {
    label: 'Help',
    links: [
      { label: 'Shipping', to: '/shipping' },
      { label: 'Returns', to: '/returns' },
      { label: 'FAQ', to: '/faq' },
      { label: 'Privacy', to: '/privacy' },
    ],
  },
  {
    label: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Contact', to: '/contact' },
      { label: 'Account', to: '/account' },
    ],
  },
  {
    label: 'Connect',
    links: [
      { label: 'Instagram', to: 'https://www.instagram.com/wwwsuganshop/', external: true },
      { label: 'LinkedIn', to: 'https://www.linkedin.com/company/sugan-shop/', external: true },
      { label: 'contact@sugan.shop', to: 'mailto:contact@sugan.shop', external: true },
    ],
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-sugan-bone text-sugan-ink border-t border-sugan-ink/10">
      {/* Wordmark */}
      <div className="section-padding pt-[clamp(64px,10vw,160px)] pb-[clamp(48px,8vw,120px)]">
        <Link
          to="/"
          aria-label="Sugan home"
          className="block text-center font-logo font-semibold leading-none text-[clamp(96px,18vw,280px)] text-sugan-ink hover:text-sugan-gold transition-colors duration-400 ease-apple"
        >
          Sugan
          <span
            className="inline-block w-3 h-3 rounded-full bg-sugan-gold ml-2 align-middle translate-y-[-0.15em]"
            aria-hidden="true"
          />
        </Link>
      </div>

      {/* Hairline-separated columns */}
      <div className="border-t border-sugan-ink/10">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {columns.map((col, i) => (
            <div
              key={col.label}
              className={[
                'section-padding py-12',
                i > 0 ? 'md:border-l md:border-sugan-ink/10' : '',
                i % 2 === 1 ? 'border-l border-sugan-ink/10 md:border-l' : '',
              ].join(' ')}
            >
              <p className="text-eyebrow font-body uppercase text-sugan-ink-soft mb-5">
                {col.label}
              </p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.to}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body text-body-sm text-sugan-ink-soft hover:text-sugan-gold transition-colors duration-300"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.to}
                        className="font-body text-body-sm text-sugan-ink-soft hover:text-sugan-gold transition-colors duration-300"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-sugan-ink/10">
        <div className="section-padding py-6">
          <p className="font-body text-body-sm text-sugan-ink-soft tabular-nums flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
            <span>© {currentYear} Sugan</span>
            <span aria-hidden="true" className="hidden sm:inline text-sugan-ink/30">·</span>
            <span>GST 08AESFS0710D1Z5</span>
            <span aria-hidden="true" className="hidden sm:inline text-sugan-ink/30">·</span>
            <span>Made in Jodhpur</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
