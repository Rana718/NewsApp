import newsCategoryList from "@/constants/Categories";
import { useCallback, useState } from "react";


export const useNewsCategories = () => {
    const [categories, setCategories] = useState(newsCategoryList);

    const toggleCategory = useCallback((id: number) => {
        setCategories(prevState => {
            return prevState.map((category) => {
                if (category.id === id) {
                    return {
                        ...category,
                        selected: !category.selected
                    }
                }
                return category;
            })
        })
    }, []);

    return{
        categories,
        toggleCategory
    }
}