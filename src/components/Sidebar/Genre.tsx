import { useState, useContext } from 'react';

import GlobalContext from '../../store/global-store';

interface GenreProps {
  id: number;
  name: string;
}

const Genre = ({ id, name }: GenreProps) => {
  const [isActive, setIsActive] = useState(false);
  const ctx = useContext(GlobalContext);

  const toggleActiveState = () => {
    setIsActive((currentlyActive) => !currentlyActive);
    ctx.activateSearchButton();
    ctx.toggleGenre(id);
  };

  return (
    <li
      className={`genre ${isActive ? 'active' : ''}`}
      onClick={toggleActiveState}
    >
      {name}
    </li>
  );
};

export default Genre;
