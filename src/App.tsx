import "./App.css";
import Nav from "./components/NavBar";
import Hero from "./components/Header";
import About, { ISkill } from "./components/About";
import Experience, { IExperience } from "./components/Experience";
import Projects, { IProject, IButton } from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { Spinner, Flex, Heading, VStack } from "@chakra-ui/react";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  getDocs,
  query,
  orderBy,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getPortfolioData = async () => {
    try {
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

      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPortfolioData();
  }, []);

  if (loading)
    return (
      <Flex h="calc(80vh)" align="center" justify="center">
        <Spinner
          color={`${COLOR}.400`}
          size="xl"
          thickness="4px"
          speed="0.7s"
        />
      </Flex>
    );

  if (error)
    return (
      <Flex h="calc(80vh)" align="center" justify="center">
        <VStack>
          <Heading size="xl">An Unexpected Error occured</Heading>
          <Heading size="md">
            Please check your internet connection or try again later
          </Heading>
        </VStack>
      </Flex>
    );

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
        github={contact.github}
      />
      <Contact
        color={COLOR}
        contact={contact}
        haveExperience={experiences.length > 0}
        sendMessage={sendMessage}
      />
      <Footer />
    </>
  );
}

export default App;

const getMiscContent = async () => {
  const querySnapshot = await getDocs(collection(firestore, "misc"));
  if (querySnapshot.empty && querySnapshot.metadata.fromCache)
    throw new Error("Server or Client Offline");
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
  if (querySnapshot.empty && querySnapshot.metadata.fromCache)
    throw new Error("Server or Client Offline");
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
  if (querySnapshot.empty && querySnapshot.metadata.fromCache)
    throw new Error("Server or Client Offline");
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
  if (querySnapshot.empty && querySnapshot.metadata.fromCache)
    throw new Error("Server or Client Offline");
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
        imageLink: data.imageLink ? data.imageLink : "",
      });
    }
  });
  return { projectsData, categoriesData };
};

const getContactDetails = async () => {
  const querySnapshot = await getDocs(collection(firestore, "contact"));
  if (querySnapshot.empty && querySnapshot.metadata.fromCache)
    throw new Error("Server or Client Offline");
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

const sendMessage = async (name: string, contact: string, message: string) => {
  try {
    if (name === "") throw new Error("Name cannot be empty!");
    if (contact === "") throw new Error("Contact cannot be empty!");
    if (message === "") throw new Error("Message cannot be empty!");

    await addDoc(collection(firestore, "messages"), {
      name,
      contact,
      message,
      created: serverTimestamp(),
    });
    return true;
  } catch (e) {
    return false;
  }
};
