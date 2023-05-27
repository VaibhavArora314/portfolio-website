import "./App.css";
import Nav from "./components/NavBar";
import Hero from "./components/Header";
import About, { ISkill } from "./components/About";
import Experience, { IExperience } from "./components/Experience";
import Projects, { IProject, IButton } from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";

const env = import.meta.env;

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGE_SENDER_ID,
  appId: env.VITE_FIREBASE_API_ID,
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const COLOR = "teal";

function App() {
  const [heroData, setHeroData] = useState({
    name: "Hi, my name is Vaibhav Arora",
    roles: "I am an Aspiring Software Developer",
    desc: "",
    resume: "#",
  });
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [contact, setContact] = useState({
    linkedin: "",
    github: "",
    email: "",
  });
  const [loading, setloading] = useState(true);

  const getPortfolioData = async () => {
    const { heroContent, aboutContent } = await getMiscContent();
    setHeroData(heroContent);
    setAbout(aboutContent);

    const sk = await getSkills();
    setSkills(sk);

    const exp = await getExperiences();
    setExperiences(exp);

    const { projectsData, categoriesData } = await getProjectsAndCategories();
    setProjects(projectsData);
    setCategories(categoriesData);

    const cd = await getContactDetails();
    setContact(cd);

    setloading(false);
  };

  useEffect(() => {
    getPortfolioData();
  }, []);

  if (loading) return <></>;

  return (
    <>
      <Nav haveExperience={experiences.length > 0} />
      <Hero color={COLOR} heroData={heroData} />
      <About color={COLOR} about={about} skills={skills} />
      {experiences.length > 0 && (
        <Experience color={COLOR} experiences={experiences} />
      )}
      <Projects
        color={COLOR}
        projects={projects}
        categories={categories}
        haveExperience={experiences.length > 0}
      />
      <Contact
        color={COLOR}
        contact={contact}
        haveExperience={experiences.length > 0}
      />
      <Footer />
    </>
  );
}

export default App;

const getMiscContent = async () => {
  const querySnapshot = await getDocs(collection(firestore, "misc"));
  const heroContent = {
    name: "",
    roles: "",
    desc: "",
    resume: "",
  };
  let aboutContent: string = "";

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (doc.id == "hero") {
      heroContent.name = data.name;
      heroContent.roles = data.roles;
      heroContent.desc = data.desc;
      heroContent.resume = data.resume;
    }
    if (doc.id == "about") aboutContent = data.content;
  });

  return { heroContent, aboutContent };
};

const getSkills = async () => {
  const querySnapshot = await getDocs(
    query(collection(firestore, "skills"), orderBy("id"))
  );
  const skills: ISkill[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    skills.push({
      id: doc.id,
      name: data.name,
      logoURL: data.logoURL,
    });
  });
  return skills;
};

const getExperiences = async () => {
  const querySnapshot = await getDocs(
    query(collection(firestore, "experiences"), orderBy("date", "desc"))
  );
  const experiences: IExperience[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (data.show == true) {
      experiences.push({
        company: data.company,
        position: data.position,
        duration: data.duration,
        image: data.image,
        badges: data.badges,
        listItems: data.listItems,
      });
    }
  });

  return experiences;
};

const getProjectsAndCategories = async () => {
  const querySnapshot = await getDocs(
    query(collection(firestore, "projects"), orderBy("date", "desc"))
  );
  const projectsData: IProject[] = [];
  let categoriesData: string[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (doc.id === "categories") categoriesData = data.values;
    else {
      const buttons: IButton[] = [];
      for (
        let i = 0;
        i < data.buttonTitles.length && i < data.buttonLinks.length;
        i++
      ) {
        buttons.push({
          text: data.buttonTitles[i],
          href: data.buttonLinks[i],
        });
      }
      projectsData.push({
        id: doc.id,
        name: data.name,
        image: data.image,
        description: data.description,
        tags: data.tags,
        badges: data.badges,
        buttons,
      });
    }
  });
  return { projectsData, categoriesData };
};

const getContactDetails = async () => {
  const querySnapshot = await getDocs(collection(firestore, "contact"));
  const contactDetails = {
    linkedin: "",
    github: "",
    email: "",
  };
  querySnapshot.forEach((doc) => {
    const data = doc.data();

    const propertyName: string = data.name;
    contactDetails[propertyName as keyof typeof contactDetails] = data.link;
  });
  return contactDetails;
};
