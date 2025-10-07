
import React from 'react';
import './AboutPage.css';

const teamMembers = [
  { name: 'Justin James Alviar', img: 'img/Alviar.png' },
  { name: 'Jayna Sahibui', img: 'img/Sahibul.png' },
  { name: 'Stephanie Villamor', img: 'img/villamor.png' },
  { name: 'John Lloyd Cimaco', img: 'img/Climaco.png' },
  { name: 'Vennashier Maiai', img: 'img/malali.png' },
];

const AboutPage = () => {
  return (
    <div className="about-container">
      <header>
        <div className="logo">MLX</div>
        <nav>
          <a href="#">Movies</a>
          <a href="#">Cast</a>
          <a className="active" href="#">About</a>
        </nav>
      </header>

      <main>
        <section className="about">
          <h1>About Us</h1>
          <p>
            <strong>Movie Library X</strong> is your trusted guide to the world of cinema.
            We’re not just another list, we are a carefully organized collection of films designed
            to spark discovery and appreciation. Every film you find here has been hand selected
            for its artistic and storytelling power. Whether you’re a casual viewer looking for a
            guaranteed great watch or a seasoned cinephile eager to uncover hidden gems,
            Movie Library X is the essential resource for building your perfect watchlist.
          </p>
        </section>

        <section className="gallery">
          <img src="img/Movie_library.jpg" alt="Movie Library Collage" />
        </section>

        <section className="team">
          <h2>Meet Our Team MLX</h2>
          <div className="team-members">
            {teamMembers.map((member, idx) => (
              <div className="member" key={idx}>
                <img src={member.img} alt={member.name} />
                <p>{member.name}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer>
        MLX © 2025 Copyrights Reserved
      </footer>
    </div>
  );
};

export default AboutPage;
