import { useLoaderData } from "react-router-dom";
import SearchResults from "../components/SearchResults/SearchResults";

const SearchPage = () => {
  const data = useLoaderData();
  return <SearchResults results={data} />;
};

export default SearchPage;

export async function loader({ request }) {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("query");

  if (!searchTerm) return null;

  return searchTerm;
}
