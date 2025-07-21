import { Link } from "react-router-dom";

const Breadcrumbs = ({ items, className }) => {
  return (
    <div className="d-flex align-items-center gap-2 fm-2 fs-7 mb-3">
      {items.map((item, index) => (
        <div key={index} className="d-flex align-items-center gap-2">
          {index < items.length - 1 ? (
            <Link to={item.path} className={`${className} text-decoration-none`}>
              {item.label}
            </Link>
          ) : (
            <p className="mb-0">{item.label}</p>
          )}
          {index < items.length - 1 && <span> &gt; </span>}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumbs;