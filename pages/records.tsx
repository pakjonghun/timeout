import Layout from "@components/Layout";
import Records from "@components/Records";
import PrivateLoader from "@components/PrivateLoader";
import { useAppSelector } from "@libs/client/useRedux";
import { joinStyleClass } from "@libs/client/utils";

const Record = () => {
  const userRole = useAppSelector((state) => state.user.role);

  return (
    <Layout
      title={userRole === "ADMIN" ? "오늘 초과근무 현황" : "초과근무 내역"}
      canGoBack={false}
    >
      <PrivateLoader />
      <Records
        classes={joinStyleClass(
          "grid w-full mt-10",
          userRole === "ADMIN"
            ? "grid-rows-[5vh,55vh,5vh]"
            : "grid-rows-[70vh,3vh]"
        )}
      />
    </Layout>
  );
};

export default Record;
