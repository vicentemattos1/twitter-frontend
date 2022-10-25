import type { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import { PostsSection } from "../../../components/PostsSection";
import { ProfileModal } from "../../../components/ProfileModal";

const Posts: NextPage = () => {
  const router = useRouter();
  const { page_name } = router.query;
  const [isOpen] = useState(true);
  return (
    <>
      {!!page_name && page_name.includes("profile") && (
        <ProfileModal isOpen={isOpen} />
      )}
      <PostsSection />;
    </>
  );
};

export default Posts;
