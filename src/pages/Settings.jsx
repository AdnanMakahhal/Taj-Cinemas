import { useState } from "react";
import { Bell, Check, Globe, Monitor, Moon, SlidersHorizontal, Sun } from "lucide-react";

const themes = [
  { label: "Light", icon: Sun, selected: false, preview: "bg-[#f4f5f7]", line: "bg-[#c5cbd4]" },
  { label: "Dark", icon: Moon, selected: true, preview: "bg-[#11161b]", line: "bg-white/15" },
  { label: "System", icon: Monitor, selected: false, preview: "bg-[linear-gradient(90deg,#f4f5f7_50%,#11161b_50%)]", line: "bg-[#84909f]/50" },
];

function SettingsSection({ title, description, icon: Icon, children }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#141619]/90 p-5 sm:p-6">
      <div className="mb-5 flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white/65">
          <Icon aria-hidden="true" className="size-[18px]" strokeWidth={1.7} />
        </span>
        <div>
          <h2 className="text-base font-semibold">{title}</h2>
          <p className="mt-1 text-xs leading-5 text-white/45">{description}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function PreferenceToggle({ label, description, enabled }) {
  const [checked, setChecked] = useState(enabled);
  return (
    <div className="flex items-center justify-between gap-5 py-4 first:pt-0 last:pb-0">
      <div>
        <p className="text-sm font-medium text-white/85">{label}</p>
        <p className="mt-1 text-xs leading-5 text-white/45">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-label={label}
        aria-checked={checked}
        onClick={() => setChecked(!checked)}
        className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full border transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${checked ? "border-white/25 bg-white/80" : "border-white/15 bg-white/[0.06]"}`}
      >
        <span aria-hidden="true" className={`absolute top-0.5 size-[18px] rounded-full ${checked ? "left-[23px] bg-[#151b22]" : "left-0.5 bg-white/45"}`} />
      </button>
    </div>
  );
}

function PreferenceSelect({ label, children, value }) {
  const [selection, setSelection] = useState(value);
  return (
    <label className="block">
      <span className="mb-2 block text-xs text-white/55">{label}</span>
      <select value={selection} onChange={(event) => setSelection(event.target.value)} className="h-11 w-full cursor-pointer rounded-lg border border-white/10 bg-[#202226] px-3 text-sm text-white/75 opacity-100 focus-visible:outline-2 focus-visible:outline-white">
        {children}
      </select>
    </label>
  );
}

function Settings() {
  const [theme, setTheme] = useState("Dark");
  return (
    <div className="mx-auto min-h-screen max-w-7xl px-5 pb-12 pt-24 text-white sm:px-8">
      <header className="mb-7">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Settings</h1>
        </div>
        <p className="mt-2 text-sm text-white/50">Make your cinema experience feel more like you.</p>
      </header>

      <div className="grid items-start gap-5 lg:grid-cols-2">
        <SettingsSection title="Appearance" description="Choose the look you prefer." icon={Moon}>
          <fieldset aria-label="Color theme" className="grid grid-cols-3 gap-3">
            {themes.map(({ label, icon: Icon, preview, line }) => (
              <button key={label} type="button" aria-pressed={theme === label} onClick={() => setTheme(label)} className={`min-w-0 cursor-pointer rounded-xl transition focus-visible:outline-2 focus-visible:outline-white border p-2.5 text-left ${theme === label ? "border-white/40 bg-white/[0.06]" : "border-white/10 bg-white/[0.02]"}`}>
                <div aria-hidden="true" className={`mb-3 h-16 overflow-hidden rounded-md border border-white/10 p-2 sm:h-20 ${preview}`}>
                  <div className={`mb-2 h-2 w-3/5 rounded-sm ${line}`} />
                  <div className="grid grid-cols-3 gap-1">
                    {[0, 1, 2].map((item) => <div key={item} className={`h-8 rounded-sm sm:h-10 ${line}`} />)}
                  </div>
                </div>
                <span className="flex items-center justify-between gap-1">
                  <span className="flex items-center gap-1.5 text-xs text-white/75"><Icon aria-hidden="true" className="size-3.5 shrink-0" />{label}</span>
                  {theme === label && <Check aria-hidden="true" className="size-3.5 shrink-0 text-white" />}
                </span>
              </button>
            ))}
          </fieldset>
        </SettingsSection>

        <SettingsSection title="Language & region" description="Your preferred language and local details." icon={Globe}>
          <div className="grid gap-4 sm:grid-cols-2">
            <PreferenceSelect label="Language" value="en"><option value="en">English</option><option value="ar">Arabic</option></PreferenceSelect>
            <PreferenceSelect label="Region" value="JO"><option value="JO">Jordan</option><option value="AE">United Arab Emirates</option><option value="SA">Saudi Arabia</option></PreferenceSelect>
            <div className="sm:col-span-2"><PreferenceSelect label="Currency" value="JOD"><option value="JOD">JOD — Jordanian dinar</option><option value="USD">USD - US dollar</option><option value="AED">AED - UAE dirham</option></PreferenceSelect></div>
          </div>
        </SettingsSection>

        <SettingsSection title="Notifications" description="The updates you would like to receive." icon={Bell}>
          <div className="divide-y divide-white/[0.07]">
            <PreferenceToggle label="Booking reminders" description="A reminder before your next showtime." enabled />
            <PreferenceToggle label="Offers & promotions" description="Special prices and cinema offers." enabled={false} />
            <PreferenceToggle label="Email updates" description="Booking updates sent to your inbox." enabled />
          </div>
        </SettingsSection>

        <SettingsSection title="Accessibility & playback" description="A more comfortable way to browse." icon={SlidersHorizontal}>
          <div className="divide-y divide-white/[0.07]">
            <PreferenceToggle label="Reduce motion" description="Keep animations and transitions to a minimum." enabled={false} />
            <PreferenceToggle label="Larger text" description="Make page content easier to read." enabled={false} />
            <PreferenceToggle label="Autoplay trailers" description="Play movie trailers automatically." enabled={false} />
          </div>
        </SettingsSection>
      </div>
    </div>
  );
}

export default Settings;
