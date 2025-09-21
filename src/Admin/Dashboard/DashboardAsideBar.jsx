import { useState } from "react";
import { Link } from "react-router-dom";

const DashboardAsideBar = () => {
    const [selected, setSelected] = useState(0);
    const LinkItems = [
        { name: "Hero Section", link: "/admin/hero-section" },
        { name: "About Me", link: "/admin/about-me" },
        { name: "Skills", link: "/admin/skills" },
        { name: "Eductions", link: "/admin/educations" },
        { name: "publications", link: "/admin/publications" },
        { name: "trainings", link: "/admin/trainings" },
        { name: "Settings", link: "/admin/settings" },
        { name: "Leadership", link: "/admin/Leadership" },
        { name: "activities", link: "/admin/activities" },
        { name: "experience", link: "/admin/experience" },
        { name: "appoinments", link: "/admin/appoinments" },
        { name: "reviews", link: "/admin/reviews" },
        { name: "gellery", link: "/admin/gellery" },
    ];
    return (
        <div className="w-full max-h-screen  overflow-y-scroll 
      bg-[rgba(255,255,255,0.1)] 
      backdrop-blur-md 
      border border-[rgba(255,255,255,0.2)] 
      shadow-lg 
      rounded-xl">

            <h1 className="text-xl md:text-2xl font-bold py-4 
        text-white text-center drop-shadow-lg">
                Admin Dashboard
            </h1>

            {/* links */}
            <ul className="flex flex-col  w-full">
                {LinkItems.map((item, index) => (
                    <li
                        key={index}
                        onClick={() => setSelected(index)}
                        className="w-full"
                    >
                        <Link
                            to={item.link}
                            className={`w-full block py-3 px-4  text-white text-lg font-medium 
          cursor-pointer transition-all duration-300 ease-in-out 
          hover:bg-accent/10 hover:backdrop-blur-md hover:shadow-lg hover:scale-[1.02]
          ${selected === index
                                    ? "bg-accent/30 backdrop-blur-md shadow-lg scale-[1.02]"
                                    : "bg-transparent"
                                }`}
                        >
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default DashboardAsideBar;
