import { useSelector } from "react-redux";



const Home = () => {
// getting data from redux
const data = useSelector((state)=>state.counter.value)



  return (
    <div className="w-[1030px] h-screen bg-yellow-200 flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <img
          src={data?.photoURL}
          alt="User"
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
        <h1 className="text-2xl font-semibold text-gray-800"> {data?.displayName}  </h1>
        <p className="text-lg text-gray-600"> {data?.email}</p>
      </div>
    </div>
  );
}

export default Home;
