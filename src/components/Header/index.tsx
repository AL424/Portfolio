import { FC } from 'react';
import './Header.scss';

export const Header: FC = () => {
  return (
    <header className="header">
      <h1 className="title">Александр Градович | Портфолио</h1>
      <span className="subtitle">front-end разработчик</span>
    </header>
  );
};
