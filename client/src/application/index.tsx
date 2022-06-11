import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

// import { Theme } from 'client/ui';

import { Application } from './application';
// import { Authorization } from './modules/authorization';

const ROOT_ELEMENT = document.querySelector('#root');

function Entry() {
  return (
    <BrowserRouter>
      {/* <Theme>
        <Authorization> */}
      <Application />
      {/* </Authorization>
      </Theme> */}
    </BrowserRouter>
  );
}

const Component = hot(Entry);

// const root = createRoot(ROOT_ELEMENT);
render(<Component />, ROOT_ELEMENT);
