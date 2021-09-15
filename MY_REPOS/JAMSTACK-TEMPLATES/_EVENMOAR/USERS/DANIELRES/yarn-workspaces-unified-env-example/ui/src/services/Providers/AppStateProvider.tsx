import * as React from "react";
import { useQuery } from "urql";

const AppStateContext = React.createContext();

export const useAppState = () => React.useContext(AppStateContext);

const GET_USER = /* GraphQL */ `
  query getUser {
    user {
      id
      name
      email
      picture
      spaces {
        id
        shortId
        name
      }
    }
  }
`;

export default ({ children }) => {
  const [isSideMenuOpen, setIsSideMenuOpen] = React.useState(false);
  const [sideMenuContent, setSideMenuContent] = React.useState(null);
  const closeSideMenu = () => setIsSideMenuOpen(false);
  const toggleSideMenu = (content: "spaces" | "user" | null) => {
    setSideMenuContent(content);
    setIsSideMenuOpen(
      sideMenuContent === content && isSideMenuOpen ? false : true
    );
  };

  const [{ data, fetching }] = useQuery({ query: GET_USER });

  if (fetching) return <div>Loading user data...</div>;

  return (
    <AppStateContext.Provider
      value={{
        closeSideMenu,
        sideMenuContent,
        isSideMenuOpen,
        toggleSideMenu,
        user: data.user
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};
