import React from "react";
import Badge from "react-bootstrap/Badge";

const BadgeComponent = ({ lastbadge }) => {
  return (
    <div>
      {Object.keys(lastbadge).map((item, index) => {
        return (
          <p>
            {" "}
            <Badge style={{fontSize: 14}} className="detailbadge" pill bg="danger" text="dark">
              {item}
            </Badge>
            {index < 2 ? '$ ' + lastbadge[item] :lastbadge[item] }
          </p>
        );
      })}
    </div>
  );
};

export default BadgeComponent;
