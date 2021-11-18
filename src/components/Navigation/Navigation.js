import { NavLink } from 'react-router-dom';
const Navigation = () => (
  <nav>
    <NavLink
      // className=""
      // activeClassName=""
      to="/"
      // exact
    >
      Главная
    </NavLink>
    <NavLink to="/authors">Авторы</NavLink>
    <NavLink to="/books">Книги</NavLink>
  </nav>
);
export default Navigation;
