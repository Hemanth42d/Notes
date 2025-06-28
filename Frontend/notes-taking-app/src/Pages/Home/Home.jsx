import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd, MdEdit } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import moment from "moment";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const Home = () => {
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setIsOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  const getUserInfo = async () => {
    try {
      const response = await await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const getAllNotes = async () => {
    try {
      let response = await axiosInstance.get("/all-notes");
      if (response && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () => {};
  }, []);

  return (
    <>
      <NavBar userInfo={userInfo} />

      <div className="container mx-auto w-[1280px]">
        <div className="grid grid-cols-3 gap-4 mt-8">
          {allNotes.map((note, index) => (
            <NoteCard
              key={note._id}
              title={note.title}
              date={moment(note.createdOn).format("Do MMM YYYY")}
              content={note.content}
              tags={note.tags}
              isPinned={note.isPinned}
              onEdit={() => handleEdit(note)}
              onDelete={() => {}}
              onPinNote={() => {}}
            />
          ))}
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
          onRequestClose={() => {
            setIsOpenAddEditModal({
              isShown: false,
              type: "add",
              data: null,
            });
          }}
          style={{
            overlay: {
              backgroundColor: "rgba(0,0,0,0.2)",
            },
          }}
          contentLabel=""
          className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5"
        >
          <AddEditNotes
            type={isOpenAddEditModal.type}
            noteData={isOpenAddEditModal.data}
            onClose={() => {
              setIsOpenAddEditModal({
                isShown: false,
                type: "add",
                data: null,
              });
            }}
            getAllNotes={getAllNotes}
          />
        </Modal>
      </div>
    </>
  );
};

export default Home;
