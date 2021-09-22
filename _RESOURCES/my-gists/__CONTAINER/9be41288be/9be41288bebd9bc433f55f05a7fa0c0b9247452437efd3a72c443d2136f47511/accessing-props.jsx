function NavLinks(props) {
  return (
    <ul>
      <li>
        <a href='/hello'>{props.hello}</a>
      </li>
      <li className='selected'>
        <a href='/pets'>Pets</a>
      </li>
      <li>
        <a href='/owners'>Owners</a>
      </li>
    </ul>
  );
}