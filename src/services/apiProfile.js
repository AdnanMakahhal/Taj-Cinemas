import supabase from "./supabase";

export function getProfileValues(user) {
  const metadata = user.user_metadata || {};
  const fullName = metadata.fullName || metadata.full_name || "";
  const [firstName = "", ...lastNameParts] = fullName.split(" ");

  return {
    firstName: metadata.firstName || firstName,
    lastName: metadata.lastName || lastNameParts.join(" "),
    phone: metadata.phone || "",
    preferredCity: metadata.preferredCity || "Amman",
    preferredCinema:
      metadata.preferredCinema && metadata.preferredCinema !== "TAJ Cinemas"
        ? metadata.preferredCinema
        : "TAJ Mall",
  };
}

export async function getProfile() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  if (!user) return null;

  return { user, profile: getProfileValues(user) };
}

export async function saveProfile({ user, profile }) {
  if (!user) {
    throw new Error("You must be signed in to save your profile.");
  }

  const fullName = `${profile.firstName} ${profile.lastName}`.trim();
  const { data, error } = await supabase.auth.updateUser({
    data: {
      ...user.user_metadata,
      firstName: profile.firstName,
      lastName: profile.lastName,
      fullName,
      phone: profile.phone,
      preferredCity: profile.preferredCity,
      preferredCinema: profile.preferredCinema,
    },
  });

  if (error) throw new Error(error.message);

  return { user: data.user, profile: getProfileValues(data.user) };
}
