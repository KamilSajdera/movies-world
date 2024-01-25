import { useLoaderData, json } from "react-router-dom";
import UserProfileMain from "../components/ProfilePerson/UserProfileMain";

const ProfilePage = () => {
  const fetchedPersonData = useLoaderData();

  const allPersonFilms =
    fetchedPersonData.known_for_department === "Acting"
      ? fetchedPersonData.movie_credits.cast
      : fetchedPersonData.movie_credits.crew;

  allPersonFilms.sort((a, b) => b.popularity - a.popularity);
  const topPersonFilms = allPersonFilms.slice(0, 10);

  const personData = {
    id: fetchedPersonData.id,
    name: fetchedPersonData.name,
    otherName: fetchedPersonData.also_known_as,
    img: fetchedPersonData.profile_path,
    birthday: fetchedPersonData.birthday || "-",
    deathday: fetchedPersonData.deathday,
    gender:
      fetchedPersonData.gender === 1
        ? "Female"
        : fetchedPersonData.gender === 2
        ? "Male"
        : fetchedPersonData.gender === 3
        ? "Non-binary"
        : "Not set",
    bio: fetchedPersonData.biography || "Sorry, we do not have a biography of this person.",
    birthplace: fetchedPersonData.place_of_birth || "-",
    popularity: fetchedPersonData.popularity,
    profession: fetchedPersonData.known_for_department,
    films: topPersonFilms,
    socials: {
      facebook: fetchedPersonData.external_ids.facebook_id,
      instagram: fetchedPersonData.external_ids.instagram_id,
      tiktok: fetchedPersonData.external_ids.tiktok_id,
      twitter: fetchedPersonData.external_ids.twitter_id,
    },
  };

  return <UserProfileMain personData={personData} />;
};

export const loader = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const profileId = searchParams.get("id");

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MDE2OTgxZDhmYWFkNWQxYzYxMTM4ZjBiM2ZkZWQ4MyIsInN1YiI6IjY1NGE2YWE0NmJlYWVhMDE0YjY5YmEyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RAp4YuNKXT0gyW8M0AhMQl2tIGrfPxe4jvUjxe4N-PY",
    },
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/person/${profileId}?append_to_response=movie_credits,external_ids&language=en-US`,
    options
  );

  if (!response.ok) {
    throw json(
      {
        message: "Could not fetch this profile.",
        desc: "Something went wrong while loading the person profile. This profile may not exist or some data couldn't be loaded.",
      },
      { status: 500 }
    );
  }

  return response;
};

export default ProfilePage;
