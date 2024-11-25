import { useArchive } from "@/hooks/useArchive";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import { IStatsInitialState } from "@/services/store/stats/stats.slice";
import { getMostPurchasedUser } from "@/services/store/stats/stats.thunk";
import {
  FaMedal,
  FaEnvelope,
  FaPhone,
  FaCheckCircle,
  FaTag,
  FaShoppingBag,
  FaUsers,
  FaCrown,
  FaStar,
  FaChartLine,
  FaCalendarAlt,
  FaVenusMars,
} from "react-icons/fa";

const TopBuyers = () => {
  const { state, dispatch } = useArchive<IStatsInitialState>("stats");

  useAsyncEffect(
    (async) => async(dispatch(getMostPurchasedUser({ query: { _pagination: false, ...state.filter } })), "getMostPurchasedUser"),
    [JSON.stringify(state.filter)],
  );

  const sortedUsers = [...state.users].sort((a, b) => b.totalOrder - a.totalOrder);
  const totalOrders = state.users.reduce((acc, user) => acc + user.totalOrder, 0);
  const averageOrders = totalOrders / state.users.length;

  const getMedalColor = (index: any) => {
    switch (index) {
      case 0:
        return "text-yellow-400 w-8 h-8";
      case 1:
        return "text-gray-400 w-7 h-7";
      case 2:
        return "text-amber-600 w-6 h-6";
      default:
        return "text-gray-300 w-5 h-5";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br to-gray-100 py-8">
      <div className="mx-auto px-4 pb-10">
        <div className="mb-8 text-center">
          <h1 className="mb-2 flex items-center justify-center gap-3 text-3xl font-bold text-black-500">
            <FaCrown className="text-yellow-500" />
            Top Khách Hàng Thân Thiết
          </h1>
          <p className="text-gray-500">Thống kê và xếp hạng khách hàng theo số lượng đơn hàng</p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="transform rounded-xl border border-gray-100 bg-white p-6 shadow-md transition-transform duration-300 hover:scale-105">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-blue-100 p-3">
                <FaUsers className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Tổng Khách Hàng</p>
                <p className="text-2xl font-bold text-black-500">{state.users.length}</p>
              </div>
            </div>
          </div>

          <div className="transform rounded-xl border border-gray-100 bg-white p-6 shadow-md transition-transform duration-300 hover:scale-105">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-green-100 p-3">
                <FaShoppingBag className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Tổng Đơn Hàng</p>
                <p className="text-2xl font-bold text-black-500">{totalOrders}</p>
              </div>
            </div>
          </div>

          <div className="transform rounded-xl border border-gray-100 bg-white p-6 shadow-md transition-transform duration-300 hover:scale-105">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-primary-200 p-3">
                <FaChartLine className="h-6 w-6 text-primary-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Trung Bình Đơn Hàng</p>
                <p className="text-2xl font-bold text-black-500">{averageOrders.toFixed(1)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-lg">
          <div className="space-y-6">
            {sortedUsers.map((user, index) => (
              <div
                key={user.id}
                className="relative rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
              >
                <div className="absolute -right-3 -top-3">
                  <FaMedal className={getMedalColor(index)} />
                </div>

                <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
                  <div className="relative">
                    <div className="h-20 w-20 overflow-hidden rounded-full border-4 border-gray-100 shadow-inner">
                      <img src={user.avatarUrl || "null"} alt={user.fullName} className="h-full w-full object-cover" />
                    </div>
                    {index === 0 && <FaStar className="absolute -right-2 -top-2 h-6 w-6 text-yellow-400" />}
                  </div>

                  <div className="flex-grow">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="flex items-center gap-2 text-xl font-bold text-black-500">
                          {user.fullName}
                          {user.isVerified && <FaCheckCircle className="text-blue-500" />}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">ID: {user.id}</p>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="rounded-lg bg-blue-50 px-4 py-2 text-center">
                          <p className="text-sm text-gray-500">Xếp hạng</p>
                          <p className="text-xl font-bold text-blue-600">#{index + 1}</p>
                        </div>
                        <div className="rounded-lg bg-green-50 px-4 py-2 text-center">
                          <p className="text-sm text-gray-500">Đơn hàng</p>
                          <p className="text-xl font-bold text-green-600">{user.totalOrder}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <div className="flex items-center gap-2">
                        <FaEnvelope className="text-gray-400" />
                        <span className="text-sm text-gray-500">{user.email || "Chưa có email"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaPhone className="text-gray-400" />
                        <span className="text-sm text-gray-500">{user.phone || "Chưa có SĐT"} </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaVenusMars className="text-gray-400" />
                        <span className="text-sm text-gray-500">{user.gender || "Chưa có giới tính"}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-black-500">
                        <FaCalendarAlt className="text-gray-500" />
                        Tham gia: {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                      </span>
                      {user.tags.map((tag: any, tagIndex: string) => (
                        <span
                          key={tagIndex}
                          className="inline-flex items-center gap-1 rounded-full bg-primary-200 px-3 py-1 text-xs font-medium text-primary-500"
                        >
                          <FaTag className="text-primary-500" />
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBuyers;
