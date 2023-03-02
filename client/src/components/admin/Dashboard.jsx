// const searchValue = (value) => {
// };
// const debounceSearch = debounce(searchValue, 500);
// const handleChange = ({ target }) => {
//   debounceSearch(target.value)
// }

import AppInfoBox from "../AppInfoBox";
import LatestUploads from "../LatestUploads";

// const handleSearch = debounce(({ target }) => {
// }, 500);

const Dashboard = () => {
  return (
    <div className="grid grid-cols-3 gap-5 my-5">
      <AppInfoBox title="Total Uploads" subtitle="100" />
      <AppInfoBox title="Total Reviews" subtitle="800" />
      <AppInfoBox title="Total Users" subtitle="200" />

      <LatestUploads />
    </div>
  );
};

export default Dashboard;
