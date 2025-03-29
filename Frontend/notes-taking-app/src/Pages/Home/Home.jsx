import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";

const Home = () => {
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  return (
    <>
      <NavBar />

      <div className="container mx-auto w-[1280px]">
        <div className="grid grid-cols-3 gap-4 mt-8">
          <NoteCard
            title="Cricket math on 30th march"
            date="30 March 2025"
            content="SRH Cricket match on 30th march"
            tags="#Cricket"
            isPinned={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNote={() => {}}
          />
        </div>

        <button
          className="w-16 h-16 rounded-2xl flex justify-center items-center bg-[#2BB5FF] hover:bg-blue-600 absolute right-10 bottom-10"
          onClick={() => {
            setIsOpenAddEditModal({ isShown: true, type: "add", data: null });
          }}
        >
          <MdAdd className="text-[32px] text-white cursor-pointer" />
        </button>

        <Modal
          isOpen={isOpenAddEditModal.isShown}
          onRequestClose={() => {}}
          style={{
            overlay: {
              backgroundColor: "rgba(0,0,0,0.2)",
            },
          }}
          contentLabel=""
          className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5"
        >
          <AddEditNotes
            type={setIsOpenAddEditModal.type}
            noteData={setIsOpenAddEditModal.data}
            onClose={() => {
              setIsOpenAddEditModal({
                isShown: false,
                type: "add",
                data: null,
              });
            }}
          />
        </Modal>
      </div>
    </>
  );
};

export default Home;
