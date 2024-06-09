import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { appStore } from './redux-utilities/store';
import { router } from './router/route';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(<App />);

export default function App() {
  return (
    <Provider store={appStore()}>
      <RouterProvider router={router} />
    </Provider>
  );
}
