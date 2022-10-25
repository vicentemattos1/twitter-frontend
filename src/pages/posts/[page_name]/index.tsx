import type { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import { ProfileModal } from "../../../components/ProfileModal";

const Posts: NextPage = () => {
  const router = useRouter();
  const { page_name } = router.query;
  const [isOpen] = useState(true);

  if (!!page_name && page_name.includes("profile")) {
    return <ProfileModal isOpen={isOpen} />;
  }

  return <></>;
};

export default Posts;
