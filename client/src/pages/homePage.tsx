import { NavLink } from "react-router-dom";
import styles from "../styles/homePage.module.css";

function homePage() {
  return (
    <>
      <div className={styles.maindiv}>
        <h1>
          Welcome to ARCADIA : The fusion of online retro gaming and authentic
          arcade fun
        </h1>
        <h2>Join the fun, play your favorite games, and earn rewards!</h2>
        <h3>
          Immerse yourself in the world of ARCADIA, your platform for fans of
          legendary arcade games. Play against your friends online and
          experience the thrilling challenges of the arcade era. With ARCADIA,
          every game you play online earns you bonus points. These points can be
          exchanged for free games in our physical ARCADIA arcade, where pixels
          come to life on original machines.
        </h3>
        <ul>
          <li>
            A vast collection of retro games to discover or rediscover online.
          </li>
          <li>
            A passionate community to share your exploits and take on
            challenges.
          </li>
          <li>
            A bridge between the virtual and the real: collect points and
            experience the arcade in person in our room.
          </li>
        </ul>
        <h2>
          🎮 Join ARCADIA now. Connect, play, win... and meet us indoors for
          authentic arcade fun! 🎮
        </h2>
        <NavLink to="/Gamelist" className="button-link">
          Suite
        </NavLink>
      </div>
    </>
  );
}

export default homePage;
