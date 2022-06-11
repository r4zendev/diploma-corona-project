import { ReactElement } from 'react';

import { SkeletonWrapperStyled } from './skeleton.styled';

export interface SkeletonProps {
  navbar: ReactElement;
  children: ReactElement | ReactElement[];
}

export function Skeleton({ navbar, children }: SkeletonProps) {
  return (
    <SkeletonWrapperStyled>
      {navbar}
      {children}
    </SkeletonWrapperStyled>
  );
}
