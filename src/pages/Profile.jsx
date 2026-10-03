import { useState } from "react";
import { Navigate } from "react-router-dom";
import { ChevronsUpDown } from "lucide-react";
import { useLogout } from "../hooks/useLogout";
import { useProfile } from "../hooks/useProfile";
import { updatePassword } from "../services/apiAuth";

function Profile() {
  const [profileDraft, setProfileDraft] = useState(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const {
    data: profileData,
    isLoading,
    error: profileLoadError,
    saveProfile,
    isSaving,
    saveError,
    resetSave,
  } = useProfile();
  const {
    logout,
    isLoggingOut,
    error: logoutError,
  } = useLogout();

  function updateProfile(field, value) {
    setProfileDraft((current) => ({
      ...(current || profileData.profile),
      [field]: value,
    }));
    setMessage("");
    setPasswordError("");
    resetSave();
  }

  function handleSave(event) {
    event.preventDefault();
    setMessage("");
    setPasswordError("");
    saveProfile(profile, {
      onSuccess: () => setMessage("Your profile has been saved."),
    });
  }

  async function handleChangePassword(event) {
    event.preventDefault();
    setIsChangingPassword(true);
    setMessage("");
    setPasswordError("");

    try {
      await updatePassword(newPassword);
      setNewPassword("");
      setShowPasswordForm(false);
      setMessage("Your password has been changed.");
    } catch (updateError) {
      setPasswordError(updateError.message);
    } finally {
      setIsChangingPassword(false);
    }
  }

  function togglePasswordForm() {
    setShowPasswordForm((visible) => !visible);
    setPasswordError("");
    setMessage("");
  }

  if (isLoading) {
    return (
      <div
        aria-busy="true"
        aria-label="Loading profile"
        className="mx-auto min-h-screen max-w-7xl px-5 pb-12 pt-24 text-white sm:px-8"
      >
        <span className="sr-only">Loading your profile...</span>
        <div className="mb-7 animate-pulse motion-reduce:animate-none">
          <div className="h-8 w-48 rounded-lg bg-white/10" />
          <div className="mt-2 h-4 w-80 max-w-full rounded bg-white/[0.06]" />
        </div>
        <div className="grid animate-pulse gap-5 motion-reduce:animate-none lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="h-fit rounded-2xl border border-white/10 bg-[#141619]/90 p-5">
            <div className="flex flex-col items-center">
              <div className="size-16 rounded-full bg-white/10" />
              <div className="mt-3 h-5 w-32 rounded bg-white/10" />
              <div className="mt-2 h-3 w-28 rounded bg-white/[0.06]" />
            </div>
            <div className="mt-5 h-10 rounded-lg bg-white/[0.06]" />
          </aside>
          <div className="space-y-4">
            <section className="rounded-2xl border border-white/10 bg-[#141619]/90 p-5">
              <div className="mb-4 h-6 w-40 rounded bg-white/10" />
              <div className="grid gap-4 sm:grid-cols-2">
                {[0, 1, 2, 3].map((item) => (
                  <div key={item} className="space-y-2">
                    <div className="h-3 w-24 rounded bg-white/[0.06]" />
                    <div className="h-11 rounded-lg bg-white/[0.06]" />
                  </div>
                ))}
              </div>
            </section>
            <section className="rounded-2xl border border-white/10 bg-[#141619]/90 p-5">
              <div className="mb-4 h-6 w-52 rounded bg-white/10" />
              <div className="grid gap-4 sm:grid-cols-2">
                {[0, 1].map((item) => (
                  <div key={item} className="space-y-2">
                    <div className="h-3 w-28 rounded bg-white/[0.06]" />
                    <div className="h-11 rounded-lg bg-white/[0.06]" />
                  </div>
                ))}
              </div>
            </section>
            <div className="flex gap-2">
              <div className="h-10 w-32 rounded-lg bg-white/10" />
              <div className="h-10 w-40 rounded-lg bg-white/[0.06]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!profileData?.user || !profileData.profile) {
    if (profileLoadError) {
      return (
        <div role="alert" className="mx-auto max-w-7xl px-8 pt-28 text-red-300">
          {profileLoadError.message}
        </div>
      );
    }

    return <Navigate to="/Login" replace />;
  }

  const user = profileData.user;
  const profile = profileDraft || profileData.profile;
  const error =
    profileLoadError?.message ||
    saveError?.message ||
    logoutError?.message ||
    passwordError;

  const initials =
    `${profile.firstName[0] || ""}${profile.lastName[0] || ""}`
      .toUpperCase()
      .slice(0, 2) || "TA";

  const inputClassName =
    "h-11 w-full rounded-lg border border-white/10 bg-white/[0.06] px-3 text-sm text-white placeholder:text-white/40 focus:border-white/30 focus:outline-none";
  const labelClassName = "mb-1 block text-xs text-white/55";

  return (
    <div className="mx-auto min-h-screen max-w-7xl px-5 pb-12 pt-24 text-white sm:px-8">
      <header className="mb-7">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Your profile
        </h1>
        <p className="mt-1 text-sm text-white/50">
          A few details to make every cinema visit feel more like you.
        </p>
      </header>

      {error && (
        <p
          role="alert"
          className="mb-4 rounded-lg bg-red-400/10 p-3 text-sm text-red-300"
        >
          {error}
        </p>
      )}
      {message && (
        <p
          role="status"
          className="mb-4 rounded-lg bg-emerald-400/10 p-3 text-sm text-emerald-300"
        >
          {message}
        </p>
      )}

      <div className="grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="h-fit rounded-2xl border border-white/10 bg-[#141619]/90 p-5">
          <div className="flex flex-col items-center">
            <div className="flex size-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-xl font-semibold text-white/80">
              {initials}
            </div>
            <h2 className="mt-3 text-lg font-semibold">
              {`${profile.firstName} ${profile.lastName}`.trim() ||
                "Movie lover"}
            </h2>
            <p className="mt-2 text-xs text-white/40">Your cinema account</p>
          </div>
          <div className="mt-5 space-y-2">
            <button
              type="button"
              onClick={() => logout()}
              disabled={isLoggingOut}
              className="w-full rounded-lg border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm text-white/80 transition hover:bg-white/10 disabled:opacity-50"
            >
              {isLoggingOut ? "Signing out..." : "Sign out"}
            </button>
          </div>
        </aside>

        <form onSubmit={handleSave} className="space-y-4">
          <section
            id="personal-details"
            className="scroll-mt-24 rounded-2xl border border-white/10 bg-[#141619]/90 p-5"
          >
            <h2 className="mb-4 text-lg font-semibold">Personal details</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <label>
                <span className={labelClassName}>First name</span>
                <input
                  className={inputClassName}
                  value={profile.firstName}
                  onChange={(event) =>
                    updateProfile("firstName", event.target.value)
                  }
                  autoComplete="given-name"
                />
              </label>
              <label>
                <span className={labelClassName}>Last name</span>
                <input
                  className={inputClassName}
                  value={profile.lastName}
                  onChange={(event) =>
                    updateProfile("lastName", event.target.value)
                  }
                  autoComplete="family-name"
                  placeholder="Enter your last name"
                />
              </label>
              <label>
                <span className={labelClassName}>Email address</span>
                <input
                  className={`${inputClassName} cursor-not-allowed text-white/55`}
                  type="email"
                  value={user.email || ""}
                  readOnly
                  autoComplete="email"
                />
              </label>
              <label>
                <span className={labelClassName}>Phone number</span>
                <input
                  className={inputClassName}
                  type="tel"
                  value={profile.phone}
                  onChange={(event) =>
                    updateProfile("phone", event.target.value)
                  }
                  autoComplete="tel"
                  placeholder="+962  7X XXX XXXX"
                />
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-[#141619]/90 p-5">
            <h2 className="mb-4 text-lg font-semibold">
              Your cinema preferences
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <label>
                <span className={labelClassName}>Preferred city</span>
                <span className="group relative block">
                  <select
                    className={`${inputClassName} appearance-none bg-[#202226] pr-11 transition-colors hover:border-white/20 focus:border-white/40 focus:ring-2 focus:ring-white/10 [color-scheme:dark]`}
                    value={profile.preferredCity}
                    onChange={(event) =>
                      updateProfile("preferredCity", event.target.value)
                    }
                  >
                    <option className="bg-[#202226] text-white" value="Amman">
                      Amman
                    </option>
                    <option className="bg-[#202226] text-white" value="Irbid">
                      Irbid
                    </option>
                    <option className="bg-[#202226] text-white" value="Aqaba">
                      Aqaba
                    </option>
                    <option className="bg-[#202226] text-white" value="Zarqa">
                      Zarqa
                    </option>
                    <option className="bg-[#202226] text-white" value="Madaba">
                      Madaba
                    </option>
                  </select>
                  <span className="pointer-events-none absolute right-2 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-md bg-white/[0.06] text-white/55 transition-colors group-hover:bg-white/10 group-hover:text-white/80 group-focus-within:text-white">
                    <ChevronsUpDown aria-hidden="true" className="size-4" />
                  </span>
                </span>
              </label>
              <label>
                <span className={labelClassName}>Preferred cinema</span>
                <span className="group relative block">
                  <select
                    className={`${inputClassName} appearance-none bg-[#202226] pr-11 transition-colors hover:border-white/20 focus:border-white/40 focus:ring-2 focus:ring-white/10 [color-scheme:dark]`}
                    value={profile.preferredCinema}
                    onChange={(event) =>
                      updateProfile("preferredCinema", event.target.value)
                    }
                  >
                    <option
                      className="bg-[#202226] text-white"
                      value="TAJ Mall"
                    >
                      TAJ Mall
                    </option>
                    <option
                      className="bg-[#202226] text-white"
                      value="Mecca Mall"
                    >
                      Mecca Mall
                    </option>
                    <option
                      className="bg-[#202226] text-white"
                      value="Abdali Mall"
                    >
                      Abdali Mall
                    </option>
                    <option
                      className="bg-[#202226] text-white"
                      value="City Mall"
                    >
                      City Mall
                    </option>
                    <option
                      className="bg-[#202226] text-white"
                      value="The Galleria Mall"
                    >
                      The Galleria Mall
                    </option>
                    <option
                      className="bg-[#202226] text-white"
                      value="Baraka Mall"
                    >
                      Baraka Mall
                    </option>
                    <option
                      className="bg-[#202226] text-white"
                      value="Irbid City Center"
                    >
                      Irbid City Center
                    </option>
                    <option
                      className="bg-[#202226] text-white"
                      value="Aqaba City Center"
                    >
                      Aqaba City Center
                    </option>
                  </select>
                  <span className="pointer-events-none absolute right-2 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-md bg-white/[0.06] text-white/55 transition-colors group-hover:bg-white/10 group-hover:text-white/80 group-focus-within:text-white">
                    <ChevronsUpDown aria-hidden="true" className="size-4" />
                  </span>
                </span>
              </label>
            </div>
          </section>

          <div className="flex flex-wrap gap-2">
            <button
              type="submit"
              disabled={isSaving}
              className="min-w-32 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-[#111214] transition hover:bg-white/85 disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save changes"}
            </button>
            <button
              type="button"
              onClick={togglePasswordForm}
              className="rounded-lg border border-white/10 bg-white/[0.05] px-5 py-2.5 text-sm text-white/80 transition hover:bg-white/10"
            >
              {showPasswordForm ? "Cancel" : "Change password"}
            </button>
          </div>

          {showPasswordForm && (
            <section className="rounded-2xl border border-white/10 bg-[#141619]/90 p-5">
              <h2 className="mb-3 text-lg font-semibold">Change password</h2>
              <label className="block max-w-md">
                <span className={labelClassName}>New password</span>
                <input
                  className={inputClassName}
                  type="password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
              </label>
              <button
                type="button"
                onClick={handleChangePassword}
                disabled={isChangingPassword || newPassword.length < 8}
                className="mt-3 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[#111214] transition hover:bg-white/85 disabled:opacity-50"
              >
                {isChangingPassword ? "Updating..." : "Update password"}
              </button>
            </section>
          )}
        </form>
      </div>
    </div>
  );
}

export default Profile;
