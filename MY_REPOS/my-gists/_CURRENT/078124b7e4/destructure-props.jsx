function NavLinks({ hello, color }) {
  return (
    <ul>
      <li>
        <a href="/hello">{hello}</a>
      </li>
      <li className="selected">
        <a href="/pets">Pets</a>
      </li>
      <li>
        <a href="/owners">Owners</a>
      </li>
    </ul>
  );
}
