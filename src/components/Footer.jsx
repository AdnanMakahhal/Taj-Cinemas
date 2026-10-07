import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";

const links = [
  { to: "/Movies", label: "Movies" },
  { to: "/Bookings", label: "My bookings" },
  { to: "/Offers", label: "Offers" },
];

function Facebook() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="size-[18px]">
      <path d="M14 22v-9h3l.5-4H14V7c0-1.2.4-2 2-2h2V1.4C17.4 1.2 16.2 1 15 1c-3 0-5 1.8-5 5v3H7v4h3v9h4Z" />
    </svg>
  );
}

function Instagram() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="size-[18px]">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="size-[18px]">
      <path d="M21 11.5a9 9 0 0 1-13.4 7.9L3 21l1.6-4.6A9 9 0 1 1 21 11.5Z" />
      <path d="m9 7-1 1c-.8.8.4 3.2 2.2 5s4.2 3 5 2.2l1-1-2.3-1.5-.9.9a8.5 8.5 0 0 1-2.9-2.9l.9-.9L9 7Z" />
    </svg>
  );
}

// Replace these examples with the cinema's official contact details.
const email = "hello@tajcinemas.example";
const phone = "+962 6 000 0000";
const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/", icon: Facebook, external: true },
  { label: "Instagram", href: "https://www.instagram.com/", icon: Instagram, external: true },
  { label: "WhatsApp", href: "https://www.whatsapp.com/", icon: WhatsAppIcon, external: true },
  { label: "Email", href: `mailto:${email}`, icon: Mail },
  { label: "Phone", href: "tel:+96260000000", icon: Phone },
];

const focusClass = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

function Footer() {
  return (
    <footer className="mt-8 shrink-0 border-t border-white/10 bg-[#0c0e11]/80 text-white">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid gap-8 py-8 sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr] lg:gap-16">
          <div>
            <Link to="/Home" aria-label="Taj Cinemas home" className={`inline-flex rounded-lg ${focusClass}`}>
              <img src="/Logo/logoTaj.png" alt="Taj Cinemas" width="44" height="44" className="size-11 object-contain" />
            </Link>
            <p className="mt-3 text-sm text-white/55">Great stories. Bigger moments.</p>
            <p className="mt-1 text-xs text-white/35">Your next cinema night starts here.</p>
          </div>

          <nav aria-label="Footer" className="flex flex-col items-start gap-3">
            <p className="mb-1 text-xs font-medium tracking-wider text-white/40">EXPLORE</p>
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`rounded text-sm text-white/65 transition-colors hover:text-white ${focusClass}`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="sm:col-span-2 lg:col-span-1 lg:justify-self-end">
            <p className="mb-4 text-xs font-medium tracking-wider text-white/40">LET'S CONNECT</p>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map(({ label, href, icon: Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  title={label}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className={`flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/65 transition-colors hover:border-white/25 hover:bg-white/10 hover:text-white ${focusClass}`}
                >
                  <Icon aria-hidden="true" className="size-[18px]" strokeWidth={1.7} />
                </a>
              ))}
            </div>
            <div className="mt-4 flex flex-col items-start gap-2 text-xs text-white/50">
              <a href="tel:+96260000000" className={`rounded transition-colors hover:text-white ${focusClass}`}>{phone}</a>
              <a href={`mailto:${email}`} className={`rounded transition-colors hover:text-white ${focusClass}`}>{email}</a>
              <span className="text-[11px] text-white/35">Example contact details · Jordan</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 border-t border-white/[0.07] py-5 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Taj Cinemas. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-3 text-white/55">
            <span>Privacy Policy</span>
            <span>Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
