import FaHome from 'react-icons/lib/fa/home';
import FaInfo from 'react-icons/lib/fa/info';
import FaEnvelopeSquare from 'react-icons/lib/fa/envelope-square';
import FaListUl from 'react-icons/lib/fa/list-ul';

const menu = [
  { label: 'Home', to: '/', icon: FaHome },
  { label: 'Blog', to: '/blog', icon: FaListUl },
  { label: 'About', to: '/about', icon: FaInfo },
  { label: 'Contact', to: '/contact', icon: FaEnvelopeSquare },
];

export default menu;
