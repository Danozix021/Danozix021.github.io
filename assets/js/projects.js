/*
  PROJECT LIST
  ------------
  Every project on the site comes from this list. The home page, the
  Projects page, and each project page's header, details panel and
  previous/next buttons are all built from it.

  To add a project:
    1. Copy the "_template" folder and rename the copy to the project's slug
       (lowercase, words joined with dashes, e.g. "flower-delivery").
    2. Add an entry below with the same slug.
    3. Fill in the sections inside the new folder's index.html.

  The order of this list is the order projects appear on the site.

  Fields:
    slug       folder name, also the page address (e.g. /witch-doctor/)
    title      project name
    pitch      one-line description
    role       your role on the project
    engine     engine or medium
    team       e.g. "Solo" or "Team of 4"
    duration   e.g. "13 weeks"
    status     e.g. "Completed", "Prototype"
    year       year it was made
    tags       used by the filter on the Projects page
    featured   true = also shown on the home page
    thumbnail  image path from the site root, e.g. "assets/img/witch-doctor/thumb.jpg"
               leave "" to show a placeholder
    video      YouTube link, or a video file path like "assets/video/witch-doctor.mp4"
               leave "" to show a placeholder
*/
window.PROJECTS = [
  {
    slug: "witch-doctor",
    title: "Witch Doctor",
    pitch: "Physics-based first-person game where you diagnose patients and brew cures from processed ingredients.",
    role: "Game Designer & Programmer",
    engine: "Unity, C#",
    team: "Team of 4",
    duration: "13 weeks",
    status: "Vertical slice",
    year: "2026",
    tags: ["Design", "Programming"],
    featured: true,
    thumbnail: "",
    video: "https://youtu.be/KPC-AGrxoFc"
  },
  {
    slug: "cartography-of-silence",
    title: "Cartography of Silence",
    pitch: "Narrative shop sim where you sell hand-marked maps to travellers, inspired by Papers, Please.",
    role: "Game Designer",
    engine: "Unity",
    team: "Team of 3",
    duration: "7 weeks",
    status: "Prototype",
    year: "2025",
    tags: ["Design", "Narrative"],
    featured: true,
    thumbnail: "",
    video: ""
  },
  {
    slug: "npc-ai",
    title: "Autonomous NPC AI",
    pitch: "Grid-based A* pathfinding with sense-driven NPC decision-making.",
    role: "Programmer",
    engine: "Unity, C#",
    team: "Solo",
    duration: "8 weeks",
    status: "Completed",
    year: "2026",
    tags: ["Programming", "AI"],
    featured: true,
    thumbnail: "",
    video: ""
  },
  {
    slug: "a-tale-of-battle",
    title: "A Tale of Battle",
    pitch: "1v1 hidden-information strategy board game.",
    role: "Game Designer",
    engine: "Tabletop",
    team: "Team of 2",
    duration: "4 weeks",
    status: "Completed",
    year: "2024",
    tags: ["Design", "Tabletop"],
    featured: true,
    thumbnail: "",
    video: ""
  }
];

/* Site-wide details used in the header, footer and contact sections. */
window.SITE = {
  name: "Daniel Achkar",
  title: "Game Designer & Programmer",
  location: "Abu Dhabi, UAE",
  email: "danielachkar2@gmail.com",
  github: "https://github.com/Danozix021",
  resume: "assets/Daniel_Achkar_Resume.pdf",
  /* Photo for the home page, e.g. "assets/img/daniel.jpg". Leave "" to hide it. */
  photo: ""
};
