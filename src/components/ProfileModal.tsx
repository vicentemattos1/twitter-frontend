import { useRouter } from "next/router";
import Modal from "react-modal";
import styles from "../styles/components/ProfileModal.module.scss";
import { AiOutlineCloseCircle } from "react-icons/ai";

type ProfileModalProps = {
  isOpen: boolean;
  user_id?: string;
};

export function ProfileModal({ isOpen, user_id }: ProfileModalProps) {
  const router = useRouter();

  return (
    <Modal
      style={{
        content: {
          height: "60%",
          width: "60%",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
        },
        overlay: { background: "var(=-gray-line)" },
      }}
      isOpen={isOpen}
      onRequestClose={() => router.back()}
    >
      <button onClick={() => router.back()} className={styles["close-btn"]}>
        <AiOutlineCloseCircle size={28} />
      </button>
      <main className={styles["container"]}></main>
    </Modal>
  );
}
