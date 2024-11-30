import ManagementGrid from "@/components/grid/ManagementGrid";
import ImageTable from "@/components/table/ImageTable";
import { ITableData } from "@/components/table/PrimaryTable";
import { useArchive } from "@/hooks/useArchive";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import { IStatsInitialState, setFilter } from "@/services/store/stats/stats.slice";
import { deleteReview, getLatestReviews } from "@/services/store/stats/stats.thunk";
import { Avatar, Card } from "antd";
import { ColumnsType } from "antd/es/table";
import { format } from "date-fns";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { EButtonTypes } from "@/shared/enums/button";
import "../styles/index.css";

const LatestReviewsStats = () => {
  const { state, dispatch } = useArchive<IStatsInitialState>("stats");

  const { loading } = useAsyncEffect(
    (async) => async(dispatch(getLatestReviews({ query: { _pagination: false, ...state.filter } })), "getLatestReviews"),
    [JSON.stringify(state.filter)],
  );
  const navigate = useNavigate();
  const data: ITableData[] = useMemo(() => {
    if (state.reviews && state.reviews.length > 0) {
      return state.reviews.map((review) => {
        const formattedDate = format(new Date(review.createdAt), "dd/MM/yyyy, hh:mm a");

        return {
          id: review._id,
          key: review._id,
          user: review.user,
          product: review.order_item.product,
          rating: review.rates,
          review: review.content,
          createdAt: formattedDate,
        };
      });
    }

    return [];
  }, [state.reviews]);

  const columns: ColumnsType<any> = [
    {
      dataIndex: "product",
      title: "Sản phẩm",
      render: (product: any) => (
        <div className="flex flex-row gap-4">
          <ImageTable imageSrc={product.thumbnail} />
          {product.name}
        </div>
      ),
    },
    {
      dataIndex: "user",
      title: " Người dùng",
      render: (user: any) => (
        <div className="flex flex-row items-center justify-start gap-2">
          <Avatar src={user?.avatar_url} />
          <span
            onClick={() => {
              navigate(`/accounts/detail/${user.id}`);
            }}
            className="flex cursor-pointer items-center justify-center gap-1"
          >
            {user?.full_name}
          </span>
        </div>
      ),
    },
    {
      dataIndex: "rating",
      title: "Đánh giá",
      render: (rating: number) => (
        <div className="star-display">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} className={star <= rating ? "filled-star" : "empty-star"}>
              ★
            </span>
          ))}
        </div>
      ),
    },
    {
      dataIndex: "review",
      title: "Nhận xét",
    },
    {
      dataIndex: "createdAt",
      title: "Thời điểm đánh giá",
    },
  ];
  return (
    <Card>
      <p className="mb-6 text-base font-medium md:text-2xl">Đánh giá gần đây nhất</p>
      <ManagementGrid
        columns={columns}
        isTableLoading={loading}
        data={data}
        setFilter={setFilter}
        buttons={[
          {
            type: EButtonTypes.DELETE,
            onClick: (record) => {
              dispatch(deleteReview({ param: record.key }));
            },
          },
        ]}
      />
    </Card>
  );
};

export default LatestReviewsStats;
