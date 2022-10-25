import type { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import { PostsSection } from "../../../components/PostsSection";
import { ProfileModal } from "../../../components/ProfileModal";

const Posts: NextPage = () => {
  const router = useRouter();
  const { page_name, user_id } = router.query;
  const [isOpen] = useState(true);
  console.log(page_name);
  return (
    <>
      {!!page_name && page_name.includes("profile") && user_id && (
        <ProfileModal isOpen={isOpen} user_id={user_id.toString()} />
      )}
      <PostsSection />;
    </>
  );
};

export default Posts;
