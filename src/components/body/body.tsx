import { Outlet } from 'react-router-dom';
import LoaderComponent from '../loader/loader';

export default function BodyComponent() {
  return (
    <>
      <div className="body-container h-100">
        <LoaderComponent />
        <Outlet />
      </div>
    </>
  );
}
