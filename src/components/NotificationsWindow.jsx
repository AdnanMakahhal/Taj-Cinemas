import { Bell, X } from "lucide-react";
import HeaderPanel from "./HeaderPanel";

function NotificationsWindow({ onClose }) {
  return (
    <HeaderPanel id="notifications-panel" labelledBy="notifications-heading">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
        <h2 id="notifications-heading" className="text-base font-semibold">Notifications</h2>
        <button autoFocus type="button" onClick={onClose} aria-label="Close notifications" className="flex size-9 items-center justify-center rounded-lg text-white/60 transition hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-white">
          <X aria-hidden="true" className="size-5" />
        </button>
      </div>
      <div className="flex flex-col items-center px-4 py-10 text-center">
        <div className="mb-4 flex size-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/45">
          <Bell aria-hidden="true" className="size-6" strokeWidth={1.5} />
        </div>
        <p className="font-medium">No notifications yet</p>
        <p className="mt-2 max-w-xs text-sm leading-6 text-white/50">Your cinema updates will appear here.</p>
      </div>
    </HeaderPanel>
  );
}

export default NotificationsWindow;
