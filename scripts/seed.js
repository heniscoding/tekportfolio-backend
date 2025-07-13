require("dotenv").config();
const connectDB = require("../config/db");
const Project = require("../models/Project");

const seedData = async () => {
  const demoProjects = [
    {
      title: "Community Events Platform (Launchpad Project)",
      description:
        "As part of a paid 4-week consultancy with Launchpad, a Tech Returners initiative, I designed and developed a responsive web application for managing community events. The platform enables local organisations to create and promote events, while allowing users to register, add events to their Google Calendar, and optionally pay for participation. Built using React, Tailwind, and Node.js, the app integrates third-party APIs including Google Calendar and was delivered with full documentation for deployment and local development.\n\nThis project focused on user accessibility, clean UI/UX, and clear error handling throughout the app. I worked independently on both the frontend and backend, prioritising scalability, responsiveness, and secure data handling. The finished product was successfully hosted on a public platform and was used to demonstrate my full-stack capabilities to potential employers. It served as a strong portfolio piece and was very well received by the programme organisers.",
      techStack: ["React", "Tailwind", "Node.js", "Google Calendar API"],
      link: "https://community-events.henryalderslade.com/",
      image: "/images/projects/communityevents.jpg",
    },
    {
      title: "Chora Coaching – WordPress Website Design & Build",
      description:
        "I designed and developed a bespoke WordPress website for Chora Coaching, a newly formed team of professional coaches and mediators. Built using the Divi theme with custom layouts and branding, the site was created to showcase coaching services, share the team’s story, and establish a credible online presence. The design focused on clarity, warmth, and trust-building, reflecting the ethos of the team and their approach to coaching and mediation.\n\nIn addition to the design and development, I managed the full launch and support process, including content strategy, SEO optimisation, performance tuning, hosting, and backups. I also trained the team on how to manage content themselves using the WordPress dashboard. The feedback from all the coaches was extremely positive, and I continue to provide ongoing support and maintenance for the site.",
      techStack: ["WordPress", "Divi"],
      link: "https://choracoaching.com/",
      image: "/images/projects/choracoaching.jpg",
    },
    {
      title: "Deal Chasers – Community-Powered Deals App",
      description:
        "Deal Chasers is a cross-platform mobile web app that allows users to share, vote on, and discover the best deals from around the web and local communities. Built in a team of four during the Northcoders project phase, the app combines a modern, intuitive interface with robust full-stack functionality. I contributed to both the frontend and backend, working with technologies including Next.js, Node.js, and MongoDB to deliver a responsive and engaging user experience.\n\nKey features include user authentication, real-time deal submissions, voting, and dynamic filtering of content. The project was delivered under tight time constraints, requiring close collaboration, agile planning, and shared Git workflows. It was an excellent opportunity to demonstrate both technical breadth and team-based problem-solving, and resulted in a working MVP deployed for public use.",
      techStack: ["Next.js", "Node.js", "MongoDB"],
      link: "https://northcoders.com/project-phase/deal-chasers",
      image: "/images/projects/codecrafters.jpg",
    },
    {
      title: "Northcoders News – Social News Frontend",
      description:
        "This solo project replicates the core features of a social news platform, similar to Reddit, and was built using React and Redux. The site allows users to view and filter news articles by topic, vote on articles, and comment on them in real-time. Designed with responsiveness and clarity in mind, the app provides a seamless experience across devices and includes user authentication, sorting, and loading/error states.\n\nThis project was an important exercise in component-based architecture, API integration, and state management using Redux. I focused on building a consistent and accessible user interface while integrating asynchronous data handling via Axios. It also helped me gain confidence in debugging, form validation, and writing clean, maintainable frontend code.",
      techStack: ["React", "Redux", "Firebase"],
      link: "https://fe-nc-news.henryalderslade.com/",
      image: "/images/projects/ncnewsfront.jpg",
    },
    {
      title: "Northcoders News – RESTful Backend API",
      description:
        "The backend for the Northcoders News platform was built using Node.js, Express, and PostgreSQL. This RESTful API supports all key frontend functionality, including user accounts, articles, comments, voting, and topic filtering. I developed the API from scratch with a strong emphasis on clean structure, scalability, and test-driven development using Jest and Supertest.\n\nComprehensive error handling, pagination, sorting, and filtering features were implemented to support a smooth frontend experience. The API was deployed to Heroku and fully documented to allow other developers to consume it easily. This project deepened my understanding of relational databases, query optimisation, and secure data handling in a production environment.",
      techStack: ["Node.js", "Express", "PostgreSQL"],
      link: "https://be-nc-news.henryalderslade.com/api/articles",
      image: "/images/projects/ncnewsback.jpg",
    },
    {
      title: "Monica Hanaway – WordPress Rebuild & Hosting",
      description:
        "I redesigned and rebuilt the WordPress website for psychotherapist and author Monica Hanaway, modernising the design to better reflect her professional practice and published work. The new site features an improved layout, faster performance, and simplified navigation, making it easier for visitors to explore services, access resources, and get in touch.\n\nThis freelance project included hosting migration, SSL setup, SEO optimisation, and regular backups. I also provided Monica with a training session so she could manage her content independently. The new site has received positive feedback from both Monica and her clients, and I continue to provide ongoing support and maintenance as part of a long-term working relationship.",
      techStack: ["WordPress"],
      link: "https://monicahanaway.com/",
      image: "/images/projects/monicahanaway.jpg",
    },
  ];

  try {
    await connectDB();
    await Project.deleteMany();
    for (const data of demoProjects) {
      await new Project(data).save();
    }
    console.log("✅ Seed data successfully added!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    process.exit(1);
  }
};

seedData();
