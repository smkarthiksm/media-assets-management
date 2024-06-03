import HeaderComponent from '../header/header';
import './home.scss';
import BodyComponent from '../body/body';

export default function HomeComponent() {
  return (
    <div className="home-container h-100">
      <HeaderComponent />
      <BodyComponent />
    </div>
  );
}
