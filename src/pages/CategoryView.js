import React, { useState, useEffect } from "react";
// import Subcategory from "../components/Subcategory";
import Col from "../components/Col";
import VGrid from "../components/VGrid";
// import TopCat from "../components/TopCat";
// import AllCat from "../components/AllCat";
import Posts from "../components/Posts";
// import TPoints from "../components/TPoints";
// import TPoster from "../components/TPoster";
// import Mods from "../components/Mods";
import OrderedList from "../components/OrderedList";
import UnorderedList from "../components/UnorderedList";

// Query graphql
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
const GET_USERS = gql`
  query {
    users {
      _id
      username
      email
    }
  }
`;
const GET_SUBCATS = gql`
  query {
    subcategories {
      _id
      name
      description
      category {
        name
        _id
      }
    }
  }
`;
const GET_ALLCATS = gql`
  query {
    categories {
      name
      _id
      subcategories {
        post {
          title
          _id
        }
      }
    }
  }
`;

// function Dogs({ onDogSelected }) {
//   const { loading, error, data } = useQuery(GET_DOGS);

//   if (loading) return "Loading...";
//   if (error) return `Error! ${error.message}`;

//   return (
//     <select name="dog" onChange={onDogSelected}>
//       {data.dogs.map((dog) => (
//         <option key={dog.id} value={dog.breed}>
//           {dog.breed}
//         </option>
//       ))}
//     </select>
//   );
// }

// import { connect } from 'react-redux'

const testPostArr = [
  {
    post: {
      title: "I love pokemon",
      body: "my favorite is chandelure",
      date_created: "13-may-2020",
      replies: [],
      subcategory: {
        name: "pokemon go",
        description: "all about pokemon go",
        category: {
          name: "pokemon",
          description: "all things pokemon related",
        },
      },
      author: {
        username: "testUserDion",
      },
    },
  },
  {
    post: {
      title: "I love pokemon",
      body: "my favorite is magikarp",
      date_created: "13-may-2020",
      replies: [],
      subcategory: {
        name: "pokemon go",
        description: "all about pokemon go",
        category: {
          name: "pokemon",
          description: "all things pokemon related",
        },
      },
      author: {
        username: "louis",
      },
    },
  },
];

function CategoryView() {
  // Sets state for rendered components (subcategories, topCategories, allCategories, topPoints, topPosters, and categoryMods)
  const [subCategories, setSubCategories] = useState({
    parentCategory: "Video Games (hardcoded)",
    currCategory: "Pokemon (hardcoded)",
    subCategories: [],
  });

  const [topCategories, setTopCategories] = useState({
    excitementLevel: 10000,
    lifeLongLearner: true,
    testCategories: ["Rory", "Rory again", "Rory thrice"],
  });

  const [allCategories, setAllCategories] = useState({
    allCategories: [],
  });

  const [topPoints, setTopPoints] = useState({
    topPoints: ["Paul", "Paul again", "Paul x 3"],
  });

  const [topPosters, setTopPosters] = useState({
    topPosters: ["Louis", "Louis again", "Louis x 3"],
  });

  const [categoryMods, setCategoryMods] = useState({
    mods: ["Dion", "Dion again", "Dion x 3"],
  });

  const [tempPostArr, setTempPostArr] = useState({
    query: testPostArr,
  });

  // Queries database to get users (placeholder, will get mods)
  const { loading: userLoading, error: userError, data: userData } = useQuery(
    GET_USERS
  );

  // Queries database to get all subcategories
  const {
    loading: subCatLoading,
    error: subCatError,
    data: subCatData,
  } = useQuery(GET_SUBCATS);

  // Queries database to get all categories
  const {
    loading: allCatLoading,
    error: allCatError,
    data: allCatData,
  } = useQuery(GET_ALLCATS);

  // Queries database to get top points holders (placeholder)
  const { loading: topPointsLoading, error: topPointsError, data: topPointsData } = useQuery(
    GET_USERS
  );

  useEffect(() => {
    // if(userLoading) console.log("help")
    // if(userError) console.log("I need somebody")
    // if(userLoading) return "Loading...";
    // if(userError) return `Error! $s{error.message}`;
    if (userData)
      setCategoryMods({
        ...categoryMods,
        mods: userData.users.map((user) => user.username),
      });
    if (subCatData) {
      setSubCategories({
        ...subCategories,
        subCategories: subCatData.subcategories.map(
          (subcategory) => subcategory.name
        ),
      });
    }
    if (allCatData) {
      setAllCategories({
        allCategories: allCatData.categories.map(
          (category) => category.name
        ),
      });
    }
    if (topPointsData)
      setTopPoints({
        ...topPoints,
        topPoints: topPointsData.users.map((user) => user.username),
      });
  }, [userData, subCatData, allCatData, topPointsData]);

  // return (
  //     data.users.map(user => (
  //       // console.log(user)
  //       user
  //     ))
  // );

  // useEffect(() => {
  //   // console.log("used an effect")
  //   console.log(Users());
  // })

  return (
    <VGrid size="12">
      <Col lgsize="2" visibility="hidden lg:block">
        <div className="grid invisible lg:visible">
          <UnorderedList
            category={`Subcategories in ${subCategories.parentCategory}`}
            list={subCategories.subCategories}
          />
          <br></br>
          <OrderedList
            category="Top Categories"
            list={topCategories.testCategories}
          />
          <br></br>
          <UnorderedList
            category="All categories"
            list={allCategories.allCategories}
          />
        </div>
      </Col>
      <Col lgsize="6" mobsize="10" visibility="col-start-2 lg:col-start-4">
        <div className="border-2 border-RocketBlack container rounded px-2">
          <h1>Current category: {subCategories.currCategory}</h1>
          {tempPostArr.query.map((post) => (
            <Posts
              title={post.post.title}
              body={post.post.body}
              date_created={post.post.date_created}
              subcategory={post.post.subcategory.name}
              category={post.post.subcategory.category.name}
              author={post.post.author.username}
            />
          ))}
        </div>
      </Col>
      <Col lgsize="2" mobsize="10" visibility="lg:col-start-11">
        <div className="grid invisible lg:visible">
          <OrderedList
            category="Top Points Holders"
            list={topPoints.topPoints}
          />
          <br></br>
          <OrderedList category="Top Posters" list={topPosters.topPosters} />
        </div>
        <br></br>
        <UnorderedList category="Mods" list={categoryMods.mods} />
      </Col>
    </VGrid>
  );
}

// const mapStateToProps = (state) => ({

// })

// const mapDispatchToProps = {

// }

// export default connect(mapStateToProps, mapDispatchToProps)(CategoryView)
export default CategoryView;

// check class repo, week 10, folder 19, activity 15 for class based components

/*
  <body>
    <main class="w-3/5 p-8 mx-auto">
      <h1 class="mb-4">tailwind collapsible</h1>
      <section class="shadow">
        <article class="border-b">
          <div class="border-l-2 border-transparent">
            <header class="flex justify-between items-center p-5 pl-8 pr-8 cursor-pointer select-none">
              <span class="text-grey-darkest font-thin text-xl">
                Massa vitae tortor condimentum lacinia quis vel eros donec
              </span>
              <div class="rounded-full border border-grey w-7 h-7 flex items-center justify-center">
                <svg
                  aria-hidden="true"
                  class=""
                  data-reactid="266"
                  fill="none"
                  height="24"
                  stroke="#606F7B"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewbox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </header>
          </div>
        </article>
        <article class="border-b">
          <div class="border-l-2 bg-grey-lightest border-indigo">
            <header class="flex justify-between items-center p-5 pl-8 pr-8 cursor-pointer select-none">
              <span class="text-indigo font-thin text-xl">
                Lorem ipsum dolor sit amet
              </span>
              <div class="rounded-full border border border-indigo w-7 h-7 flex items-center justify-center bg-indigo">
                <svg
                  aria-hidden="true"
                  data-reactid="281"
                  fill="none"
                  height="24"
                  stroke="white"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewbox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
              </div>
            </header>
            <div>
              <div class="pl-8 pr-8 pb-5 text-grey-darkest">
                <ul class="pl-4">
                  <li class="pb-2">consectetur adipiscing elit</li>
                  <li class="pb-2">
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua
                  </li>
                  <li class="pb-2">
                    Viverra orci sagittis eu volutpat odio facilisis mauris
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </article>
        <article class="border-b">
          <div class="border-l-2 border-transparent">
            <header class="flex justify-between items-center p-5 pl-8 pr-8 cursor-pointer select-none">
              <span class="text-grey-darkest font-thin text-xl">
                Lorem dolor sed viverra ipsum
              </span>
              <div class="rounded-full border border-grey w-7 h-7 flex items-center justify-center">
                <svg
                  aria-hidden="true"
                  class=""
                  data-reactid="266"
                  fill="none"
                  height="24"
                  stroke="#606F7B"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewbox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </header>
          </div>
        </article>
        <article class="border-b">
          <div class="border-l-2 border-transparent">
            <header class="flex justify-between items-center p-5 pl-8 pr-8 cursor-pointer select-none">
              <span class="text-grey-darkest font-thin text-xl">
                Egestas sed tempus urna
              </span>
              <div class="rounded-full border border-grey w-7 h-7 flex items-center justify-center">
                <svg
                  aria-hidden="true"
                  class=""
                  data-reactid="266"
                  fill="none"
                  height="24"
                  stroke="#606F7B"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewbox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </header>
          </div>
        </article>
      </section>
    </main>
  </body>;
*/
