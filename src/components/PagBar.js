import { Pagination } from "antd";
const PagBar = ({ setPage, numPage = 10 }) => {
  const handlePageChange = (page) => {
    console.log(page);
    setPage(page);
    window.scrollTo(0, 0);
  };
  return (
    <div>
      <Pagination
        defaultCurrent={1}
        total={10}
        onChange={(e) => handlePageChange(e.target.textContent)}
      />
    </div>
  );
};

export default PagBar;
