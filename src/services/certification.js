export function getCertification(pgDetails) {
  const pgResults = pgDetails.results?.find((item) => item.iso_3166_1 === "US");

  return (
    pgResults?.release_dates?.find((item) => item.certification)
      ?.certification || "N/A"
  );
}
