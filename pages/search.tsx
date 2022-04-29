import { useEffect } from "react";
import Layout from "@components/Layout";
import Records from "@components/Records";
import RecordByDay from "@components/RecordByDay";
import SearchInput from "@components/SearchInput";
import PrivateLoader from "@components/PrivateLoader";
import { useAppDispatch, useAppSelector } from "@libs/client/useRedux";
import { joinStyleClass } from "@libs/client/utils";
import { reset as resetSearch } from "@store/reducer/search";
import { reset } from "@store/reducer/record";

const Search = () => {
  const dispatch = useAppDispatch();
  const standard = useAppSelector((state) => state.search.standard);
  const userRole = useAppSelector((state) => state.user.role);
  const isFilterShow = useAppSelector((state) => state.search.isShowFilter);

  useEffect(() => {
    return () => {
      dispatch(reset());
      dispatch(resetSearch());
    };
  }, [dispatch]);

  return (
    <Layout
      canGoBack={false}
      title={userRole === "ADMIN" ? "기록검색" : "내 기록 검색"}
    >
      <PrivateLoader />
      <article className="relative flex flex-col justify-center items-center px-5 w-full">
        <div
          className={joinStyleClass(
            isFilterShow
              ? "absolute inset-0 w-full h-full z-20 backdrop-blur-sm"
              : ""
          )}
        />
        <SearchInput />

        <div className="relative max-h-[80vh] w-full pb-10 px-5 divide-y-[1px] mt-5 text-sm rounded-md">
          {standard === "name" ? (
            <>
              <Records
                classes={joinStyleClass(
                  "grid w-full space-y-3",
                  userRole === "ADMIN"
                    ? "grid-rows-[minmax(3.5rem,4vh),minmax(15rem,50vh),minmax(4rem,4vh)]"
                    : "grid-rows-[70vh,4vh]"
                )}
              />
            </>
          ) : (
            <RecordByDay
              classes={joinStyleClass(
                "grid w-full space-y-3",
                userRole === "ADMIN"
                  ? "grid-rows-[minmax(3.5rem,5vh),minmax(10rem,55vh),minmax(3.5rem,5vh)]"
                  : "grid-rows-[70vh,4vh]"
              )}
            />
          )}
        </div>
      </article>
    </Layout>
  );
};

export default Search;
