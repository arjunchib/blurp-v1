import { Message, useState, useInput, onInvoke } from "blurp";

// {
//   node: {
//     id: "ts21807",
//     objectType: "SHOW",
//     objectId: 21807,
//     content: {
//       fullPath: "/us/tv-show/hell-on-wheels",
//       title: "Hell on Wheels",
//       originalReleaseYear: 2011,
//       posterUrl: "/poster/247230488/{profile}/hell-on-wheels.{format}",
//       __typename: "ShowContent"
//     },
//     __typename: "Show"
//   },
//   __typename: "PopularTitlesEdge"
// },

export default function justwatch() {
  const query = useInput({
    name: "search",
    type: "string",
    required: true,
    description: "Movie to search for",
  });
  const [movie, setMovie] = useState("movie", "No movie found.");
  onInvoke(async () => {
    const res = await fetch("https://apis.justwatch.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        operationName: "GetSuggestedTitles",
        variables: {
          country: "US",
          language: "en",
          first: 4,
          filter: { searchQuery: query },
        },
        query:
          "query GetSuggestedTitles($country: Country!, $language: Language!, $first: Int!, $filter: TitleFilter) {\n  popularTitles(country: $country, first: $first, filter: $filter) {\n    edges {\n      node {\n        ...SuggestedTitle\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment SuggestedTitle on MovieOrShow {\n  id\n  objectType\n  objectId\n  content(country: $country, language: $language) {\n    fullPath\n    title\n    originalReleaseYear\n    posterUrl\n    fullPath\n    __typename\n  }\n  __typename\n}\n",
      }),
    });
    const data = await res.json();
    const { title, originalReleaseYear } =
      data.data.popularTitles.edges[0].node.content;
    setMovie(`${title} - ${originalReleaseYear}`);
    // FIX: why doesnt this work here? (probably useState hook)
    // console.log(movie, `${title} - ${originalReleaseYear}`);
  });
  return <Message>{movie}</Message>;
}
