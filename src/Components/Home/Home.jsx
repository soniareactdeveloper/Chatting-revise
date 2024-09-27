import { useSelector } from "react-redux";

const Home = () => {
  // Getting data from redux
  const data = useSelector((state) => state.counter.value);

  return (
    <div className="w-[1280px] sm-[640px] md-[768px] lg-[1024px] xl-[1280px] xxl-[1536px] min-h-screen bg-yellow-200 flex items-center justify-center">
      <div className="bg-white p-6 md:p-10 rounded-lg shadow-lg text-center w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px]">
        <img
          src={data?.photoURL}
          alt="User"
          className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto mb-4"
        />
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
          {data?.displayName}
        </h1>
        <p className="text-md md:text-lg text-gray-600">{data?.email}</p>
      </div>
    </div>
  );
};

export default Home;

