import "./UserCard.css";

import { TbLogout2, TbSettings } from "react-icons/tb";

interface UserCardProps {
  image: string;
  name: string;
  status: string;
}

export default function UserCard({
  image,
  name,
  status,
}: UserCardProps) {
  return (
    <div className="user-card">
      <div className="user-card__top">

        <div className="user-card__profile">

          <img
            src={image}
            alt={name}
            className="user-card__avatar"
          />

          <div>

            <h4>{name}</h4>

            <span>{status}</span>

          </div>

        </div>

        <button className="user-card__settings">
          <TbSettings size={20}/>
        </button>

      </div>

      <button className="user-card__logout">

        Log out

        <TbLogout2 size={20}/>

      </button>
    </div>
  );
}