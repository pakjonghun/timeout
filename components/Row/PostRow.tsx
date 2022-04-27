import { NextPage } from "next";
import { getFullDate, joinStyleClass } from "@libs/client/utils";
import Link from "next/link";
import { Posts, Users } from "@prisma/client";

interface props {
  data: Posts & { user: Pick<Users, "name"> };
  isPickable?: boolean;
  styles?: React.CSSProperties;
  index: number;
}

const PostRow: NextPage<props> = ({ index, data, styles, isPickable }) => {
  return (
    <Link href={`/notices/${data.id}`}>
      <a>
        <li
          style={styles}
          className={joinStyleClass(
            "grid grid-cols-8 py-4 place-items-center font-medium opacity-60 z-10",
            isPickable
              ? "transition scale hover:opacity-100 cursor-pointer"
              : ""
          )}
        >
          <span className="font-md">{index + 1}</span>
          <span className="col-span-3 font-md">{data.title}</span>
          <span className="col-span-2 font-md">
            {getFullDate(new Date(data.updatedAt))}
          </span>
          <span className="col-span-2 font-md">{data.user.name}</span>
        </li>
      </a>
    </Link>
  );
};

export default PostRow;
