import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { ProfileModal } from "../../components/ProfileModal";

const Home: NextPage = () => {
  const [isOpen] = useState(true);
  const router = useRouter();
  const { profile_id } = router.query;
  if (!!profile_id) {
    return <ProfileModal isOpen={isOpen} user_id={profile_id.toString()} />;
  }
  return <></>;
};

export default Home;
