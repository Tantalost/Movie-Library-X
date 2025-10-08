import React from 'react';

const team = [
  { name: 'John Lloyd Climaco', role: 'Lead Developer', photo: 'src/image/2.png' },
  { name: 'Jayna Sahibul', role: 'Business Analyst', photo: 'src/image/4.png' },
  { name: 'Stephanie Villamor', role: 'Designer', photo: 'src/image/5.png' },
  { name: 'Justin James Alviar', role: 'Project Manager', photo: 'src/image/1.png' },
  { name: 'Vennasshierr Malali', role: 'Quality Assurance', photo: 'src/image/3.png' },
];

const About = () => {
  return (
    <div className="min-h-screen bg-teal-900 text-white">
      <section className="relative overflow-hidden">
        <div className="relative z-10 mx-auto max-w-5xl px-6 pt-12 pb-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">About Us</h1>
          <p className="text-white/90 text-base sm:text-lg leading-relaxed">
            <span className="font-semibold">Movie Library X</span> is your trusted guide to the world of cinema. We're not just
            another list, we are a carefully organized collection of films designed to spark discovery and appreciation.
            Whether you're a casual viewer looking for a guaranteed great watch or a seasoned cinephile eager to uncover hidden gems,
            Movie Library X is the essential resource for building your perfect watchlist.
          </p>
        </div>

        <div className="relative h-56 sm:h-72 md:h-80">
          <img
            src="src/image/cover.png"
            alt="Movie collage"
            className="absolute inset-0 h-full w-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-teal-900"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-teal-900/60 to-transparent"></div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-10">Meet Our Team MLX</h2>

          {/* Team Lead Highlight */}
          <div className="flex flex-col items-center mb-12 sm:mb-16">
            <img
              src={team[0].photo}
              alt={team[0].name}
              className="h-28 w-28 sm:h-32 sm:w-32 rounded-full ring-4 ring-white/20 shadow-xl object-cover"
            />
            <p className="mt-4 text-lg sm:text-xl font-medium">{team[0].name}</p>
            <p className="text-sm text-gray-300">{team[0].role}</p>
          </div>

          {/* Other Members */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10 place-items-center">
            {team.slice(1).map((member) => (
              <div key={member.name} className="text-center">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="mx-auto h-20 w-20 sm:h-24 sm:w-24 rounded-full ring-4 ring-white/15 shadow-lg object-cover"
                />
                <p className="mt-4 text-sm sm:text-base">{member.name}</p>
                <p className="text-xs text-gray-300">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;