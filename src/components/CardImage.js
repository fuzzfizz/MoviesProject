import { Card, Rate } from "antd";
import Link from "next/link";

const CardImage = ({ title, Image, linkUrl, rate }) => {
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

          <Rate disabled defaultValue={rate} />
        </Card>
      </Link>
    </>
  );
};
export default CardImage;
