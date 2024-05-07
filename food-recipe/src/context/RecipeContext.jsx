import React, { useState, useEffect, createContext, useContext } from 'react';

const RecipeContext = createContext(null);

export const RecipeProvider = ({ children }) => {
    const [recipe, setRecipe] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [steps, setSteps] = useState([]);
    const [isLoading,setIsLoading] = useState(false)

    const fetchRecipe = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://openapi.foodsafetykorea.go.kr/api/sample/COOKRCP01/json/1/5');
            const data = await response.json();
            const recipeData = data.COOKRCP01.row[1];
            setRecipe(recipeData);
            setIngredients(recipeData.RCP_PARTS_DTLS.split(","));
            setSteps([recipeData.MANUAL01, recipeData.MANUAL02, recipeData.MANUAL03]);
        } catch (error) {
            console.error("Failed to fetch recipe:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRecipe();
    }, []);

    const handleAddIngredient = () => {
        setIngredients([...ingredients, ""]);
    };

    const handleIngredientChange = (index, value) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = value;
        setIngredients(newIngredients);
    };

    const handleAddStep = () => {
        setSteps([...steps, ""]);
    };

    const handleStepChange = (index, value) => {
        const newSteps = [...steps];
        newSteps[index] = value;
        setSteps(newSteps);
    };

    return (
        <RecipeContext.Provider value={{ recipe, setRecipe, ingredients, handleAddIngredient, handleIngredientChange, 
                                         steps, handleAddStep, handleStepChange, isLoading, setIsLoading}}>
            {children}
        </RecipeContext.Provider>
    );
};

// Custom Hook
export const useRecipe = () => useContext(RecipeContext);