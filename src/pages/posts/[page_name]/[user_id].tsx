import type { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import { ProfileModal } from "../../../components/ProfileModal";

const Posts: NextPage = () => {
  const router = useRouter();
  const { page_name, user_id } = router.query;
  const [isOpen] = useState(true);

  if (!!page_name && page_name.includes("profile") && user_id) {
    return <ProfileModal isOpen={isOpen} user_id={user_id.toString()} />;
  }

  return <></>;
};

export default Posts;
