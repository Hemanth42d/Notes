import React from "react";
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div>
      <div className=" border-1 border-gray-300 rounded-md p-4 bg-white hover:shadow-xl transition-all ease-in-out ">
        <div className="flex items-center justify-between">
          <div>
            <h6 className="text-sm font-medium">{title}</h6>
            <span className="text-sx text-slate-500">{date}</span>
          </div>
          <MdOutlinePushPin
            className={`icon-btn ${
              isPinned ? "text-[#2BB5FF]" : "text-slate-300"
            }`}
            onClick={onPinNote}
          />
        </div>

        <p className="text-xs text-slate-600 mt-2">{content?.slice(0, 60)}</p>

        <div className="flex items-center justify-between mt-2">
          <div className="text-xs text-slate-500">
            {tags.map((item) => `#${item}`)}
          </div>

          <div className="flex items-center gap-2">
            <MdCreate
              className="icon-btn hover:text-green-600 cursor-pointer"
              onClick={onEdit}
            />
            <MdDelete
              className="icon-btn hover:text-red-500 cursor-pointer"
              onClick={onDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
