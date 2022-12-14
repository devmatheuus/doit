import ReactDOM from 'react-dom/client';

import { App } from 'App';

import { AppProvider } from 'contexts/index';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <AppProvider>
            <App />
        </AppProvider>
    </BrowserRouter>
);
