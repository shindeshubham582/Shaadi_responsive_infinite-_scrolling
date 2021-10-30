import React, { useState, useEffect } from "react";

const Food = () => {
  const [foodList, updateFoodList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const windowOffset = 10;
  const addNewData = () => {
    setIsLoading(true)
  }

  window.onscroll = function () {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - windowOffset) {
      addNewData()
    }
  }
  useEffect(() => {
    if (!isLoading) return
    const addFood = async () => {
      const foodResponse = await fetch(
        "https://demo1-f1a3a-default-rtdb.firebaseio.com/foodList.json",
        {}
      );
      if (!foodResponse.ok) {
        throw new Error("something Went wrong");
      }
      const responseData = await foodResponse.json();
      const defaultArray = [];
      if (responseData) {
        for (const key in responseData) {
          defaultArray.push(responseData[key]);
        }
        updateFoodList((e) => {
          return [...e, ...defaultArray];
        });
        setIsLoading(false)
      }
    };
    addFood().catch( error => {
        setIsLoading(false);
        setHasError(error.message)
      }
    );
  }, [isLoading]);
  if (hasError) {
    return !isLoading && hasError && <h1> someThing Went wrong</h1>
  }

  return (
    <div>
      {foodList.map((FoodItem, i) => {
        if (foodList.length === i + 1) {
          return (
            <div key={i}  id = 'last'  onScroll = {addNewData}>
              {i + 1} : {FoodItem}
            </div>
          );
        }
        return (
          <div key={i}>
            {i + 1} : {FoodItem}
          </div>
        );
      })}
      {isLoading && !hasError && <h1> Loading </h1>}
    </div>
  );
};

export default Food;
