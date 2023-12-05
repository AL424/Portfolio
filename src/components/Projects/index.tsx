import { FC } from 'react';
import { projects } from '../../utils/projects';
import { Card } from '../Card';

export const Projects: FC = () => {
  return (
    <>
      {projects.map((project) => (
        <Card project={project} key={project.name} />
      ))}
    </>
  );
};
