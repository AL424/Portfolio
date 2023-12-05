import { CSSProperties, FC } from 'react';
import { Project } from '../../types/Project';
import './Card.scss';

export const Card: FC<{ project: Project }> = ({ project }) => {
  const style: CSSProperties | undefined = project.bgColor
    ? {
        height: 'min-content',
      }
    : undefined;

  return (
    <article className="card">
      <img
        src={project.screen}
        alt={project.name}
        className="card__screen"
        style={style}
      />
      <div className="card__wrap">
        <div className="card__info">
          <h3 className="card__title">{project.name}</h3>
          <p className="card__description">{project.description}</p>
          <a href={project.task} className="card__task" target="_blank">
            Задание полностью
          </a>
          <div className="skills">
            {project.skills.map((skill) => (
              <img
                src={`/icon/${skill}.png`}
                alt={skill}
                title={skill}
                className="skill__icon"
                key={skill}
              />
            ))}
          </div>
        </div>
        <a href={project.deploy} className="btn btn_site" target="_blank">
          посетить сайт
        </a>
        <a href={project.code} className="btn btn_code" target="_blank">
          посмотреть код
        </a>
      </div>
    </article>
  );
};
