import { Typography } from "@mui/material";
import ExpenseList from "@/components/ExpenseList";
import Card from "@/components/Card";
// import InfiniteScroll from "react-infinite-scroller";
import useExpenseListData from "@/hooks/common/useExpenseListData";

// const Container = styled(Box)(({ theme }) => ({
//   backgroundColor: "bisque",
//   ...theme.typography.body2,
//   padding: `${theme.spacing(2)}}`,
//   color: theme.palette.text.secondary,
// }));

const LatestExpenses = () => {
  const { data } = useExpenseListData();

  // const loadMoreData = (page: number) => {
  //   fetchData(page);
  // };

  return (
    <Card>
      <Typography variant="h5" display="inline">
        Latest Expenses
      </Typography>

      {/* <InfiniteScroll
        pageStart={0}
        loadMore={loadMoreData}
        hasMore={false}
        loader={
          <div className="loader" key="loader">
            Loading ...
          </div>
        }
      > */}
      <ExpenseList expenses={data?.data} />

      {/* </InfiniteScroll> */}
    </Card>
  );
};

export default LatestExpenses;
