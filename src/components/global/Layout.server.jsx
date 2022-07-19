/**
 * A server component that defines a structure and organization of a page that can be used in different parts of the Hydrogen app
 */
export function Layout({children}) {
  return (
    <div>
      <main role="main" id="mainContent">
        {children}
      </main>
    </div>
  );
}
