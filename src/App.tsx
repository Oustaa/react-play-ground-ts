import axios from "axios";
import InfiniteScroll from "./components/InfiniteScroll/Index";
import UsersCard from "./components/Dommy/UserCard";

async function getUserData(page: number) {
  try {
    const response = await axios.get(
      "http://localhost:8000/infinit-scrolling?",
      {
        params: {
          page,
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}

const App = () => {
  return (
    <>
      <InfiniteScroll renderItem={UsersCard} getDate={getUserData} />

      <div>
        <div
          onClick={() => {
            console.log("DIV WAS CLICKED");
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log("BUTTON WAS CLICKED");
            }}
          >
            click me please
          </button>
        </div>
      </div>
    </>
  );
};

export default App;

