function NavBar() {
  const world = 'world';
  return (
    <nav>
      <h1>Pet App</h1>
      //props passes as a variable
      <NavLinks hello={world} />
    </nav>
  );
}