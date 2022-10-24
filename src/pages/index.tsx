import type { NextPage } from "next";

const Home: NextPage = () => {
  return <></>;
};

export async function getServerSideProps() {
  return {
    redirect: {
      permanent: false,
      destination: "/posts",
    },
    props: {},
  };
}
export default Home;
