import type { NextPage } from "next";
import { useState } from "react";
import { ProfileModal } from "../../components/ProfileModal";

const Home: NextPage = () => {
  const [isOpen] = useState(true);
  return <ProfileModal isOpen={isOpen} />;
};

export default Home;
