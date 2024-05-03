import { Card, Rate, Tag } from "antd";
import Link from "next/link";

const CardImage = ({
  title,
  Image,
  linkUrl,
  rate,
  Genres = [],
  TagData = [],
}) => {
  // console.log(TagData)
  // console.log(Genres)
  const sxxx = setData_tag(Genres, TagData);
  return (
    <>
      <Link href={`/home/${linkUrl}`}>
        <Card
          hoverable
          title={title}
          style={{
            textAlign: "center",
          }}
        >
          <img src={`https://image.tmdb.org/t/p/w500${Image}`} width={"100%"} />
          <br />
          {sxxx.map((e, index) => {
            return <Tag key={index}>{e?.name ?? "N/A"}</Tag>;
          })}
          <div style={{ margin: "20px" }}>
            <Rate disabled defaultValue={rate} />
          </div>
        </Card>
      </Link>
    </>
  );
};
export default CardImage;

function setData_tag(id, arr) {
  let arr_return = [];

  id.forEach((e) => {
    const data = arr.find((item) => {
      return e == item.id;
    });
    arr_return.push(data);
  });

  return arr_return;
}
