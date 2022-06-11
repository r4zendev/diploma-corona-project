import { ReactElement } from 'react';

import { CardWrapperStyled } from './card.styled';

export interface CardProps {
  title: string;
  content: ReactElement | string;
}

export function Card({ title, content }: CardProps) {
  return (
    <CardWrapperStyled>
      {content}
      {title}
    </CardWrapperStyled>
  );
}
