import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { FiMoreHorizontal } from "react-icons/fi";
import { IoIosAdd } from "react-icons/io";
import { MdSubject } from "react-icons/md";
import { IoChatboxOutline } from "react-icons/io5";
function Card({ card, index, listKey }) {
  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: { index, listKey },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} className="card" style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div style={{ "--label-color": card.labelColor }} />
      <span>{card.title}</span>
      <ul>
        <li>
          <span className="material-symbols-outlined">
            <MdSubject />
          </span>
        </li>
        <li>
          <span className="material-symbols-outlined">
            <IoChatboxOutline />
          </span>
        </li>
      </ul>
    </div>
  );
}

export default function Dashboard({
  title,
  data,
  listKey,
  moveCard,
  onAddClick,
}) {
  const [, drop] = useDrop({
    accept: "CARD",
    drop: (item, monitor) => {
      moveCard(item.listKey, listKey, item.index);
    },
  });

  return (
    <div className="list" ref={drop}>
      <div>
        <h4>{title}</h4>
        <span className="material-symbols-outlined btn">
          <FiMoreHorizontal />
        </span>
      </div>
      {data.map((card, index) => (
        <Card key={index} index={index} card={card} listKey={listKey} />
      ))}
      <div>
        <button className="btn" onClick={onAddClick}>
          <span className="material-symbols-outlined">
            <IoIosAdd />
          </span>
          Add a Card
        </button>
      </div>
    </div>
  );
}
