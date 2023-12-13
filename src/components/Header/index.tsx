import { FC } from 'react';
import './Header.scss';

export const Header: FC = () => {
  return (
    <header className="header">
      <h1 className="title">Aleksandr Hradovich | Portfolio</h1>
      <span className="subtitle">front-end developer</span>
    </header>
  );
};
