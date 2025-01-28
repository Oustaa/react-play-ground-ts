import { FC } from "react";
import "./user-card.css";

type UserType = {
  id: number;
  fullname: string;
  email: string;
  img_url: string;
};

const UsersCard: FC<{ row: UserType }> = ({ row }) => {
  return (
    <div key={row.id} className="user_card-container">
      <img className="user_card-avatar" src={row.img_url} alt="" />
      <div className="user_card-info">
        <h3>{row.fullname}</h3>
        <p>{row.email}</p>
      </div>
    </div>
  );
};

export default UsersCard;

