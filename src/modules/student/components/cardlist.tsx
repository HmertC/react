import React from 'react';
import { FiRefreshCw } from 'react-icons/fi';
import { BsFillTrashFill } from 'react-icons/bs';
import myimage from '../../../img/resim.jpg';

interface CardProps {
  item: any;
  onEdit: (id: number) => void;
  onRemove: (id: number) => void;
}

const Card: React.FC<CardProps> = ({ item, onEdit, onRemove }) => {
  const { id, name, surName, birtday, studentNo } = item;

  const handleEdit = () => {
    onEdit(id);
  };

  const handleRemove = () => {
    onRemove(id);
  };

  return (
    <div>
      <div className="card mt-3" style={{ textAlign: "center", backgroundColor: "powderblue"}}>
        {/* <img src={myimage} className="card-img-top w-25 rounded-circle mx-auto d-block mt-2" alt="..." /> */}
        <div className="card-body">
          <h5 className="card-title">{name} {surName}</h5>
          <p className="card-text">{birtday}</p>
          <p className="card-text">{studentNo}</p>
          <div style={{ textAlign: "right" }}>
            <a onClick={handleEdit} className="btn btn-warning"><FiRefreshCw /></a>
            <a onClick={handleRemove} href="#" className="btn btn-danger"><BsFillTrashFill /></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;