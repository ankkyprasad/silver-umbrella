import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addCategories,
  getCategories,
  removeCategory,
} from "../../services/api/categories";
import LoadingSvg from "../shared/LoadingSvg";
import Select from "react-select";
import { convertArrayToBooleanMap } from "../../utils/utils";
import { useState } from "react";
import queryClient from "../../services/query-client";

const SelectCategoryCard = ({ selectedCategories, blogId }) => {
  const [selectedOption, setSelectedOption] = useState([]);

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const addCategoriesMutation = useMutation({
    mutationFn: addCategories,
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs", blogId]);
      setSelectedOption([]);
    },
  });

  const removeCategoryMutation = useMutation({
    mutationFn: removeCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs", blogId]);
    },
  });

  const { isLoading, isError } = categoriesQuery;

  let categoriesData = [];
  let allCategoriesData = [];

  if (isLoading === false && isError === false) {
    allCategoriesData = categoriesQuery.data.data;
    const map = convertArrayToBooleanMap(selectedCategories);

    categoriesData = allCategoriesData.map((el) => {
      if (map.hasOwnProperty(el.attributes.name) === false) {
        return {
          value: el.id,
          label: el.attributes.name,
        };
      }
      return null;
    });

    categoriesData = categoriesData.filter((el) => el !== null);
    categoriesData.sort(sortLabel);
  }

  const saveButtonClickHandler = () => {
    const categoryIds = selectedOption.map((el) => {
      return el.value;
    });
    addCategoriesMutation.mutate({ categoryIds, blogId });
  };

  const removeCategoryHandler = (categoryName) => {
    const currentCategory = allCategoriesData.find((el) => {
      return el.attributes.name === categoryName;
    });

    removeCategoryMutation.mutate({
      categoryId: currentCategory.id,
      blogId: blogId,
    });
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title pb-1">Select Categories</h2>

        <div className="pb-2.5 flex flex-wrap gap-2">
          {selectedCategories.map((el) => (
            <div className="bg-base-300 inline-flex  rounded-sm text-sm gap-2">
              <p className="pl-2 py-2">{el}</p>
              <span
                className="flex items-center px-2 cursor-pointer hover:bg-red-300 hover:text-red-500"
                onClick={() => removeCategoryHandler(el)}
              >
                x
              </span>
            </div>
          ))}
        </div>

        {isLoading && <LoadingSvg />}

        {isLoading === false && isError === false && (
          <>
            <Select
              isMulti
              name="categories"
              options={categoriesData}
              className="basic-multi-select"
              classNamePrefix="select"
              value={selectedOption}
              onChange={setSelectedOption}
            />
            <div className="card-actions justify-end pt-2">
              <button
                className="btn btn-primary bg-green-500 rounded-full w-1/3 text-white hover:bg-green-600"
                onClick={saveButtonClickHandler}
              >
                Save
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const sortLabel = (a, b) => {
  if (a.label < b.label) {
    return -1;
  }
  if (a.label > b.label) {
    return 1;
  }
  return 0;
};

export default SelectCategoryCard;
