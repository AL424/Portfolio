import { FC } from 'react';
import './Contacts.scss';

export const Contacts: FC = () => {
  return (
    <div className="contacts">
      <ul className="contacts__list">
        <li className="contacts__item">
          <a
            href="https://drive.google.com/file/d/1JlpLl_DDPEg0awD75zUsRYEykokVtvho/view"
            className="contacts__link contact"
            target="_blank"
          >
            MY CV
          </a>
        </li>
        <li className="contacts__item">
          <a href="tel:+375336632585" className="contacts__link contact">
            +375(33)663-25-85
          </a>
        </li>
        <li className="contacts__item">
          <a
            href="mailto:algr5113@gmail.com"
            className="contacts__link contact"
          >
            algr5113@gmail.com
          </a>
        </li>
        <li className="contacts__item">
          <a
            href="https://github.com/AL424"
            className="contacts__link contact"
            target="_blank"
          >
            GitHub
          </a>
        </li>
      </ul>
    </div>
  );
};
