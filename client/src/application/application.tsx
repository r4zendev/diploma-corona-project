import { Navbar, Skeleton } from 'client/components';

import { Root } from './scenes';

export function Application() {
  return (
    <Skeleton navbar={<Navbar />}>
      <Root />
    </Skeleton>
  );
}
