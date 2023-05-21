import  {useState}  from 'react'
import CountryDropdown from './CountryDropDown';

const AddRecipe = ({onSubmit}) => {
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [country, setCountry] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [ingredients, setIngredients] = useState([{ name: '', amount: '' }]);
    const [instructions, setInstructions] = useState('');

  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      const formData = {
        name,
        author,
        country,
        description,
        image,
        ingredients,
        instructions
      };
  
      onSubmit(formData);

      /* console.log(formData) */
  
      setName('');
      setAuthor('');
      setCountry('');
      setDescription('');
      setImage('');
      setIngredients([]);
      setInstructions('');
    };
  
    const handleAddIngredient = () => {
      setIngredients([...ingredients, '']);
    };
  
    const handleIngredientChange = (e, index, field) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index] = {
          ...updatedIngredients[index],
          [field]: e.target.value
        };
        setIngredients(updatedIngredients);
      };
      
  
    return (
      <>
      <h1 className="d-flex justify-content-center">Add Recipe</h1>
    <div className="d-flex justify-content-center">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
  
        <div className="mb-3">
          <label htmlFor="author" className="form-label">
            Author:
          </label>
          <input
            type="text"
            className="form-control"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
  
        <div className="mb-3">
  <label htmlFor="country" className="form-label">
    Recipe is from (country):
  </label>
  <CountryDropdown
    value={country}
    onChange={(selectedCountry) => 
    setCountry(selectedCountry)}
  />
</div>
  
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
  
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image:
          </label>
          <input
            type="text"
            className="form-control"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <h5>Ingredients</h5>
        {ingredients.map((ingredient, index) => (
  <div className="mb-3" key={index}>
    <label htmlFor={`ingredientName${index}`} className="form-label">
      Ingredient Name:
    </label>
    <input
  type="text"
  className="form-control"
  id={`ingredientName${index}`}
  value={ingredient.name || ''}
  onChange={(e) => handleIngredientChange(e, index, 'name')}
/>
    <label htmlFor={`ingredientAmount${index}`} className="form-label">
      Ingredient Amount:
    </label>
    <input
  type="text"
  className="form-control"
  id={`ingredientAmount${index}`}
  value={ingredient.amount || ''}
  onChange={(e) => handleIngredientChange(e, index, 'amount')}
/>
  </div>
))}
 <button type="button" className="btn btn-secondary mt-2" onClick={handleAddIngredient}>
            Add Ingredient
          </button>
  
<div className="mb-3">
<label htmlFor="instructions" className="form-label">
Instructions:
</label>
<textarea
className="form-control"
id="instructions"
value={instructions}
onChange={(e) => setInstructions(e.target.value)}
></textarea>
</div>
<button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
</>
);
  };
  
export default AddRecipe